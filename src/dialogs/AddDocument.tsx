
import { useState } from 'react';
import { useAppManager } from '../components/units/ApplicationManager';
import Button from '../components/units/Button';
import { useClose } from '../components/units/Dialog';
import Text from '../components/units/Text';
import TextBox from '../components/units/TextBox';

const AddDocument = () => {
  const close = useClose();
  const appManager = useAppManager();

  const [title, setTitle] = useState('');
  const [key, setKey] = useState('');

  const addDocument = () => {
    try {
      appManager.addDocument({type: 'document', title, key})
    } catch (e) {
      alert('Could not create document: \n' + e);
    }
  }

  return (
    <div className='flex flex-col w-96 gap-2'>
      <Text className='text-sm text-bold'>Add Document</Text>
      <div className='flex flex-col gap-1'>
        <Text className='text-bold'>Title</Text>
        <TextBox value={title} onValueChange={setTitle} />
      </div>
      <div className='flex flex-col gap-1'>
        <Text className='text-bold'>Key</Text>
        <TextBox value={key} onValueChange={setKey} />
      </div>
      <div className='flex flex-row-reverse gap-2 mt-2'>
        <Button type='primary' onClick={addDocument}>Add</Button>
        <Button onClick={close}>Cancel</Button>
      </div>
    </div>
  )
}

export default AddDocument;