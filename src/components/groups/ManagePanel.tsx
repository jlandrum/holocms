import { useState } from 'react';
import ToolPanel from '../units/ToolPanel';
import Text from '../units/Text';
import Button from '../units/Button';
import { BiPlus } from 'react-icons/bi';
import Dialog from '../units/Dialog';
import AddDocument from '../../dialogs/AddDocument';
import { useAppManager, useEditTarget, useSession } from '../units/ApplicationManager';
import HoloDocument from '../../models/HoloDocument';
import { Schema } from '../../models/Schema';
import AddSchema from '../../dialogs/AddSchema';
import { i } from '../../lang/I18N';

const ManagePanel = () => {  
  const [size, setSize] = useState(200);
  const [showAddDocument, setShowAddDocument] = useState(false);
  const [showAddSchema, setShowAddSchema] = useState(false);

  const session = useSession();
  const appManager = useAppManager();
  const editTarget = useEditTarget();

  const setEditTarget = (document: HoloDocument | Schema) => () => {
    appManager.setActiveForEdit(document);
  }
  
  return (
    <>
      <Dialog show={showAddDocument} onClosed={() => setShowAddDocument(false)}>{() => <AddDocument />}</Dialog>
      <Dialog show={showAddSchema} onClosed={() => setShowAddSchema(false)}>{() => <AddSchema />}</Dialog>
      <ToolPanel type='inline' size={size} onSizeChanged={setSize}>
        <div className='overflow-scroll scrollbar-thin scrollbar-thumb-rounded-lg scrollbar-thumb-neutral-500 scrollbar-track-transparent flex-grow bg-neutral-100 dark:bg-neutral-900'>
          <div className='flex flex-row pl-4 pr-2 items-center justify-between text-neutral-500 dark:text-neutral-500'>
            <Text customStyle className='text-tiny py-1 font-bold'>
              Documents
            </Text>
            <Button type='icon' 
                  className=''
                  onClick={() => {setShowAddDocument(true)}}>
              <BiPlus size="12" className='m-0.5' />
            </Button>
          </div>
          <div className='flex flex-col gap-1 m-1'>
            {session?.documents?.map(doc => (
              <Button type="listItem" 
                      key={doc.key}
                      selected={doc.key === (editTarget as any)?.key}
                      onClick={setEditTarget(doc)}>{doc.title}</Button>
            ))}
          </div>
          <div className='flex flex-row pl-4 pr-2 items-center justify-between text-neutral-500 dark:text-neutral-500'>
            <Text customStyle className='text-tiny py-1 font-bold'>
              Schemas
            </Text>
            <Button type='icon' 
                  className=''
                  onClick={() => {setShowAddSchema(true)}}>
              <BiPlus size="12" className='m-0.5' />
            </Button>
          </div>
          <div className='flex flex-col gap-1 m-1'>
            {(session?.schemas?.length === 0 || !session?.schemas) && (
              <Text className='text-xs mx-2 opacity-60'>{i('no-schemas')}</Text>
            )}
            {session?.schemas?.map(schema => (
              <Button type="listItem"
                      onClick={setEditTarget(schema)}
                      selected={schema?.name === (editTarget as any)?.name}
                      key={schema?.name}>{schema?.name}</Button>
            ))}
          </div>
        </div>
      </ToolPanel>
    </>

  )
}

export default ManagePanel;