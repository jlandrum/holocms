import Button from "./Button";
import { BsCheck } from 'react-icons/bs';

interface CheckboxProps {
  checked: boolean;
  onCheckChanged: (state: boolean) => void;
  disabled?: boolean;
}

const Checkbox = ({disabled, checked, onCheckChanged}: CheckboxProps) => {
  const selected = 'bg-accent';
  const unselected = 'dark:from-neutral-700 dark:to-neutral-600 from-neutral-300 to-neutral-200';
  const disabledStyle = 'opacity-40'
  return (
    <Button disabled={disabled} 
            className={`${checked ? selected : unselected} ${disabled && disabledStyle} w-4 h-4 rounded-input flex border ui-shadow bg-gradient-to-b border-neutral-400 border-opacity-50 dark:border-black justify-center items-center`} 
            type="unstyled" 
            onClick={() => onCheckChanged(!checked)}>
      { checked && <BsCheck size="20" className="text-bold shadow-sm -m-2 text-white" /> }
    </Button>
  )
}

export default Checkbox;