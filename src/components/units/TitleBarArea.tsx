interface TitleBarAreaProps {
  className?: string;
  children?: React.ReactNode | React.ReactNode[];
}

const TitleBarArea = ({className, children} : TitleBarAreaProps) => {
  return <div className={`drag-area h-8 w-full block ${className}`}>
    {children}
  </div>
}

export default TitleBarArea;