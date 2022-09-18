import { i } from "../lang/I18N";
import HoloDocument from "../models/HoloDocument";
import Project from "../models/Project";
import { Schema } from "../models/Schema";
import Session from "../models/Session";
import FileService from "./FileService";

export type Event = 'projectsUpdated' | 'sessionsUpdated' | 'activeProjectChanged' | 'activeSessionChanged' | 'activeEditTargetChanged';

export type UpdateListener = () => void;

export interface UpdateListenerDef {
  owner: string;
  event: Event;
  listener: UpdateListener;
}

const keyRegex = /^[a-zA-Z][a-zA-Z0-9_-]{0,63}$/g

export default class ApplicationManagerService {
  projects: Array<Project> = [];
  sessions: Array<Session> = [];
  schemas: Array<Schema> = [];
  updateListeners: Array<UpdateListenerDef> = [];

  activeProject?: Project;
  activeSession?: Session;

  activeForEdit?: HoloDocument | Schema;

  fileService = new FileService();

  constructor() {
    this.fileService.readFile('./config.json')
      .then((c: any) => JSON.parse(c))
      .then((c: any) => {
        // TODO: Validate before set
        this.projects = c?.projects || this.projects;
        this.sessions = c?.sessions || this.sessions;
        this.schemas = c?.schemas || this.schemas;
        this.notifyUpdate('projectsUpdated');
      })
  }

  addEventListener(owner: string, event: Event | Array<Event>, listener: UpdateListener) {
    if (Array.isArray(event)) {
      event.forEach(event => this.addEventListeners(owner, event, listener));
    } else {
      this.addEventListeners(owner, event, listener);
    }
  }

  removeEventListeners(ownedBy: string) {
    this.updateListeners = this.updateListeners.filter(it => it.owner !== ownedBy);
  }

  addNewProject(project: Project) {
    this.projects.push(project);
    this.saveState();
    this.notifyUpdate('projectsUpdated');
  }

  setActiveProject(project: Project) {
    this.activeProject = project;
    this.activeForEdit = undefined;
    this.getOrStartSession();
    this.notifyUpdate('activeProjectChanged');
    this.notifyUpdate('activeEditTargetChanged');
  }

  setActiveSession(session: Session) {
    this.activeSession = session;
    this.activeForEdit = undefined;
    this.notifyUpdate('activeSessionChanged');
    this.notifyUpdate('activeEditTargetChanged');
  }

  setActiveForEdit(document: HoloDocument | Schema) {
    this.activeForEdit = document;
    this.notifyUpdate('activeEditTargetChanged');
  }

  addDocument(document: HoloDocument) {
    const matches = keyRegex.test(document.key);
    if (this.activeSession?.documents?.find(it => it.key === document.key)) {
      throw new Error(i("error--document-exists"));
    } else if (!matches) {
      throw new Error(i("error--key-invalid"));
    } else {
      this.activeSession?.documents?.push(document);
      this.saveState();
      this.notifyUpdate('sessionsUpdated');  
    }
  }

  addSchema(schema: Schema) {
    if (this.activeSession?.schemas?.find(it => it.name === schema.name)) {
      throw new Error(i("Schema already exists"));
    }
    this.activeSession?.schemas?.push(schema);
    this.saveState();
    this.notifyUpdate('activeSessionChanged');
    this.notifyUpdate('activeEditTargetChanged');
  }

  updateDocument(document: HoloDocument) {
    if (!this.activeSession) { return };
    this.activeSession.documents.forEach(it => {
      if (it.key === document.key) {
        Object.assign(it, document);
      }
    });
    this.activeSession.lastEvent = Date.now();
    this.saveState();
    this.notifyUpdate('activeSessionChanged');
    this.notifyUpdate('activeEditTargetChanged');
  }

  updateSchema(schema: Schema) {
    if (!this.activeSession) { 
      throw new Error("No active session");
    };
    if (!this.activeSession?.schemas?.find(it => it.name === schema.name)) {
      throw new Error("Schema does not exist");
    }
    this.activeSession?.schemas.forEach(it => {
      if (it.id === schema.id) {
        Object.assign(it, schema);
      }
    })
    this.activeSession.lastEvent = Date.now();
    this.saveState();
    this.notifyUpdate('activeSessionChanged');
    this.notifyUpdate('activeEditTargetChanged');
  }

  deleteSchema(schema: Schema) {
    if (!this.activeSession) { 
      throw new Error("No active session")
    }
    const index = this.activeSession?.schemas?.findIndex((s) => s.name === schema.name);
    if (index >= 0) {
      this.activeSession?.schemas?.splice(index, 1);
    } else {
      throw new Error("Schema not found");
    }
    this.activeForEdit = undefined;
    this.activeSession.lastEvent = Date.now();
    this.saveState();
    this.notifyUpdate('activeSessionChanged');
    this.notifyUpdate('activeEditTargetChanged');
  }

  deleteDocument(document: HoloDocument) {
    if (!this.activeSession) { 
      throw new Error("No active session")
    }
    const index = this.activeSession?.documents?.findIndex((s) => s.key === document.key);
    if (index >= 0) {
      this.activeSession?.documents?.splice(index, 1);
    } else {
      throw new Error("Document not found");
    }
    this.activeForEdit = undefined;
    this.activeSession.lastEvent = Date.now();
    this.saveState();
    this.notifyUpdate('activeSessionChanged');
    this.notifyUpdate('activeEditTargetChanged');
  }


  private getOrStartSession(): Session | undefined {
    const project = this.activeProject;    
    if (project) {
      const existingSession = this.sessions.find(it => it.projectId === project.id);
      if (!existingSession) {
        const newSession = { projectId: project.id, documents: [], schemas: [], lastEvent: Date.now() };
        this.activeSession = newSession;
        this.addNewSession(newSession);
        return newSession;
      }
      this.activeSession = existingSession;
      this.notifyUpdate('activeSessionChanged');
      return existingSession;
    } else {
      return undefined;
    }
  }

  private saveState() {
    this.fileService.writeFile('./config.json', JSON.stringify({
      projects: this.projects,
      sessions: this.sessions,
      schemas: this.schemas,
    }), { flag: 'w' });
  }

  private addEventListeners(owner: string, event: Event, listener: UpdateListener) {
    this.updateListeners.push({owner, event, listener});
  }

  private addNewSession(session: Session) {
    this.sessions.push(session);
    this.notifyUpdate('sessionsUpdated');
  }

  private notifyUpdate(type: Event) {
    this.updateListeners.filter(it => it.event === type).forEach(it => it.listener());
  }
}