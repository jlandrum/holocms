import React from 'react';
import { store } from './redux/store'
import { Provider } from 'react-redux'
import { HashRouter, Routes, Route } from 'react-router-dom';
import MainWindow from './components/groups/MainWindow';
import fontColorContrast from 'font-color-contrast';
import ApplicationManager from './components/units/ApplicationManager';


function App() {
  const accentColor = HOLOCMS.accentColor();
  const accentText = fontColorContrast(accentColor);
  const browser = HOLOCMS.type === 'browser';

  return (
    <>
      <style>{
      `
        * {
          user-select: none;
        }
        .drag-area {
          -webkit-user-select: none;
          -webkit-app-region: drag;          
        }
        .drag-area *, .anti-drag-area {
          -webkit-user-select: none;
          -webkit-app-region: none;
        }
        .accent-text {
          color: ${accentColor};
        }
        .accent-bg {
          background-color: ${accentColor};
        }
        .accent-bg-text {
          color: ${accentText};
          background-color: ${accentColor};
        }
        .hover\\:accent-bg:hover {
          background-color: ${accentColor};
        }
        .hover\\:accent-bg-text:hover {
          color: ${accentText};
          background-color: ${accentColor};
        }
      `}
      </style>
      <ApplicationManager>
        <Provider store={store}>        
          <div className={`${browser && 'bg-neutral-300 dark:bg-neutral-800'} font-screen `}>
            <HashRouter>
              <Routes>
                <Route index element={<MainWindow />}/>
              </Routes>
            </HashRouter>
          </div> 
        </Provider>
      </ApplicationManager>
    </>
  );
}

export default App;
