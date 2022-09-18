import TextBox from "./TextBox";
import { BlockProps } from "./Block";
import Dropdown from "./Dropdown";

export const SelectBlock = ({ type, keyName, value, onUpdate }: BlockProps) => {
  return (
    <div className={`flex gap-2 ${type.textArea && 'flex-col'}`}>
      <span className="">
        {type.name}
      </span>
      <Dropdown
        freeType
        className="flex-grow"
        items={[{key: 'o', name: 'i'}]}
        selection={value}
        onSelect={(v) => onUpdate(keyName, v)}
        />
    </div>
  );
};
