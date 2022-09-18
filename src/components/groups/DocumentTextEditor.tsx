import TextBox from "../units/TextBox";
import Text from "../units/Text";
import { i } from "../../lang/I18N";

interface DocumentTextEditorProps {
  content: string;
  setContent: ((value: string) => void);
}

const DocumentTextEditor = ({content, setContent}: DocumentTextEditorProps) => {
  return (
    <>
      <Text>{i('content-html')}</Text>
      <TextBox lines={4} className="flex-grow" value={content} onValueChange={setContent} />
    </>
  );
}

export default DocumentTextEditor;
