import { useEffect, useMemo, useRef } from "react";
import { Rnd } from "react-rnd"
import TitleBarArea from "./TitleBarArea";

interface ToolPanelProps {
  children?: React.ReactNode | React.ReactNode[];
  size?: number;
  onSizeChanged?: (size: number) => void;
  draggableArea?: boolean;
  type?: 'default' | 'inline';
  className?: string;
}

const ToolPanel = ({children, size, onSizeChanged, draggableArea, className, type = 'default'}: ToolPanelProps) => {
  const ref = useRef<Rnd>(null);

  useEffect(() => {
    if (ref.current?.getOffsetWidth !== size) {
      ref.current?.updateSize({width: size || 200, height: 'auto'})
    }
  }, [size]);

  const classType = useMemo(() => {
    switch (type) {
      case 'default':
        return 'bg-white bg-opacity-60 dark:bg-neutral-800 dark:bg-opacity-40';
      case 'inline':
        return 'bg-white dark:bg-neutral-900';
    }
  }, [type]);
  
  return (
    <div className={`flex z-10 dark:border-r-black border-r border-r-neutral-300`}>
      <Rnd ref={ref} 
          style={{position: 'static', display: 'flex', width: 400}} 
          minWidth={120} 
          maxWidth={300} 
          width={size}
          height={0} 
          enableResizing={{right: true}}
          className={`flex-col ${classType}`}
          onResize={(e,d,r,de,p) => onSizeChanged?.(r.offsetWidth)} disableDragging>
        { draggableArea && <TitleBarArea /> }
        {children}
      </Rnd>
    </div>
  )
}

export default ToolPanel;