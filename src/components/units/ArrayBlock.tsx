import { SchemaType } from "../../models/Schema";
import { BiPlus, BiUpArrow, BiDownArrow } from 'react-icons/bi';
import Button from "./Button";
import { useState } from "react";
import SchemaContentEditor from "./SchemaContentEditor";
import { isArray } from "lodash";
import { plurality } from "../../Util";

interface ArrayBlockProps {
  schemaType: SchemaType | SchemaType[];
}

const ArrayBlock = ({schemaType}: ArrayBlockProps) => {
  const [items, setItems] = useState<any[]>([]);
  const [collapsed, setCollapsed] = useState(true);

  const schema = isArray(schemaType) ? schemaType : schemaType.items;

  const Arrow = collapsed ? BiDownArrow : BiUpArrow;

  return (
    <div className="flex flex-col flex-grow gap-2 dark:bg-neutral-500 dark:bg-opacity-5 p-1 rounded-md">
      <div className="items-center rounded-md p-1 flex flex-row">
        <span className="text-tiny">{items.length || 0} item{plurality(items.length || 0)}</span>
        <div className="flex-grow" />
        <Button type='icon' onClick={() => {
          setItems(items.concat({}));
          setCollapsed(false);
        }}>
          <BiPlus className="m-1" />
        </Button>
        <Button type='icon' onClick={() => setCollapsed(!collapsed)}>
          <Arrow className="m-1" />
        </Button>
      </div>
      { !collapsed && items.map(it => (
        <div><SchemaContentEditor schema={schema} /></div>
      ))}
    </div>
  )
}

export default ArrayBlock;