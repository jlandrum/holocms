import { SchemaItemEditorProps, Feature, SchemaItemEditor } from "./SchemaItemEditor";

export const SchemaArrayEditor = ({ item, keyPath, onAdd, onDelete, onUpdate, onMove }: SchemaItemEditorProps) => {
  return (
    <div className="-mt-2">
      {item.items.map?.((subitem: any, i: number) => {
        let features = [
          i === 0 && 'firstItem',
          i === item.items.length - 1 && 'lastItem'
        ].filter(it => it !== false) as Feature[];
        return (
          <SchemaItemEditor
            key={`${keyPath}.items[${i}]`}
            features={features}
            onUpdate={onUpdate}
            onMove={onMove}
            onAdd={onAdd}
            onDelete={onDelete}
            keyPath={`${keyPath}.items[${i}]`}
            item={subitem} />
        );
      })}
    </div>
  );
};
SchemaArrayEditor.features = ['canAdd'];
