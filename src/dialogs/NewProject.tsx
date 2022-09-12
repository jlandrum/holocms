import { memo, useState } from 'react';
import Button from '../components/units/Button';
import { useClose } from '../components/units/Dialog';
import TextBox from '../components/units/TextBox';
import Text from '../components/units/Text';
import { useAppManager } from '../components/units/ApplicationManager';
import { v4 as uuidv4 } from "uuid";

const NewProject = () => {
  const close = useClose();
  const appManager = useAppManager();

  const [name, setName] = useState('');
  const [url, setUrl] = useState('localhost');
  const [port, setPort] = useState('27017');
  const [dbName, setDbName] = useState('holodb');

  const createProject = () => {
    const mdbConfig = {
      type: 'mongodb',
      url,
      port,
      collection: dbName
    }

    appManager.addNewProject({
      name,
      config: mdbConfig,
      id: uuidv4(),
      lastUpdate: Date.now()
    });

    close();
  }

  return (
    <div className='flex-col flex max-w-sm'>
      <div className='flex flex-col'>
        <Text className='text-sm text-bold'>Project Name</Text>
        <TextBox value={name} onValueChange={setName} className='my-2' />
      </div>
      <Text className='text-sm text-bold my-2'>Project Settings</Text>
      <div className='border dark:bg-black dark:border-neutral-800 border-neutral-300 rounded-md p-2 bg-neutral-300 bg-opacity-30'>
        <div className='flex flex-col'>
          <div className='space-x-4'>
            <Text className='text-bold'>URL</Text>
            <TextBox className='my-2' value={url} onValueChange={setUrl} />
            <Text className='text-bold mr-2'>Port</Text>
            <TextBox className='my-2 w-16' value={port} onValueChange={setPort} />
          </div>
          <div className='flex flex-row items-center space-x-4'>
            <Text className='text-bold mr-2'>Database Name</Text>
            <TextBox className='my-2 flex-grow' value={dbName} onValueChange={setDbName} />
          </div>
        </div>
      </div>
      <div className='flex pt-2 justify-end space-x-2'>
        <Button onClick={close}>Close</Button>
        <Button onClick={createProject} type="primary">Next</Button>
      </div>
    </div>
  )
}

export default NewProject;