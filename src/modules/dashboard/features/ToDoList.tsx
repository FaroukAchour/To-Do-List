import { useAppDispatch } from '@src/modules/shared/store'
import { useGetOneTaskQuery, useGetTasksQuery, useUpdateTaskMutation } from '../services/tasksApi'
import { openModal } from '@src/modules/shared/store/slices/modals/modalsSlice'
import Button from '@src/modules/shared/components/Button/Button'

const ToDoList = () => {
  const dispatch = useAppDispatch()

  const { data: tasks } = useGetTasksQuery({ page: 1, limit: 10 })
  const { data: task } = useGetOneTaskQuery('hazem')
  const [updateTask] = useUpdateTaskMutation()

  console.log({ tasks, task, updateTask })

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
      <div className="tasks-list">Tasks List with: - Infinite scroll ...</div>
    </div>
  )
}

export default ToDoList
