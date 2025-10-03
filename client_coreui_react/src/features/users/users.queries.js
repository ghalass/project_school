// src/features/users/users.queries.js
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import * as usersApi from './users.api'

const USERS_KEY = ['usersList']

// --- Queries ---
export const useUsersQuery = () =>
  useQuery({
    queryKey: USERS_KEY,
    queryFn: usersApi.getUsers,
  })

// --- Mutations ---
export const useCreateUserMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: usersApi.createUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: USERS_KEY }),
  })
}

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: usersApi.updateUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: USERS_KEY }),
  })
}

export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (user) => usersApi.deleteUser(user.id),
    onMutate: async (user) => {
      await queryClient.cancelQueries({ queryKey: USERS_KEY })
      const previousUsers = queryClient.getQueryData(USERS_KEY)
      queryClient.setQueryData(USERS_KEY, (old) => old?.filter((u) => u.id !== user.id))
      return { previousUsers }
    },
    onError: (_err, _user, ctx) => {
      queryClient.setQueryData(USERS_KEY, ctx.previousUsers)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: USERS_KEY })
    },
  })
}

// --- Auth ---
export const useLoginMutation = () =>
  useMutation({
    mutationFn: usersApi.login,
  })

export const useLogoutMutation = () =>
  useMutation({
    mutationFn: usersApi.logout,
  })
