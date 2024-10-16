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
    updateTask: build.mutation({
      query: ({ id, ...body }) => {
        return {
          url: `todos/${id}`,
          method: 'POST',
          body,
        }
      },
    }),
  }),
})

export const { useGetTasksQuery, useGetOneTaskQuery, useUpdateTaskMutation } = TasksApi
