
import { useState } from 'react';
import { useAppManager } from '../components/units/ApplicationManager';
import Button from '../components/units/Button';
import { useClose } from '../components/units/Dialog';
import Text from '../components/units/Text';
import TextBox from '../components/units/TextBox';
import { i } from '../lang/I18N';
import { useNotice } from './Notice';

const AddDocument = () => {
  const close = useClose();
  const appManager = useAppManager();
  const notice = useNotice();

  const [title, setTitle] = useState('');
  const [key, setKey] = useState('');

  const canSubmit = title.trim() && key.trim();

  const addDocument = () => {
    try {
      appManager.addDocument({type: 'document', title, key});
      close();
    } catch (e: any) {
      notice(`${i('error--could-not-create-document')}\n\n${e.message}`);
    }
  }

  return (
    <div className='flex flex-col w-96 gap-2'>
      <Text className='text-sm text-bold'>{i('add-document')}</Text>
      <div className='flex flex-col gap-1'>
        <Text className='text-bold'>{i('title')}</Text>
        <TextBox value={title} onValueChange={setTitle} />
      </div>
      <div className='flex flex-col gap-1'>
        <Text className='text-bold'>{i('key')}</Text>
        <TextBox value={key} onValueChange={setKey} />
      </div>
      <div className='flex flex-row-reverse gap-2 mt-2'>
        <Button disabled={!canSubmit} type='primary' onClick={addDocument}>{i('add')}</Button>
        <Button onClick={close}>{i('cancel')}</Button>
      </div>
    </div>
  )
}

export default AddDocument;