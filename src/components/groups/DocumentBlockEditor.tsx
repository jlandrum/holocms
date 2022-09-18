import Text from "../units/Text";
import BlockContentEditor from "../units/BlockContentEditor";
import Dropdown from "../units/Dropdown";
import { useSession } from "../units/ApplicationManager";
import { i } from "../../lang/I18N";

interface DocumentBlockEditorProps {
  content: any;
  setContent: ((value: any) => void);
}

const DocumentBlockEditor = ({content, setContent}: DocumentBlockEditorProps) => {
  const session = useSession();

  const schemas = session.schemas.map(it => ({ name: it.name, key: it.id }));

  const setSchema = (schema: string) => {
    setContent({...content, schema: schema});
  }

  const setInnerContent = (value: any) => {
    setContent({...content, content: value});
  }

  const activeSchema = session.schemas.find(it => it.id === content.schema);

  return (<div className="gap-2 flex flex-col">
    <div className="flex flex-col gap-1">
      <Text>{i('schema')}</Text>
      <Dropdown items={schemas} 
                selection={content.schema} 
                onSelect={setSchema} />
    </div>
    { activeSchema && <BlockContentEditor content={content} 
                                          setContent={setInnerContent} 
                                          schema={activeSchema} /> }
  </div>);
}

export default DocumentBlockEditor;
