import React from 'react';
import '../../Tailwind.css';
import { store } from '../../redux/store'
import { Provider } from 'react-redux'
import Welcome from './Welcome';
import ProjectsPanel from './/ProjectsPanel';
import MainEditor from './MainEditor';
import { useProject } from '../units/ApplicationManager';

function App() {  
  const project = useProject();
  
  return (
    <Provider store={store}>
      <div className="flex flex-col h-screen select-none">
        <div className='flex-grow flex flex-row'>         
          <ProjectsPanel />
          { project ? <MainEditor /> : <Welcome />}
        </div>
      </div>
    </Provider>
  );
}

export default App;
