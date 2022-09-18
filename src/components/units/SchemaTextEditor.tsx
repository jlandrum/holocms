import Text from "./Text";
import { SchemaItemEditorProps } from "./SchemaItemEditor";
import Checkbox from "./Checkbox";
import { i } from "../../lang/I18N";

export const SchemaTextEditor = ({ item, keyPath, onUpdate, onDelete }: SchemaItemEditorProps) => {
  const setTextArea = (checked: boolean) => {
    if (!checked) {
      onUpdate({ ...item, richText: false, textArea: false }, keyPath);
    } else {
      onUpdate({ ...item, textArea: checked }, keyPath);
    }
  };

  const setRichText = (checked: boolean) => {
    onUpdate({ ...item, richText: checked }, keyPath);
  };

  return (
    <div className="flex gap-1 flex-col">
      <span className="flex gap-1 items-center">
        <Checkbox checked={item.textArea} onCheckChanged={setTextArea} />
        <Text>{i('text-area')}</Text>
      </span>
      <span className="flex gap-1 items-center">
        <Checkbox disabled={!item.textArea} checked={item.richText} onCheckChanged={setRichText} />
        <Text>{i('allow-rich-text')}</Text>
      </span>
    </div>
  );
};
