import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import Project from '../models/Project'
import Session from '../models/Session'
import { AppDispatch } from './store'
import HoloDocument from '../models/HoloDocument'

export interface ApplicationState {
  projects: Project[],
  sessions: Session[],
  activeProject: string,
  showProjects: boolean,
}

const initialState: ApplicationState = {
  projects: [],
  sessions: [],
  activeProject: '',
  showProjects: true,
}

export const applicationStateSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addProject: (state, project: PayloadAction<Project>) => {
      state.projects.push(project.payload);
    },
    setActiveProject: (state, project: PayloadAction<string>) => {
      state.activeProject = project.payload;
    },
    setShowProjects: (state, showProjects: PayloadAction<boolean>) => {
      state.showProjects = showProjects.payload;
    },
    createSession: (state, session: PayloadAction<Session>) => {
      state.sessions = [...state.sessions, session.payload];
    },
    addDocumentToSession: (state, payload: PayloadAction<HoloDocument>) => {
      state.sessions.find(it => it.projectId === state.activeProject)?.documents.push(payload.payload);
    }
  },  
})

// Action creators are generated for each case reducer function
export const { addProject, setActiveProject, setShowProjects, createSession, addDocumentToSession } = applicationStateSlice.actions

export default applicationStateSlice.reducer