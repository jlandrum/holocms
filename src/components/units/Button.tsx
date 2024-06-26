interface ButtonProps {
  children: React.ReactNode | React.ReactNode[];
  onClick?: (_: boolean) => void;
  type?: keyof typeof TYPE_DEFS;
  selected?: boolean;
  className?: string;
  disabled?: boolean;
  collapsed?: boolean;
  collapseView?: React.ReactNode;
  tabIndex?: number;
}

const TYPE_DEFS = {
  default: 'border ui-shadow text-sm dark:bg-neutral-700 dark:text-white bg-neutral-50 border-neutral-300 self-center rounded-md dark:border-neutral-900 px-4',
  primary: 'border ui-shadow text-sm accent-bg-text border-neutral-300 self-center rounded-md dark:border-neutral-900 dark:text-gray-300 px-4',  
  outline: 'border border-black self-center rounded-md dark:border-gray-500 dark:text-gray-300 hover:animate-rainbow transition-all px-4 py-2',
  listItem: 'hover:accent-bg-text hover:bg-opacity-80 text-left px-2 rounded-listItem text-xs border-neutral-300 w-auto dark:text-white dark:border-neutral-700',
  listItemLarge: 'rounded-md text-sm mx-3 w-auto dark:text-white dark:border-neutral-700 bg-opacity-80 px-2.5 py-1.5',
  icon: 'hover:bg-black dark:hover:bg-black dark:hover:bg-opacity-20 hover:bg-opacity-10 block rounded-md bg-transparent transition-colors',
  unstyled: '',
  large: 'bg-black bg-opacity-20 rounded-lg text-black text-sm p-1.5',
  largePrimary: 'bg-accent rounded-lg text-white text-sm p-1.5',
}

const SELECTED_TYPE_DEFS: any = {
  default: 'outline outline-blue-400',
  primary: 'outline outline-blue-400',
  listItem: 'dark:bg-neutral-700 bg-neutral-300',
  listItemLarge: 'accent-bg-text dark:bg-neutral-600 bg-neutral-400 bg-opacity-40 dark:bg-opacity-40 ',
  icon: 'bg-opacity-20 accent-bg hover:accent-bg shadow-xs',
}

const DISABLED_TYPE_DEFS: any = {
  icon: 'hover:bg-opacity-0 opacity-30 pointer-events-none',
  primary: 'opacity-50'
}

const Button = ({children, onClick, className, selected, disabled, collapsed, collapseView, type = 'default', tabIndex = 1}: ButtonProps) => {
  const handleClick = () => {
    if (!disabled) {
      onClick?.(true);
    }
  }

  return <button tabIndex={tabIndex}
                 className={`cursor-default  ${TYPE_DEFS[type]} ${selected && SELECTED_TYPE_DEFS[type]} ${disabled && DISABLED_TYPE_DEFS[type]} ${className}`} 
                 onClick={handleClick}>{ collapsed ? collapseView : children}</button>
}

export default Button;