import { useAppManager, useEditTarget } from "../units/ApplicationManager";
import Button from "../units/Button";
import { BiCodeBlock, BiLayout, BiSave, BiShowAlt, BiPencil } from 'react-icons/bi';

import { useEffect, useState } from "react";
import TextBox from "../units/TextBox";
import Text from "../units/Text";
import Frame from 'react-frame-component';
import Block from "../units/Block";
import HoloDocument from "../../models/HoloDocument";

const DocumentEditor = () => {
  const document = useEditTarget<HoloDocument>()!!;
  const appManager = useAppManager();

  const [mode, setMode] = useState(1);
  const [type, setType] = useState(0);

  const [title, setTitle] = useState(document?.title);
  const [content, setContent] = useState(document?.content)

  const modified = title !== document?.title || content  !== document?.content;

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
    const newDoc = {...document!!, title: title || '', content};
    appManager.updateDocument(newDoc);
  }

  useEffect(() => {
    setTitle(document.title || '');
    setContent(document.content || '');
    setType(typeof document.content === "object" ? 1 : 0);
  }, [document]);

  return (
    <div className="flex flex-col flex-grow bg-neutral-100 dark:bg-neutral-900">
      <div className="border-b border-b-neutral-300 dark:border-b-black p-1 flex flex-row gap-1 items-center">
        <Button type="icon" onClick={toggleMode}>
          <ModeIcon size="16" className="dark:text-white m-1.5" />
        </Button>
        <span className="text-sm truncate flex-shrink">{document?.title}</span>
        <span className={`text-xxs italic opacity-0 transition-opacity truncate ${modified && 'opacity-100'}`}>(modified)</span>
        <div className="flex-grow" />
        { mode === 1 && (
          <>
            <Button selected={type === 0} type='icon' onClick={() => setType(0)}>
              <BiCodeBlock className="m-2" />
            </Button>
            <Button selected={type === 1} type='icon' onClick={() => setType(1)}>
              <BiLayout className="m-2" />
            </Button>
          </>
        )}
        <Button type="icon" onClick={updateDocument}>
          <BiSave className="dark:text-white m-2" />
        </Button>

      </div>
      {
        mode === 0 && (
          <>
            <div className="bg-red-800 text-white p-2 flex">
              <span className="text-tiny leading-none">
                Warning: A preview URL was not provided; Standard HTML will be displayed instead.
              </span>
            </div>
            <Frame title={document?.key} className="bg-white h-full w-full">
              <h1>
                {title}
              </h1>
              <main dangerouslySetInnerHTML={{__html: content}} />
            </Frame>
          </>
        )
      }
      {
        mode === 1 && (
          <div className="p-2 flex flex-col gap-2 h-full">
            <Text>Title</Text>
            <TextBox value={title} onValueChange={setTitle} />
            { type === 0 && (
              <>
                <Text>Content (HTML)</Text>
                <TextBox area className="flex-grow" value={content} onValueChange={setContent} />
              </>
            )}
            { type === 1 && (
              <div>
                {
                  content.map((block: any) => <Block content={block} />)
                }
              </div>
            )}
          </div>
        )
      }
    </div>
  )
}

export default DocumentEditor;