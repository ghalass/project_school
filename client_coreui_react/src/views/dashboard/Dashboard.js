import { useNavigate } from 'react-router-dom'
import { useAuth, useAuthContext } from '../../context/AuthContext'
import { logoutQuery } from '../../hooks/useUsers'
import { toast } from 'react-toastify'
import { CButton } from '@coreui/react'

const Dashboard = () => {
  const { user } = useAuth()
  const logoutMutation = logoutQuery()
  const navigate = useNavigate()
  const { dispatch } = useAuthContext()
  const onLogout = (e) => {
    e.preventDefault()
    logoutMutation.mutate(
      {},
      {
        onSuccess: (data) => {
          dispatch({ type: 'LOGOUT', payload: data?.user })
          navigate('/login')
          toast.success('Déconnecté avec succès.')
        },
        onError: (err) => {
          console.log(err?.message)
          toast.error(err?.message)
        },
      },
    )
  }

  return (
    <>
      <h1>Bonjour {user.name}</h1>
      <CButton variant="outline" onClick={onLogout}>
        Déconnexion
      </CButton>
    </>
  )
}

export default Dashboard
