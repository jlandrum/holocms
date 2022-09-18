import { SchemaType } from "../../models/Schema";
import TextBox from "./TextBox";
import { BiX, BiWrench, BiUpArrowAlt, BiDownArrowAlt, BiPlus } from 'react-icons/bi';
import Button from "./Button";
import Text from "./Text";
import { forwardRef } from "react";
import { SchemaTextEditor } from "./SchemaTextEditor";
import { SchemaArrayEditor } from "./SchemaArrayEditor";
import { SchemaUnknownEditor } from "./SchemaUnknownEditor";
import { SchemaEmptyEditor } from "./SchemaEmptyEditor";
import { SchemaSubSchemaEditor } from "./SchemaSubSchemaEditor";
import { SchemaSelectEditor } from "./SchemaSelectEditor";

export type Feature = 'firstItem' | 'lastItem' | 'canAdd' | 'canConfigure';

export interface SchemaItemEditorProps {
  item: SchemaType;
  keyPath: string;
  features?: Feature[]
  onUpdate: (updatedValue: any, keyPath: string) => void;
  onMove?: (position: number, keyPath: string) => void;
  onAdd?: (keyPath: string) => void;
  onDelete?: (keyPath: string) => void;
}

export const SchemaItemEditor = forwardRef<HTMLDivElement,SchemaItemEditorProps>(({item, keyPath, features, onAdd, onMove, onUpdate, onDelete}, ref) => {
  const Editor = (() => {
    switch (item?.type || '') {
      case 'text':
        return SchemaTextEditor;
      case 'subschema':
        return SchemaSubSchemaEditor;
      case 'group':  
      case 'array':
        return SchemaArrayEditor;
      case 'boolean':
      case 'any':
        return SchemaEmptyEditor;  
      case 'select':
        return SchemaSelectEditor;
      default:
        return SchemaUnknownEditor;  
    }
  })();  

  const updateName = (name: string) => {
    onUpdate?.(name, `${keyPath}.name`);
  }

  const updateKey = (key: string) => {
    onUpdate?.(key, `${keyPath}.key`);
  }

  const effectiveFeatures = [...features || [], ...(Editor as any).features || []]

  return (
    <div ref={ref} className="flex border p-2 mt-2 dark:border-black rounded-md bg-black bg-opacity-nested dark:bg-white dark:bg-opacity-nested flex-col w-full flex-shrink-0 gap-2 max-w-md ">
      <div className="flex justify-between  items-center">
        <div className="flex gap-2 items-center">
          <div className="flex gap-1 items-center">
            <TextBox inline className="text-xs -mx-1 px-1 -my-0.5 py-0.5" value={item.name} onValueChange={updateName}/>
            <Text>:</Text>
            <TextBox inline className="text-xs -mx-1 px-1 -my-0.5 py-0.5" value={item.key} onValueChange={updateKey}/>
          </div>
          <Text customStyle  className="text-tiny text-neutral-600 dark:text-neutral-500">{item.type as string}</Text>
        </div>
        <div className="flex flex-row gap-0.5">
          { effectiveFeatures?.includes('canAdd') && (
            <Button onClick={() => {}} type="icon">
              <BiPlus className="m-1" onClick={() => onAdd?.(`${keyPath}.items`)} />
            </Button>
          )}
          <Button onClick={() => {}} type="icon">
            <BiWrench className="m-1" onClick={() => {}} />
          </Button>
          <Button type="icon" disabled={effectiveFeatures?.includes('firstItem')}>
            <BiUpArrowAlt className="m-1" onClick={() => onMove?.(-1, keyPath)} />
          </Button>          
          <Button type="icon" disabled={effectiveFeatures?.includes('lastItem')}>
            <BiDownArrowAlt className="m-1" onClick={() => onMove?.(1, keyPath)} />
          </Button>          
          <Button type="icon">
            <BiX className="m-1" onClick={() => onDelete?.(keyPath)} />
          </Button>          
        </div>
      </div>
      <Editor keyPath={keyPath} item={item} onAdd={onAdd} onMove={onMove} onUpdate={onUpdate} onDelete={onDelete}/>
    </div>
  )
});


export default SchemaItemEditor;