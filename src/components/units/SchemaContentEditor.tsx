import { isArray } from "lodash";
import { Schema, SchemaType, SchemaTypes } from "../../models/Schema"
import Block from "./Block";

interface SchemaContentEdtiorProps {
  schema: Schema | SchemaType[];
}

const mapSchemaToBlock = (schemaType: SchemaType) => (
  <Block type={schemaType} />
)

const SchemaContentEditor = ({schema}: SchemaContentEdtiorProps) => {
  const items = isArray(schema) ? schema : schema.items;
  return (  
    <div className="border border-black rounded-md flex flex-col">
      { items.map(mapSchemaToBlock) }
    </div>
  )
}

export default SchemaContentEditor;