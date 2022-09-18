import { SchemaType, SchemaTypes } from "../../models/Schema";
import Session from "../../models/Session";
import { useSession } from "./ApplicationManager";
import { UpdateContent } from "./BlockContentEditor";
import { ErrorBoundary } from "./ErrorBoundary";
import Text from "./Text";
import { get } from "lodash";
import ArrayBlock from "./ArrayBlock";
import { i } from "../../lang/I18N";
import Dropdown from "./Dropdown";
import { TextBlock } from "./TextBlock";
import { BooleanBlock } from "./BooleanBlock";
import { SelectBlock } from "./SelectBlock";

export interface BlockProps {
  type: SchemaType;  
  keyName: string;
  value: any;
  onUpdate: UpdateContent;
}

const ErrorBlock = ({children}: {children: string}) => {
  return <div className="bg-red-500 bg-opacity-40 p-2 rounded-md">{children}</div>
}

const renderTypeEditor = (schemaType: SchemaType, 
                          key: string, 
                          value: any, 
                          onUpdate: UpdateContent, 
                          session: Session) => {
  switch (schemaType.type) {
    case 'text':
      return <TextBlock onUpdate={onUpdate} 
                        keyName={key}
                        value={value} 
                        type={schemaType} />
    case 'boolean':
      return <BooleanBlock onUpdate={onUpdate} 
                        keyName={key}
                        value={value} 
                        type={schemaType} />
    case 'select':
      return <SelectBlock onUpdate={onUpdate} 
                        keyName={key}
                        value={value} 
                        type={schemaType} />
    case 'any':
      const valState = value?.type ? value : {type: '', content: {}};
      const types = session.schemas.map(it => ({key: it.id, name: it.name}));
      const selection = session.schemas.find(it => it.id === valState.type);
      return (
        <div className="-mx-2 flex flex-col">
          <div className="px-2 mb-2">
            <Dropdown items={types} selection={valState.type} onSelect={(val) => onUpdate(key, {...valState, type: val})} />
          </div>
          <div className="bg-black bg-opacity-5 rounded-md">
            {selection && <Block onUpdate={onUpdate} 
                  keyName={key}
                  value={value} 
                  type={{key: key, 
                          type: 'group' as keyof typeof SchemaTypes, 
                          name: '', 
                          items: selection.items}} />
            }
          </div>
        </div>
      )
    case 'group':
      return (
        <ErrorBoundary>
          <div className=" rounded-md flex flex-col">
            {schemaType.name && <Text className="p-2">{schemaType.name}</Text> }
            {schemaType.items?.map((item: SchemaType) => {
                const groupKey = `${key}.${schemaType.key}.${item.key}`;
                const groupVal = get(value, `${schemaType.key}.${item.key}`);
                return (
                  <Block keyName={groupKey}
                         value={groupVal}
                         type={item}
                         onUpdate={onUpdate} />
                )})}
          </div>
        </ErrorBoundary>
      );
    case 'subschema':
      const schema = session.schemas.find(it => it.id === schemaType.schema);
      if (schema) {
        if (schemaType.array) {
          return <ArrayBlock onUpdate={onUpdate}
                             keyName={key} 
                             value={value}                      
                             type={{key: key, 
                                    type: 'subschema' as keyof typeof SchemaTypes, 
                                    name: schema.name, 
                                    items: schema.items}}/> 
        }
        else return (
          <div className="rounded-md flex flex-col">
            <Text className="p-2">{schemaType.name}</Text>
            {
              schema.items.map(schemaType => (
                <Block onUpdate={onUpdate}
                       keyName={`${key}.${schemaType.key}`}
                       value={value[schemaType.key]}
                       type={schemaType} />
              ))
            }
          </div>
        )
      }
      return <ErrorBlock>No Schema Selected</ErrorBlock>
    case 'array':
      return <ArrayBlock onUpdate={onUpdate}
                         keyName={key} 
                         value={value}                      
                         type={schemaType}/>  
    default:
      return <ErrorBlock>{i('schema-type-unknown')}</ErrorBlock>
  }
}

const Block = ({type, keyName, value, onUpdate}: BlockProps) => {
  const session = useSession();

  return (
    <div className="text-xs flex flex-col p-2 gap-1">
      {renderTypeEditor(type, keyName, value, onUpdate, session)}
    </div>
  )
}

export default Block;