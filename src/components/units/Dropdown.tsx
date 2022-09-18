import { useState } from "react";
import Button from "./Button";
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { i } from "../../lang/I18N";
import TextBox from "./TextBox";

interface DropdownProps {
  items: DropdownItem[];
  selection: string;
  onSelect: (key: string) => void;
  emptyText?: string;
  className?: string;
  freeType?: boolean;
}

export interface DropdownItem {
  name: string;
  key: string;
}

const Dropdown = ({items, className, freeType = false, onSelect, selection, emptyText = i('select-item')}: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  const onClose = () => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      setOpen(false);
    }, 300);
  }

  const label = items.find(it => it.key === selection)?.name || (freeType ? selection : emptyText);

  return (
    <div className={`relative ${className}`} tabIndex={0} onBlur={() => onClose()}>
      <div className={`shadow-xs ui-shadow border items-center justify-between border-neutral-300 rounded-md px-2 py-0.5 h-6 bg-white dark:bg-neutral-600 dark:border-neutral-900 flex`}
           onClick={() => setOpen(!open)}>
          {freeType ? <TextBox inline value={label} onValueChange={(v) => onSelect(v)} /> : <span className="text-xs">{label}</span> }
        <div className="-m-1 border border-black border-opacity-20 flex flex-col bg-accent py-0.5 px-1 -mr-1.5 rounded-md ui-shadow">
          <FaChevronUp size={9} className="-mb-0.5 -mt-0.5 text-white" />
          <FaChevronDown size={9} className="-mb-0.5 text-white" />
        </div>
      </div>
      { open && 
        <div tabIndex={-1} className={`${closing ? 'opacity-0' : 'opacity-100'} z-50 absolute gap-1 py-1 dark:bg-neutral-800 dark:bg-opacity-20 dark:border-neutral-700 border transition-opacity bg-white bg-opacity-25  w-full backdrop-blur-md shadow-lg rounded-lg flex flex-col`}>
          {items.map(item => (
            <Button type="listItem" 
                    key={item.key}
                    onClick={() => onSelect(item.key)} 
                    className="text-xs mx-1 p-1">{item.name}</Button>
          ))}
        </div>
      }
    </div>
  )
}

export default Dropdown;