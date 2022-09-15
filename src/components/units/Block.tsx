import { i } from "../../lang/I18N";
import { SchemaType, SchemaTypes } from "../../models/Schema";
import Session from "../../models/Session";
import { useSession } from "./ApplicationManager";
import ArrayBlock from "./ArrayBlock";
import SchemaContentEdtior from "./SchemaContentEditor";
import SchemaItemEditor from "./SchemaItemEditor";
import TextBox from "./TextBox";

interface BlockProps {
  type: SchemaType;
}

const TextBlock = () => {
  return <TextBox />
}

const ErrorBlock = ({children}: {children: string}) => {
  return <div className="bg-red-500 bg-opacity-40 p-2 rounded-md">{children}</div>
}

const renderTypeEditor = (schemaType: SchemaType, session: Session) => {
  switch (schemaType.type) {
    case 'text':
      return <TextBlock />
    case 'group':
      return <SchemaContentEdtior schema={schemaType.items} />
    case 'subschema':
      const schema = session.schemas.find(it => it.id === schemaType.schema);
      if (schema) {
        if (schemaType.array) return <ArrayBlock schemaType={schema.items} />
        else return <SchemaContentEdtior schema={schema} />
      }
      return <ErrorBlock>No Schema Selected</ErrorBlock>
    case 'array':
      return <ArrayBlock schemaType={schemaType}/>  
    default:
      return <></>
  }
}

const Block = ({type}: BlockProps) => {
  const session = useSession();

  return (
    <div className="text-xs flex flex-col p-2 gap-2">
      <span className="">
        {type?.name}
      </span>
      {renderTypeEditor(type, session!!)}
    </div>
  )
}

export default Block;