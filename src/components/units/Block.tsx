import { SchemaType } from "../../models/Schema";
import Session from "../../models/Session";
import { useSession } from "./ApplicationManager";
import ArrayBlock from "./ArrayBlock";
import SchemaContentEditor from "./SchemaContentEditor";
import TextBox from "./TextBox";

interface BlockProps {
  type: SchemaType;
}

const TextBlock = ({type}: {type: SchemaType}) => {
  return (
    <div className={`flex gap-2 ${type.textArea && 'flex-col'}`}>
      <span className="">
        {type?.name}
      </span>
      <TextBox lines={type.textArea ? 5 : 1} className="flex-grow" />
    </div>
  )
}

const ErrorBlock = ({children}: {children: string}) => {
  return <div className="bg-red-500 bg-opacity-40 p-2 rounded-md">{children}</div>
}

const renderTypeEditor = (schemaType: SchemaType, session: Session) => {
  switch (schemaType.type) {
    case 'text':
      return <TextBlock type={schemaType} />
    case 'group':
      return <SchemaContentEditor schema={schemaType.items} />
    case 'subschema':
      const schema = session.schemas.find(it => it.id === schemaType.schema);
      if (schema) {
        if (schemaType.array) return <ArrayBlock title={schema.name} schemaType={schema.items} />
        else return <SchemaContentEditor schema={schema} />
      }
      return <ErrorBlock>No Schema Selected</ErrorBlock>
    case 'array':
      return <ArrayBlock title={schemaType.name} schemaType={schemaType}/>  
    default:
      return <></>
  }
}

const Block = ({type}: BlockProps) => {
  const session = useSession();

  return (
    <div className="text-xs flex flex-col p-2 gap-2">
      {renderTypeEditor(type, session!!)}
    </div>
  )
}

export default Block;