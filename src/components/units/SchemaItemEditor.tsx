import { Schema, SchemaType } from "../../models/Schema";
import TextBox from "./TextBox";
import { BiX, BiWrench, BiUpArrowAlt, BiDownArrowAlt, BiPlus } from 'react-icons/bi';
import Button from "./Button";
import Text from "./Text";
import { useEditTarget, useProject, useSession } from "./ApplicationManager";
import Dropdown from "./Dropdown";
import { useState } from "react";

export type Feature = 'firstItem' | 'lastItem' | 'canAdd' | 'canConfigure';

interface SchemaItemEditorProps {
  item: SchemaType;
  keyPath: string;
  features?: Feature[]
  onUpdate: (updatedValue: any, keyPath: string) => void;
  onMove?: (position: number, keyPath: string) => void;
  onAdd?: (keyPath: string) => void;
  onDelete?: (keyPath: string) => void;
}

const SchemaNoEditor = ({item, onDelete}: SchemaItemEditorProps) => {
  return (<></>)
}


const SchemaTextEditor = ({item, onDelete}: SchemaItemEditorProps) => {
  return (
    <></>
  )
}

const SchemaArrayEditor = ({item, keyPath, onAdd, onDelete, onUpdate, onMove}: SchemaItemEditorProps) => {
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
        )
      })}
    </div>  
  )
}
SchemaArrayEditor.features = ['canAdd']

const SchemaUnknownEditor = ({item, onDelete}: SchemaItemEditorProps) => {
  return (
    <div >
      <span className="text-sm">This schema item type is unknown.</span>
    </div>
  )
}

const SchemaSubSchemaEditor = ({item, onDelete, onUpdate, keyPath}: SchemaItemEditorProps) => {
  const session = useSession();

  const options = session!!.schemas
    .map(it => ({ name: it.name, key: it.id }));

  const setSchema = (id: string) => {
    onUpdate({...item, schema: id}, keyPath);
  } 

  const setArray = (checked: boolean) => {
    onUpdate({...item, array: checked}, keyPath);
  }

  return (
    <div className="flex gap-1 flex-col">
      <Dropdown emptyText={item.schema ? '<Invalid Selection>' : 'Select Item'} selection={item.schema || ''} onSelect={setSchema} items={options} />
      <span className="flex gap-2">
        <input type='checkbox' checked={item.array} onChange={(e) => setArray(e.currentTarget.checked)} />
        <Text>Allow Multiple Instances (Behave as array)</Text>
      </span>
    </div>
  )
}

const SchemaItemEditor = ({item, keyPath, features, onAdd, onMove, onUpdate, onDelete}: SchemaItemEditorProps) => {
  const Editor = (() => {
    switch (item?.type || '') {
      case 'text':
        return SchemaTextEditor;
      case 'subschema':
        return SchemaSubSchemaEditor;
      case 'group':  
      case 'array':
        return SchemaArrayEditor;  
      default:
        return SchemaUnknownEditor;  
    }
  })();  

  const updateName = (name: string) => {
    onUpdate?.(name, `${keyPath}.name`);
  }

  const effectiveFeatures = [...features || [], ...(Editor as any).features || []]

  return (
    <div className="flex border p-2 mt-2 dark:border-black rounded-md bg-black bg-opacity-nested dark:bg-white dark:bg-opacity-nested flex-col w-full flex-shrink-0 gap-2 max-w-md ">
      <div className="flex justify-between  items-center">
        <div className="flex gap-2 items-center">
          <TextBox inline className="text-xs -mx-1 px-1 -my-0.5 py-0.5" value={item.name} onValueChange={updateName}/>
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
}

export default SchemaItemEditor;