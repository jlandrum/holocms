import Frame from 'react-frame-component';
import { i } from '../../lang/I18N';
import HoloDocument from "../../models/HoloDocument";

interface DocumentPreviewProps {
  document: HoloDocument;
}

const DocumentPreview = ({document}: DocumentPreviewProps) => {
  return (
  <>
    <div className="bg-red-800 text-white p-2 flex">
      <span className="text-tiny leading-none">
        {i('warning--preview-url')}
      </span>
    </div>
    <Frame title={document?.key} className="bg-white h-full w-full">
      <h1>
        {document.title}
      </h1>
      { typeof document.content === 'object' ? (
        <main>
          <pre>
            {JSON.stringify(document.content.content, null, 2)}
          </pre>
        </main> ) : (
        <main dangerouslySetInnerHTML={{
          __html: document.content
        }} />
      )}
    </Frame>
  </>
  );
}

export default DocumentPreview;