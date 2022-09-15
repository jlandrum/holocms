import React from 'react';
import { store } from './redux/store'
import { Provider } from 'react-redux'
import { HashRouter, Routes, Route } from 'react-router-dom';
import MainWindow from './components/groups/MainWindow';
import fontColorContrast from 'font-color-contrast';
import ApplicationManager from './components/units/ApplicationManager';
import { NoticeProvider } from './dialogs/Notice';

function hexToRgb(hex: string) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(hex);
  return result ? `rgb(${parseInt(result[1], 16)} ${parseInt(result[2], 16)} ${parseInt(result[3], 16)})` : ''
}

function rgbToTailwindAlpha(color: string, param: string = '--tw-text-opacity') {
  return `${color.substring(0, color.length-1)} / var(${param}))`;
}

function App() {
  const accentColor = hexToRgb(HOLOCMS.accentColor());
  const accentText = hexToRgb(fontColorContrast(HOLOCMS.accentColor()));
  const browser = HOLOCMS.type === 'browser';

  console.error(rgbToTailwindAlpha(accentColor));

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
          background-color: ${rgbToTailwindAlpha(accentColor, '--tw-bg-opacity')};
        }
        .accent-bg-text {
          color: ${accentText};
          background-color: ${rgbToTailwindAlpha(accentColor, '--tw-bg-opacity')};
        }
        .hover\\:accent-bg:hover {
          background-color: ${rgbToTailwindAlpha(accentColor, '--tw-bg-opacity')};
        }
        .hover\\:accent-bg-text:hover {
          color: ${accentText};
          background-color: ${rgbToTailwindAlpha(accentColor, '--tw-bg-opacity')};
        }
      `}
      </style>
      <ApplicationManager>
        <NoticeProvider>
          <Provider store={store}>        
            <div className={`${browser && 'bg-neutral-300 dark:bg-neutral-800'} font-screen `}>
              <HashRouter>
                <Routes>
                  <Route index element={<MainWindow />}/>
                </Routes>
              </HashRouter>
            </div> 
          </Provider>
        </NoticeProvider>
      </ApplicationManager>
    </>
  );
}

export default App;
