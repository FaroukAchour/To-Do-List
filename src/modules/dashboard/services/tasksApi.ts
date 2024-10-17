import { api } from '@src/modules/shared/services/api'

interface ITask {
  id: string
  name?: string
  status?: string
  color?: string
}

export const TasksApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query({
      query: (params) => {
        return {
          url: `todos`,
          params,
        }
      },

      transformResponse: (response: { payload: ITask[] }): ITask[] => {
        return response.payload
      },

      providesTags: (result: any) => {
        return [
          result?.map(({ id }: { id: string }) => ({ type: 'TASKS', id })),
          { type: 'TASKS', id: 'TASK' },
        ]
      },
    }),
    getOneTask: build.query({
      query: (id) => {
        return {
          url: `todos/${id}`,
        }
      },
    }),
    createTask: build.mutation({
      query: (body) => {
        return {
          url: 'todos',
          method: 'POST',
          body,
        }
      },
    }),
    updateTask: build.mutation({
      query: ({ id, ...body }) => {
        return {
          url: `todos/${id}`,
          method: 'PATCH',
          body,
        }
      },
    }),
    deleteTask: build.mutation({
      query: ({ id }) => {
        return {
          url: `todos/${id}`,
          method: 'DELETE',
        }
      },
    }),
  }),
})

export const {
  useGetTasksQuery,
  useGetOneTaskQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = TasksApi
