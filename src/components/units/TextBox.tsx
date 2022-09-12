import React, { useState } from 'react';
import Text from './Text';

interface TextBoxProps {
  value?: string;
  area?: boolean;
  inline?: boolean;
  disabled?: boolean;
  onValueChange?: (value: string) => void;
  className?: string;
}

const TextBox = ({value, onValueChange, className, disabled, inline, area}: TextBoxProps) => {
  const [editMode, setEditMode] = useState(false);
  
  if (area) {
    return (
      <textarea
      value={value}  
      className={`${className} resize-none dark:bg-neutral-800 dark:text-white dark:border-b-neutral-700 border-b shadow-sm rounded-md outline-none px-2 py-0.5 text-sm`}
      onChange={(e) => onValueChange?.(e.target.value)}>
      {value}
    </textarea>
    )
  } else {
    const inputStyle = 'dark:bg-neutral-800 dark:text-white dark:border-b-neutral-700 border-b shadow-sm rounded-md outline-none px-2 py-0.5 text-sm'
    return !inline || editMode ? (
      <input
           disabled={disabled}
           autoFocus={inline}
           onBlur={() => {setEditMode(false)}}
           className={`${className} ${inputStyle} ${disabled && 'opacity-80 text-neutral-800 dark:text-neutral-500'} select-auto`} 
           onChange={(e) => onValueChange?.(e.target.value)} value={value} />
    ) : (
      <div className={`${className} inline bg-transparent outline-none cursor-default hover:bg-black hover:dark:bg-white hover:dark:bg-opacity-5 rounded-md hover:bg-opacity-5`}
           onClick={() => setEditMode(true)}><Text>{value}</Text></div>
    )
  }
}

export default TextBox;