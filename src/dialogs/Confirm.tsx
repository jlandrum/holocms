
import Button from '../components/units/Button';
import Dialog, { DialogProps, useClose } from '../components/units/Dialog';
import Text from '../components/units/Text';

interface AddDocumentProps {
  children: string;
  onConfirm: () => boolean;
  confirm?: string;
  cancel?: string;
}

const AddDocument = ({children, onConfirm, confirm = "OK", cancel = "Cancel"}: AddDocumentProps) => {
  const close = useClose();

  const doAction = () => {
    if (onConfirm()) {
      close();
    };
  }

  return (
    <div className='flex flex-col w-96 gap-2'>
      <Text className='text-sm text-bold'>{children}</Text>
      <div className='flex flex-row-reverse gap-2 mt-2'>
        <Button type='primary' onClick={doAction}>{confirm}</Button>
        <Button onClick={close}>{cancel}</Button>
      </div>
    </div>
  )
}

interface ConfirmDialogProps extends AddDocumentProps, Omit<DialogProps, 'children'> {}

export const ConfirmDialog = ({show, onClosed, children, onConfirm}: ConfirmDialogProps) => (
  <Dialog onClosed={onClosed} show={show}>
    {() => <AddDocument onConfirm={onConfirm}>{children}</AddDocument>}
  </Dialog>
)

export default AddDocument;