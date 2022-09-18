import { createContext, useContext, useEffect, useMemo, useState } from "react"
import ApplicationManagerService from "../../services/ApplicationManagerService";
import { v4 as uuidv4 } from 'uuid';
import Project from "../../models/Project";
import HoloDocument from "../../models/HoloDocument";
import { Schema } from "../../models/Schema";

interface ApplicationManagerProps {
  children?: React.ReactElement | React.ReactElement[]
}

const applicationManagerService = new ApplicationManagerService();

const ApplicationManagerContext = createContext(applicationManagerService);

const ApplicationManager = ({children}: ApplicationManagerProps) => {
  return (
    <ApplicationManagerContext.Provider value={applicationManagerService}>
      {children}
    </ApplicationManagerContext.Provider>
  )
}

export const useAppManager = () => useContext(ApplicationManagerContext);

export const useProjectList = () => {
  const id = useMemo(() => uuidv4(), []);
  useEffect(() => {
    applicationManagerService.addEventListener(id, 'projectsUpdated', () => {
      setProjects(applicationManagerService.projects);
    })
    return () => applicationManagerService.removeEventListeners(id);
  }, [id]);
  const [projects, setProjects] = useState<Array<Project>>(applicationManagerService.projects);
  return projects || [];
}

export const useProject = () => {
  const [project, setProject] = useState<Project|undefined>(applicationManagerService.activeProject);
  const id = useMemo(() => uuidv4(), []);
  
  useEffect(() => {
    applicationManagerService.addEventListener(id, 'activeProjectChanged', () => {
      setProject(applicationManagerService.activeProject);
    })
    return () => applicationManagerService.removeEventListeners(id);
  }, [id]);
  return project!!;
}

export const useEditTarget = <T extends HoloDocument | Schema,>(): T => {
  const [_, setLastUpdate] = useState(Date.now());
  const id = useMemo(() => uuidv4(), []);
  
  useEffect(() => {
    applicationManagerService.addEventListener(id, 'activeEditTargetChanged', () => {
      setLastUpdate(Date.now())
    })
    return () => applicationManagerService.removeEventListeners(id);
  }, [id]);
  return applicationManagerService.activeForEdit!! as T;
}

export const useSession = () => {
  const id = useMemo(() => uuidv4(), []);
  const project = useProject();
  const [_, setLastUpdate] = useState(0);
  useEffect(() => {
    applicationManagerService.addEventListener(id, ['activeSessionChanged'], () => {
      setLastUpdate(Date.now());
    })
    return () => applicationManagerService.removeEventListeners(id);
  }, [id, project]);
  return applicationManagerService.activeSession!!;
}

export const useSchema = (id: String) => {
  const session = useSession();
  return session?.schemas.find(it => it.id === id);
}

export default ApplicationManager;