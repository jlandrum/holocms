
import { useContext, useState, createContext } from 'react';
import Button from '../components/units/Button';
import Dialog, { DialogProps, useClose } from '../components/units/Dialog';
import Text from '../components/units/Text';

type UseNoticeType = (message: string, 
                      confirm?: string, 
                      cancel?: string, 
                      onConfirm?: () => void) => void

const NoticeContext = createContext<UseNoticeType>(() => {})

interface NoticeDialogProps extends Omit<DialogProps, 'children'> {
  children: string;
  confirm?: string;
  cancel?: string;
  onConfirm?: () => void;
}

export const NoticeDialogImpl = ({show, children, confirm = "Ok", cancel, onConfirm}: Omit<NoticeDialogProps, 'onClosed'>) => {
  const close = useClose();
  return (
    <div className='flex flex-col gap-2'>
      {JSON.stringify(onConfirm)}
      <Text className='text-sm text-bold w-52'>{children}</Text>
      <div className='flex flex-row justify-end gap-2 mt-2'>
        { cancel && <Button onClick={close}>{cancel}</Button> }        
        <Button type='primary' onClick={() => {
          onConfirm?.();
          close();
        }}>{confirm}</Button>
      </div>
    </div>
  )
}

export const NoticeDialog = ({show, children, confirm = "Ok", cancel, onConfirm, onClosed}: NoticeDialogProps) => (
  <Dialog onClosed={onClosed} show={show}>
    {() => <NoticeDialogImpl children={children} confirm={confirm} cancel={cancel} onConfirm={onConfirm} />}
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
  const [confirm, setConfirm] = useState('');
  const [cancel, setCancel] = useState<string | undefined>('');
  const [onConfirm, setOnConfirm] = useState<(() => void)|undefined>(() => {});

  const [show, setShow] = useState(false);

  return (
    <NoticeContext.Provider value={(message, confirm, cancel, _onConfirm) => {
      setMessage(message);
      setConfirm(confirm || 'OK');
      setCancel(cancel);
      setOnConfirm(() => _onConfirm);
      setShow(true);
    }}>
      {children}
      <NoticeDialog show={show} cancel={cancel} confirm={confirm} onConfirm={onConfirm} onClosed={setShow}>{message}</NoticeDialog>
    </NoticeContext.Provider>
  )
}