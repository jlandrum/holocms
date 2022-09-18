import { i } from "../../lang/I18N";
import { SchemaItemEditorProps } from "./SchemaItemEditor";

export const SchemaUnknownEditor = ({ item, onDelete }: SchemaItemEditorProps) => {
  return (
    <div>
      <span className="text-sm">{i('schema-type-unknown')}</span>
    </div>
  );
};
