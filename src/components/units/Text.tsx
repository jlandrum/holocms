interface TextProps {
  children?: React.ReactNode | React.ReactNode[];
  className?: string;
  customStyle?: boolean;
}

const Text = ({children, className = '', customStyle = false}: TextProps) => {
  return <span className={`${!customStyle && 'text-black dark:text-neutral-100'} text-sm text-bold ${className}`}>{children}</span>
}

export default Text;