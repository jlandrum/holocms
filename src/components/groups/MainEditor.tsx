import TitleBarArea from "../units/TitleBarArea";
import ManagePanel from "./ManagePanel";
import Text from '../units/Text';
import { useEditTarget, useProject } from "../units/ApplicationManager";
import DocumentEditor from "./DocumentEditor";
import SchemaEditor from "./SchemaEditor";

const MainEditor = () => {
  const project = useProject();
  const document = useEditTarget();

  return (
    <div className="flex flex-col flex-grow">
      <TitleBarArea className="flex pl-2 space-x-2 items-center h-12 border-b border-neutral-300 bg-neutral-200 dark:bg-neutral-800 dark:border-neutral-900">
        <Text className="text-md">{ project?.name}</Text>
      </TitleBarArea>
      <div className="flex flex-row flex-grow h-0 overflow-hidden">
        <ManagePanel />
        <div className='flex-grow flex-shrink dark:text-white bg-white dark:bg-neutral-900 shadow-md flex flex-row'>
          { document?.type === 'document' && <DocumentEditor /> }
          { document?.type === 'schema' && <SchemaEditor /> }
        </div>
      </div>
    </div>
  )
}

export default MainEditor;