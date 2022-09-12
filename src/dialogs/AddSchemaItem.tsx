import { memo, useState } from 'react';
import Button from '../components/units/Button';
import { DialogViewProps, useClose } from '../components/units/Dialog';
import { SchemaItemTypes } from '../components/units/SchemaItemEditor';
import Text from '../components/units/Text';
import TextBox from '../components/units/TextBox';
import { i } from '../lang/I18N';

const AddSchemaItem = ({onAction}: DialogViewProps) => {
  const close = useClose();
  const [selection, setSelection] = useState<string>();
  const [title, setTitle] = useState('');

  const onSelect = () => {
    onAction?.({type: selection, title});
    close();
  }

  const schemaTypes = Object.values(SchemaItemTypes).filter(it => isNaN(parseInt(`${it}`))) as string[];

  return (
    <div className='flex flex-col w-96 gap-2'>
      <Text className='text-sm text-bold'>Add Schema Item</Text>
      <div className='flex flex-col gap-1'>
        <Text className='text-bold'>Title</Text>
        <TextBox value={title} onValueChange={setTitle} />
      </div>
      <div className='border border-neutral-300 rounded-md p-2 bg-white dark:bg-black dark:border-neutral-800 flex flex-col h-48 overflow-scroll'>
        { schemaTypes.map(type => (
          <Button type='listItem' selected={selection === type} onClick={() => setSelection(type)}>{i(type)}</Button>
        ))}
      </div>
      <div className='flex flex-row-reverse gap-2 mt-2'>
        <Button disabled={!selection || title.trim() === ''} type='primary' onClick={onSelect}>Insert</Button>
        <Button onClick={close}>Cancel</Button>
      </div>
    </div>
  )
}

export default memo(AddSchemaItem);