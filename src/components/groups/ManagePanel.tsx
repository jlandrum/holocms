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

const ManagePanel = () => {  
  const [size, setSize] = useState(200);
  const [showAddDocument, setShowAddDocument] = useState(false);

  const session = useSession();
  const appManager = useAppManager();
  const editTarget = useEditTarget();

  const setEditTarget = (document: HoloDocument | Schema) => () => {
    appManager.setActiveForEdit(document);
  }
  
  return (
    <>
      <Dialog View={AddDocument} show={showAddDocument} onClosed={() => setShowAddDocument(false)} />
      <ToolPanel type='inline' size={size} onSizeChanged={setSize}>
        <div className='overflow-scroll flex-grow bg-neutral-100 dark:bg-neutral-900'>
          <Text customStyle className='text-tiny px-4 py-1 text-neutral-500 dark:text-neutral-500 font-bold'>
            Documents
          </Text>
          <div className='flex flex-col gap-1 m-1'>
            {session?.documents?.map(doc => (
              <Button type="listItem" 
                      key={doc.key}
                      selected={doc.key === (editTarget as any)?.key}
                      onClick={setEditTarget(doc)}>{doc.title}</Button>
            ))}
          </div>
          <Text customStyle className='text-tiny px-4 py-1 text-neutral-500 dark:text-neutral-500 font-bold'>
            Schemas
          </Text>
          <div className='flex flex-col gap-1 m-1'>
            {session?.schemas?.map(schema => (
              <Button type="listItem"
                      onClick={setEditTarget(schema)}
                      selected={schema?.name === (editTarget as any)?.name}
                      key={schema?.name}>{schema?.name}</Button>
            ))}
          </div>
        </div>
        <div className='p-2 bg-neutral-100 dark:bg-neutral-900'>
          <Button type='icon' 
                  className='justify-center flex'
                  onClick={() => {setShowAddDocument(true)}}>
            <BiPlus size="16" className='flex-shrink-0 m-1 dark:text-white' />
          </Button>
        </div>
      </ToolPanel>
    </>

  )
}

export default ManagePanel;