// hooks/useUsers.js
import { queryOptions, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiRequest } from '../utils/apiRequest'
import { API_PATHS } from '../utils/apiPaths'

export function useLoginMutation() {
  return useMutation({
    mutationFn: (data) => apiRequest(API_PATHS.AUTH.LOGIN, 'POST', data),
    onError: (error) => {
      console.error('LOGIN failed:', error.message)
    },
  })
}

export function useLogoutMutation() {
  return useMutation({
    mutationFn: () => apiRequest(API_PATHS.AUTH.LOGOUT, 'POST'),
    onError: (error) => {
      console.error('LOGOUT failed:', error.message)
    },
  })
}

function useCreateUserMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data) => apiRequest(API_PATHS.AUTH.REGISTER, 'POST', data),
    onSuccess: () => invalidateUsersList(queryClient),
    onError: (error) => {
      console.error('REGISTER failed:', error.message)
    },
  })
}

function useDeleteUserMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (user) => apiRequest(API_PATHS.AUTH.DELETE_USER(user?.id), 'DELETE'),
    onMutate: async (user) => {
      await queryClient.cancelQueries({ queryKey: ['usersList'] })
      const previousUsers = queryClient.getQueryData(['usersList'])

      queryClient.setQueryData(['usersList'], (old) => old?.filter((u) => u.id !== user.id))

      return { previousUsers }
    },
    onError: (_err, _user, context) => {
      queryClient.setQueryData(['usersList'], context.previousUsers)
      console.error('DELETE_USER failed:', error.message)
    },
    onSettled: () => {
      invalidateUsersList(queryClient)
    },
  })
}

function useUpdateUserMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data) => apiRequest(API_PATHS.AUTH.UPDATE_USER, 'PATCH', data),
    onSuccess: () => invalidateUsersList(queryClient),
    onError: (error) => {
      console.error('UPDATE_USER failed:', error.message)
    },
  })
}

function useFecthUsersQuery() {
  return queryOptions({
    queryKey: ['usersList'],
    queryFn: () => apiRequest(API_PATHS.AUTH.GET_ALL_USERS, 'GET'),
    onError: (error) => {
      console.error('GET_ALL_USERS failed:', error.message)
    },
  })
}

const invalidateUsersList = (queryClient) => {
  queryClient.invalidateQueries({ queryKey: ['usersList'] })
}

export const useUserMutations = () => {
  const fetch = useFecthUsersQuery()
  const create = useCreateUserMutation()
  const update = useUpdateUserMutation()
  const del = useDeleteUserMutation()

  return {
    create,
    update,
    delete: del,
    fetch,
  }
}
