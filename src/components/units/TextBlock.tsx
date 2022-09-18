import TextBox from "./TextBox";
import { BlockProps } from "./Block";

export const TextBlock = ({ type, keyName, value, onUpdate }: BlockProps) => {
  return (
    <div className={`flex gap-2 ${type.textArea && 'flex-col'}`}>
      <span className="">
        {type.name}
      </span>
      <TextBox className="flex-grow"
        value={value}
        onValueChange={(value) => onUpdate(`${keyName}`, value)}
        lines={type.textArea ? 5 : 1} />
    </div>
  );
};
