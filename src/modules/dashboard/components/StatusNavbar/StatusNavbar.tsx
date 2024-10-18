import { Tabs } from 'antd'
import { useGetTasksQuery } from '../../services/tasksApi'

function StatusNavbar() {
  const { data, isLoading } = useGetTasksQuery({ page: 1, limit: 10 })

  console.log(data)

  if (isLoading) return <>Skeleton</>

  const { total, statusCount } = data

  const items = [
    {
      key: '1',
      label: `Total ${total}`,
    },
    {
      key: '2',
      label: `To Do ${statusCount.open}`,
    },
    {
      key: '3',
      label: `In progress ${statusCount['in progress']}`,
    },
    {
      key: '4',
      label: `Cancelled ${statusCount.cancelled}`,
    },
    {
      key: '5',
      label: `Archived ${statusCount.archived}`,
    },
    {
      key: '6',
      label: `Completed ${statusCount.completed}`,
    },
  ]

  return <Tabs defaultActiveKey="1" items={items} />
}

export default StatusNavbar
