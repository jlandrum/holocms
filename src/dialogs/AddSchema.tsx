
import { useState } from 'react';
import { useAppManager } from '../components/units/ApplicationManager';
import Button from '../components/units/Button';
import Dialog, { DialogProps, useClose } from '../components/units/Dialog';
import Text from '../components/units/Text';
import TextBox from '../components/units/TextBox';
import { v4 as uuidv4 } from 'uuid';
import { useNotice } from './Notice';
import { i } from '../lang/I18N';

const AddSchema = () => {
  const close = useClose();
  const appManager = useAppManager();

  const [name, setName] = useState('');
  const showNotice = useNotice();

  const addDocument = () => {
    try {
      appManager.addSchema({type: 'schema', name, id: uuidv4(), items: []})
      close();
    } catch (e) {
      showNotice(`Could not create schema: \n ${e}`);
    }
  }

  return (
    <>
      <div className='flex flex-col w-96 gap-2'>
        <Text className='text-sm text-bold'>{i('add-schema')}</Text>
        <div className='flex flex-col gap-1'>
          <Text className='text-bold'>{i('title')}</Text>
          <TextBox value={name} onValueChange={setName} />
        </div>
        <div className='flex flex-row-reverse gap-2 mt-2'>
          <Button type='primary' onClick={addDocument}>{i('add')}</Button>
          <Button onClick={close}>{i('cancel')}</Button>
        </div>
      </div>
    </>
  )
}

interface AddSchemaDialogProps extends Omit<DialogProps, 'children'> {}

export const AddSchemaDialog = ({show, onClosed}: AddSchemaDialogProps) => (
  <Dialog onClosed={onClosed} show={show}>
    {() => <AddSchema />}
  </Dialog>
)

export default AddSchema;