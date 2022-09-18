import Text from "./Text";
import { SchemaItemEditorProps } from "./SchemaItemEditor";
import Checkbox from "./Checkbox";
import { i } from "../../lang/I18N";

export const SchemaSelectEditor = ({ item, keyPath, onUpdate, onDelete }: SchemaItemEditorProps) => {
  const setTextArea = (checked: boolean) => {
    if (!checked) {
      onUpdate({ ...item, richText: false, textArea: false }, keyPath);
    } else {
      onUpdate({ ...item, textArea: checked }, keyPath);
    }
  };

  const setFreeEntry = (checked: boolean) => {
    onUpdate({ ...item, freeEntry: checked }, keyPath);
  };

  return (
    <div className="flex gap-1 flex-col">
      <span className="flex gap-1 items-center">
        <Checkbox checked={item.freeEntry} onCheckChanged={setFreeEntry} />
        <Text>{i('allow-any-string')}</Text>
      </span>
    </div>
  );
};
