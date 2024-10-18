import { useGetTasksQuery } from '../../services/tasksApi'

export interface IToDo {
  id: number
  name: string
  status: string
}

function ToDoList() {
  const { data, isLoading } = useGetTasksQuery({ page: 1, limit: 10 })

  if (isLoading) return <>Skeleton</>

  const { total, todos } = data

  console.log(todos)
  console.log(total)

  return <div>To Do List</div>
}

export default ToDoList
