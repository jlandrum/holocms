
import { useContext, useState, createContext } from 'react';
import Button from '../components/units/Button';
import Dialog, { DialogProps, useClose } from '../components/units/Dialog';
import Text from '../components/units/Text';

type UseNoticeType = (message: string) => void

const NoticeContext = createContext<UseNoticeType>(() => {})

interface AddDocumentProps {
  children: string;
  confirm?: string;
}

const Notice = ({children, confirm = "OK"}: AddDocumentProps) => {
  const close = useClose();

  return (
    <div className='flex flex-col w-96 gap-2'>
      <Text className='text-sm text-bold'>{children}</Text>
      <div className='flex flex-row-reverse gap-2 mt-2'>
        <Button type='primary' onClick={close}>{confirm}</Button>
      </div>
    </div>
  )
}

interface NoticeDialogProps extends AddDocumentProps, Omit<DialogProps, 'children'> {}

export const NoticeDialog = ({show, onClosed, children}: NoticeDialogProps) => (
  <Dialog onClosed={onClosed} show={show}>
    {() => <Notice>{children}</Notice>}
  </Dialog>
)

export const useNotice = () => {
  const notice = useContext(NoticeContext);
  return notice;
}

interface NoticeProviderProps {
  children?: React.ReactNode | React.ReactNode[];
}

export const NoticeProvider = ({children}: NoticeProviderProps) => {
  const [message, setMessage] = useState('');
  const [show, setShow] = useState(false);

  return (
    <NoticeContext.Provider value={(message: string) => {
      setMessage(message);
      setShow(true);
    }}>
      {children}
      <NoticeDialog show={show} onClosed={setShow}>{message}</NoticeDialog>
    </NoticeContext.Provider>
  )
}

export default Notice;