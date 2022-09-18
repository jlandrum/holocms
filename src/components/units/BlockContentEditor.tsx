import { cloneDeep, get, isArray, set } from "lodash";
import { Schema, SchemaType } from "../../models/Schema"
import Block from "./Block";

export type UpdateContent = (key: string, value: any) => void;

interface SchemaContentEdtiorProps {
  schema: Schema | SchemaType[];
  content: any;
  rootKey?: string;
  setContent: (content: any) => void;
}

const BlockContentEditor = ({schema, rootKey, content, setContent}: SchemaContentEdtiorProps) => {
  const items = isArray(schema) ? schema : schema.items;

  const updateContentAtKey = (key: string, value: any) => {
    const copy = cloneDeep(content.content);
    set(copy, key, value);    
    setContent(copy);
  }

  return (  
    <div className="rounded-md flex flex-col">
      { items?.map((item, index) => {
        const key = `${rootKey?rootKey+'.':''}${item.key}`;
        const value = get(content.content, key);
        return (
          <Block 
               keyName={key}
               value={value}      
               onUpdate={updateContentAtKey} 
               type={item} />
        )}
      )}
    </div>
  )
}

export default BlockContentEditor;