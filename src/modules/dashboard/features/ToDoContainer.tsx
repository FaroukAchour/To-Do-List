import { useAppDispatch } from '@src/modules/shared/store'
import { openModal } from '@src/modules/shared/store/slices/modals/modalsSlice'
import Button from '@src/modules/shared/components/Button/Button'
import StatusNavbar from '../components/StatusNavbar/StatusNavbar'
import ToDoList from '../components/ToDoList/ToDoList'

const ToDoContainer = () => {
  const dispatch = useAppDispatch()

  return (
    <div className="to-do-list-container">
      <Button
        onClick={() => {
          dispatch(openModal({ id: 'create-task-modal' }))
        }}
        className="create-task-btn"
      >
        Create Task
      </Button>
      <StatusNavbar />
      <ToDoList />
    </div>
  )
}

export default ToDoContainer
