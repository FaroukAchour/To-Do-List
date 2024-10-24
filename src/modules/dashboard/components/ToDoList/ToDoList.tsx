import React, { useState, useCallback, useRef, useEffect } from 'react'
import { useGetTasksQuery } from '../../services/tasksApi'
import { FixedSizeList as List } from 'react-window'

export interface IToDo {
  id: number
  name: string
  status: string
}

function ToDoList() {
  const [page, setPage] = useState(1)
  const { data, isLoading, isFetching } = useGetTasksQuery({ page, limit: 10 })
  const listRef = useRef<any>(null)
  const [allTodos, setAllTodos] = useState<IToDo[]>([])
  const [totalItems, setTotalItems] = useState(0)

  useEffect(() => {
    if (data) {
      setAllTodos((prevTodos) => [...prevTodos, ...data.todos])
      setTotalItems(data.total)
    }
  }, [data])

  const loadMoreItems = useCallback(() => {
    if (!isFetching && allTodos.length < totalItems) {
      setPage((prevPage) => prevPage + 1)
    }
  }, [isFetching, allTodos.length, totalItems])

  const handleScroll = useCallback(
    ({ scrollOffset }: any) => {
      if (listRef.current) {
        const { clientHeight, scrollHeight } = listRef.current._outerRef
        if (scrollOffset + clientHeight >= scrollHeight - 100) {
          loadMoreItems()
        }
      }
    },
    [loadMoreItems]
  )

  const Row = useCallback(
    ({ index, style }: { index: number; style: React.CSSProperties }) => {
      const todo = allTodos[index]
      if (!todo) {
        return <div style={style}>Loading...</div>
      }
      return (
        <div style={{ ...style, display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
          <div>{todo.name}</div>
          <div>{todo.status}</div>
        </div>
      )
    },
    [allTodos]
  )

  if (isLoading && page === 1) return <>Skeleton</>

  return (
    <List
      height={400}
      itemCount={totalItems}
      itemSize={45}
      width={900}
      onScroll={handleScroll}
      ref={listRef}
    >
      {Row}
    </List>
  )
}

export default ToDoList
