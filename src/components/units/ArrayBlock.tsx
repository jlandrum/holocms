import { SchemaType } from "../../models/Schema";
import { BiPlus, BiMinus, BiCaretDown, BiCaretUp } from 'react-icons/bi';
import Button from "./Button";
import { useState } from "react";
import { plurality } from "../../Util";
import Block, { BlockProps } from "./Block";
import Text from "./Text";
import { cloneDeep, get } from "lodash";
import { ErrorBoundary } from "./ErrorBoundary";
import { UpdateContent } from "./BlockContentEditor";
import { i } from "../../lang/I18N";

interface ArrayBlockProps extends BlockProps {
  types?: SchemaType | SchemaType[]
}

interface ArrayItemProps {
  value: any;
  index: number;
  keyName: string;
  deleteItem: (keyName: string, index: number) => void;
  onUpdate: UpdateContent;
  type: SchemaType;
}

const ArrayItem = ({index, keyName, value, type, onUpdate, deleteItem}: ArrayItemProps) => {
  const [collapsed, setCollapsed] = useState(true);
  const Arrow = collapsed ? BiCaretDown : BiCaretUp;

  return (
    <div className="flex flex-col flex-grow bg-black bg-opacity-5 dark:bg-neutral-500 dark:bg-opacity-5 p-1 rounded-md m-1">
      <div className="flex flex-row items-center bg-black bg-opacity-5 rounded-md p-1 gap-2">
        <Text className="text-tiny ml-1">{i('item')} {index+1}</Text>
        <div className="flex-grow" />
        <Button type='icon' onClick={() => deleteItem(`${keyName}`, index)}>
          <BiMinus className="m-1" />
        </Button>
        <Button type='icon' onClick={() => setCollapsed(!collapsed)}>
          <Arrow className="m-1" />
        </Button>
      </div>
      {
        !collapsed && type.items.map((schema: SchemaType) => (
          <Block keyName={`${keyName}[${index}].${schema.key}`}
                onUpdate={onUpdate}
                value={value[schema.key]}
                type={schema} />
        ))
      }
    </div>
  )
}

const ArrayBlock = ({types, keyName, type, value: _value, onUpdate}: ArrayBlockProps) => {
  const [collapsed, setCollapsed] = useState(true);

  const Arrow = collapsed ? BiCaretDown : BiCaretUp;
  const value = _value || [];

  const addItem = () => {    
    onUpdate(keyName, [...value, {}]);
  }

  const deleteItem = (withKey: string, index: number) => {
    const copy = cloneDeep(value);
    copy.splice(index,1);
    onUpdate(keyName, [...copy])
  }

  return (
    <ErrorBoundary>
      <div className="flex flex-col flex-grow gap-2 bg-neutral-500 bg-opacity-5 dark:bg-neutral-500 dark:bg-opacity-5 p-1 rounded-md">
        <div className="items-center rounded-md p-1 flex flex-row">
          <div className="flex flex-row gap-1 items-center">
            <Text className="text-sm">{type?.name}</Text>
            <Text className="text-tiny">{plurality(value.length || 0, 'count-item', 'count-items')}</Text>
          </div>
          <div className="flex-grow" />
          <Button type='icon' onClick={() => {
            addItem();
            setCollapsed(false);
          }}>
            <BiPlus className="m-1" />
          </Button>
          <Button type='icon' onClick={() => setCollapsed(!collapsed)}>
            <Arrow className="m-1" />
          </Button>
        </div>
        <ErrorBoundary>
          {!collapsed && <div className=" rounded-md flex flex-col">
            {
              value.map((it: any, id: number) => (
                <ArrayItem index={id} 
                           value={it} 
                           keyName={keyName} 
                           deleteItem={deleteItem} 
                           onUpdate={onUpdate} 
                           type={type} />
              ))
            }
            </div>
          }
        </ErrorBoundary>
      </div>
    </ErrorBoundary>
  )
}

export default ArrayBlock;