// hooks/useUsers.js
import { queryOptions, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser,
} from '../api/userApi'
import { useAuthContext } from '../context/AuthContext'

export function loginQuery() {
  const { dispatch } = useAuthContext()
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (user) => {
      //
    },
  })
}

export function logoutQuery() {
  const { dispatch } = useAuthContext()
  return useMutation({
    mutationFn: logoutUser,
    onSuccess: (user) => {
      dispatch({ type: 'LOGOUT', payload: user })
      // toast.success('Déconnecté avec succès.')
    },
  })
}

export function createUserQuery() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data) => createUser(data),
    onSuccess: (user) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['usersList'] })
    },
  })
}

export function deleteUserQuery() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data) => deleteUser(data),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['usersList'] })
    },
  })
}

export function fecthUsersQuery(token) {
  return queryOptions({
    queryKey: ['usersList'],
    queryFn: () => fetchUsers(token),
  })
}

export function updateUserQuery() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data) => updateUser(data),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['usersList'] })
    },
  })
}
