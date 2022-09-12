import { useMemo, useEffect, createContext, useContext, useState, ReactElement } from 'react';

interface ContextProps {
  close: () => void;
}

export interface DialogProps {
  show?: boolean;
  children: () => React.ReactElement;
  onClosed: (shown: boolean) => void;
}


const DialogContext = createContext<ContextProps>({ close: () => {} });

const Dialog = ({show = false, onClosed, children}: DialogProps) => {  
  const [closing, setClosing] = useState(false);
  const [viewRef, setView] = useState<ReactElement|null>();

  useEffect(() => {
    if (show) {
      if (!viewRef) {
        const View = children;
        setView(<View />)
      }
    }
  }, [children, show, viewRef]);

  const contextValue = useMemo(() => {
    return ({ close: () => {
      setClosing(true);
      setTimeout(() => {
        setClosing(false);
        setView(null);
        onClosed(false);
      }, 300);
    }})
  }, [onClosed]);
  
  return <>
    <DialogContext.Provider value={contextValue}>
      <div className={`${closing ? 'animate-fadeOut' : 'animate-fadeIn'} ${show ? '' : 'hidden'} z-50 w-screen h-screen bg-neutral-500 dark:bg-black dark:bg-opacity-40 bg-opacity-30 backdrop-contrast-60 backdrop-saturate-50 backdrop-brightness-90 b absolute left-0 top-0 flex justify-around items-center`}>
        <div className={`${closing ? 'animate-slideOutTop' : 'animate-slideInTop'} bg-slate-100 dark:bg-neutral-900 p-1 border border-neutral-400 dark:border-neutral-800 shadow-xl flex-grow-0 rounded-xl bg-opacity-90 backdrop-blur-3xl`}>
          <div className='p-3'>
            {viewRef}
          </div>
        </div>
      </div>
    </DialogContext.Provider>
  </>
}

export const useClose = () => {
  return useContext(DialogContext).close;
}

export default Dialog;