import { useEffect, useState } from "react";
import { Schema, SchemaType } from "../../models/Schema";
import { useAppManager, useEditTarget } from "../units/ApplicationManager";
import SchemaItemEditor, { Feature } from "../units/SchemaItemEditor";
import { set, get, cloneDeep } from 'lodash';
import Button from "../units/Button";
import { BiSave, BiPlus, BiTrashAlt } from "react-icons/bi";
import TextBox from "../units/TextBox";
import Text from "../units/Text";
import { i } from "../../lang/I18N";
import { AddSchemaItemDialog } from "../../dialogs/AddSchemaItem";
import { useNotice } from "../../dialogs/Notice";

const INDEX_REGEX = /\[(\d+)\]$/

const SchemaEditor = () => {
  const appManager = useAppManager();
  const schema = useEditTarget<Schema>();
  const modified = false;
  const showNotice = useNotice();
  
  const [editedSchema, setEditedSchema] = useState(schema);
  const [showInsert, setShowInsert] = useState(false);
  const [showInsertKey, setShowInsertKey] = useState('');

  useEffect(() => {
    setEditedSchema(schema);
  }, [schema]);

  const update = (value: any, keyPath: string) => {
    const copy = cloneDeep(editedSchema);
    set(copy, keyPath, value);
    setEditedSchema(copy);
  }

  const del = (keyPath: string) => {
    const copy = cloneDeep(editedSchema);
    const index = parseInt(INDEX_REGEX.exec(keyPath)?.[1] || '');
    const parentObjectKey = keyPath.replace(INDEX_REGEX, '');
    const parentObject = get(copy, parentObjectKey) as Array<any>;  
    parentObject.splice(index,1);
    setEditedSchema(copy);
  }

  const updateSchema = () => {
    try {
      appManager.updateSchema(editedSchema);
    } catch (e) {
      showNotice(`Could not save schema: ${e}`);
    }
  }

  const updateName = (name: string) => {
    const copy = cloneDeep(editedSchema);
    copy.name = name;
    setEditedSchema(copy);
  }

  const move = (position: number, keyPath: string) => {
    const copy = cloneDeep(editedSchema);
    const index = parseInt(INDEX_REGEX.exec(keyPath)?.[1] || '');
    const target = index + position;
    const rootKeyPath = keyPath.replace(INDEX_REGEX, '');
    const array = get(copy, rootKeyPath) as Array<any>;
    if (typeof index !== 'number' || target < 0 || target >= array.length) {
      console.error('Cannot swap - index out of range');
      return;
    }
    [array[index], array[target]] = [array[target], array[index]];
    setEditedSchema(copy);
  }

  const add = (keyPath: string) => {
    setShowInsertKey(keyPath);
    setShowInsert(true);
  }

  const insert = (type: string, key: string, title: string) => {    
    const rootKeyPath = showInsertKey.replace(INDEX_REGEX, '');
    const copy = cloneDeep(editedSchema);

    const extraAttributes = (() => {
      switch (type) {
        case 'array':
        case 'group':  
          return { items: [] };
        default:
          return {};
      }
    })();
    
    (get(copy, rootKeyPath) as Array<SchemaType>).push(
      { 
        type: type as unknown as any, 
        name: title,
        key: key,
        ...extraAttributes
      }
    )

    setEditedSchema(copy);
  }

  const deleteSchema = () => {
    try {
      appManager.deleteSchema(schema);
    } catch (e) {
      showNotice(`Could not delete schema: ${e}`);
    }
    return true;
  }

  const showDeleteDialog = () => {
    showNotice(i('confirm--delete-schema'), 'Delete', 'Cancel', deleteSchema);
  }

  return (
    <>
      <AddSchemaItemDialog show={showInsert} onAdd={insert} onClosed={setShowInsert} />
      <div className="flex flex-col flex-grow bg-neutral-100 dark:bg-neutral-900">
        <div className="px-2 border-b border-b-neutral-300 dark:border-b-black p-1 flex flex-row gap-1 items-center">
          <TextBox inline className="px-2 text-sm truncate flex-shrink" value={editedSchema?.name} onValueChange={updateName} />
          <span className={`text-xxs italic opacity-0 transition-opacity truncate ${modified && 'opacity-100'}`}>(modified)</span>
          <div className="flex-grow" />
          <Button type="icon" onClick={() => add("items")}>
            <BiPlus className="dark:text-white m-2" />
          </Button>
          <Button type="icon" onClick={updateSchema}>
            <BiSave className="dark:text-white m-2" />
          </Button>
          <Button type="icon" onClick={showDeleteDialog}>
            <BiTrashAlt className="dark:text-white m-2" />
          </Button>
        </div>
        <div className="flex flex-col flex-grow overflow-y-auto items-center p-2">
          {editedSchema?.items?.length === 0 && (
            <div className="flex p-12 justify-center items-center h-full">
              <Text className="text-xs text-center">
                {i('schema-empty', <BiPlus className="inline" />)}
              </Text>
            </div>
          )}
          {editedSchema?.items?.map((item, i) => {
            let features = [
              i === 0 && 'firstItem',
              i === editedSchema?.items?.length - 1 && 'lastItem'
            ].filter(it => it !== false) as Feature[];

            if (i === 0) { features.push('firstItem'); }
            if (i === editedSchema?.items?.length - 1) { features.push('lastItem'); }
            return (
              <SchemaItemEditor features={features} 
                                key={`items[${i}]`}
                                item={item} 
                                keyPath={`items[${i}]`} 
                                onMove={move} 
                                onUpdate={update}
                                onAdd={add}
                                onDelete={del} />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default SchemaEditor;