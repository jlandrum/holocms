import Text from "./Text";
import { useSession } from "./ApplicationManager";
import Dropdown from "./Dropdown";
import { SchemaItemEditorProps } from "./SchemaItemEditor";
import Checkbox from "./Checkbox";
import { i } from "../../lang/I18N";

export const SchemaSubSchemaEditor = ({ item, onDelete, onUpdate, keyPath }: SchemaItemEditorProps) => {
  const session = useSession();

  const options = session!!.schemas
    .map(it => ({ name: it.name, key: it.id }));

  const setSchema = (id: string) => {
    onUpdate({ ...item, schema: id }, keyPath);
  };

  const setArray = (checked: boolean) => {
    onUpdate({ ...item, array: checked }, keyPath);
  };

  return (
    <div className="flex gap-1 flex-col">
      <Dropdown emptyText={item.schema ? '<Invalid Selection>' : 'Select Item'} selection={item.schema || ''} onSelect={setSchema} items={options} />
      <span className="flex gap-1 items-center">
        <Checkbox checked={item.array} onCheckChanged={setArray} />
        <Text>{i('allow-multiple-items')}</Text>
      </span>
    </div>
  );
};
