import { useAppManager, useEditTarget, useSchema } from "../units/ApplicationManager";
import Button from "../units/Button";
import { BiCodeBlock, BiLayout, BiSave, BiShowAlt, BiPencil } from 'react-icons/bi';

import { useEffect, useState } from "react";
import TextBox from "../units/TextBox";
import Text from "../units/Text";
import HoloDocument from "../../models/HoloDocument";
import DocumentPreview from "./DocumentPreview";
import DocumentTextEditor from "./DocumentTextEditor";
import DocumentBlockEditor from "./DocumentBlockEditor";
import { useNotice } from "../../dialogs/Notice";
import { i } from "../../lang/I18N";

const DocumentEditor = () => {
  const document = useEditTarget<HoloDocument>()!!;
  const appManager = useAppManager();
  const showNotice = useNotice();

  const [mode, setMode] = useState(1);
  const [type, setType] = useState(0);

  const [title, setTitle] = useState(document?.title);
  const [content, setContent] = useState(document?.content)

  const modified = title !== document?.title || content !== document?.content;

  const ModeIcon = (() => {
    switch (mode) {
      case 1:
        return BiShowAlt;
      default:
      case 0:
        return BiPencil
    }
  })();

  const toggleMode = () => setMode((mode + 1) % 2)

  const updateDocument = () => {
    const newDoc = { ...document!!, title: title || '', content };
    appManager.updateDocument(newDoc);
  }

  useEffect(() => {
    setTitle(document.title || '');
    setContent(document.content || '');
    setType(typeof document.content === "object" ? 1 : 0);
  }, [document]);

  const setTypeAndContent = (type: number) => {
    showNotice(i('confirm--change-type'),
               i('change-type'),
               i('cancel'),
               () => {
                switch (type) {
                  case 0:
                    setContent('');
                    setType(0);
                    break;
                  case 1:
                    setContent({ schema: '', content: []});
                    setType(1);
                    break;
                }            
               });
  }

  return (
    <div className="flex flex-col flex-grow bg-neutral-100 dark:bg-neutral-900">
      <div className="border-b border-b-neutral-300 dark:border-b-black p-1 flex flex-row gap-1 items-center">
        <Button type="icon" onClick={toggleMode}>
          <ModeIcon size="16" className="dark:text-white m-1.5" />
        </Button>
        <span className="text-sm truncate flex-shrink">{document?.title}</span>
        <span className={`text-xxs italic opacity-0 transition-opacity truncate ${modified && 'opacity-100'}`}>(modified)</span>
        <div className="flex-grow" />
        {mode === 1 && (
          <>
            <Button selected={type === 0} type='icon' onClick={() => setTypeAndContent(0)}>
              <BiCodeBlock className="m-2" />
            </Button>
            <Button selected={type === 1} type='icon' onClick={() => setTypeAndContent(1)}>
              <BiLayout className="m-2" />
            </Button>
          </>
        )}
        <Button type="icon" onClick={updateDocument}>
          <BiSave className="dark:text-white m-2" />
        </Button>

      </div>
      {mode === 0 && <DocumentPreview document={document} />}
      {
        mode === 1 && (
          <div className="p-2 flex flex-col gap-2 h-full overflow-y-auto scrollbar scrollbar-thin">
            <Text>Title</Text>
            <TextBox value={title} onValueChange={setTitle} />
            {type === 0 && (
              <DocumentTextEditor content={content} setContent={setContent}></DocumentTextEditor>)}
            {type === 1 && (
              <DocumentBlockEditor content={content} setContent={setContent}></DocumentBlockEditor>)}
          </div>
        )
      }
    </div>
  )
}

export default DocumentEditor;