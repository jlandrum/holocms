import TextBox from "./TextBox";
import { BlockProps } from "./Block";
import Checkbox from "./Checkbox";

export const BooleanBlock = ({ type, keyName, value, onUpdate }: BlockProps) => {
  return (
    <div className={`flex gap-2 ${type.textArea && 'flex-col'}`}>
      <Checkbox checked={value} onCheckChanged={(checked) => onUpdate(keyName, checked)} />
      <span className="">
        {type.name}
      </span>      
    </div>
  );
};
