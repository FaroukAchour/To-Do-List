import Modal from '@src/modules/shared/components/Modal'
export interface ModalProps {
  open: boolean
  handleClose: (id: string) => void
  data?: any
  id: string
}

const CreateTaskModal: React.FC<ModalProps> = ({ open, handleClose, id }) => {
  return (
    <Modal open={open} handleClose={handleClose} id={id}>
      <div className="div">Create Task Form</div>
    </Modal>
  )
}

export default CreateTaskModal
