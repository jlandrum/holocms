import { useState } from 'react';
import Button from '../components/units/Button';
import Dialog, { DialogProps, useClose } from '../components/units/Dialog';
import { SchemaTypes } from '../models/Schema';
import Text from '../components/units/Text';
import TextBox from '../components/units/TextBox';
import { i } from '../lang/I18N';

interface AddSchemaItemProps {
  onAdd: (type: string, key: string, title: string) => void;
}

const AddSchemaItem = ({onAdd}: AddSchemaItemProps) => {
  const close = useClose();
  const [selection, setSelection] = useState<string>();
  const [title, setTitle] = useState('');
  const [key, setKey] = useState('');

  const onSelect = () => {
    onAdd?.(selection!!, key, title);
    close();
  }

  const disabled = !selection || title.trim() === '' || key.trim() === '';

  return (
    <div className='flex flex-col w-96 gap-2'>
      <Text className='text-sm text-bold'>{i('add-schema-item')}</Text>
      <div className='flex flex-col gap-1'>
        <Text className='text-bold'>{i('title')}</Text>
        <TextBox value={title} onValueChange={setTitle} />
      </div>
      <div className='flex flex-col gap-1'>
        <Text className='text-bold'>{i('key')}</Text>
        <TextBox value={key} onValueChange={setKey} />
      </div>
      <div className='border border-neutral-300 rounded-md p-2 bg-white dark:bg-black dark:border-neutral-800 flex flex-col h-32 overflow-scroll scrollbar-thin scrollbar-thumb-rounded-lg scrollbar-thumb-neutral-500 scrollbar-track-transparent'>        
        { SchemaTypes.map(type => (
          <Button key={type} type='listItem' selected={selection === type} onClick={() => setSelection(type)}>{i(type)}</Button>
        ))}
      </div>
      <div className='flex flex-row-reverse gap-2 mt-2'>
        <Button disabled={disabled} type='primary' onClick={onSelect}>{i('insert')}</Button>
        <Button onClick={close}>{i('cancel')}</Button>
      </div>
    </div>
  )
}


interface AddSchemaItemDialogProps extends AddSchemaItemProps, Omit<DialogProps, 'children'> {}

export const AddSchemaItemDialog = ({show, onClosed, onAdd}: AddSchemaItemDialogProps) => (
  <Dialog onClosed={onClosed} show={show}>
    {() => <AddSchemaItem onAdd={onAdd} />}
  </Dialog>
)

export default AddSchemaItem;