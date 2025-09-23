import {
  CAvatar,
  CButton,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/8.jpg'

import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useLogoutMutation } from '../../hooks/useUsers'
import { useAuth, useAuthContext } from '../../context/AuthContext'

const AppHeaderDropdown = () => {
  const logoutMutation = useLogoutMutation()
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
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-body-secondary fw-semibold my-2">Settings</CDropdownHeader>
        <CDropdownItem href="#/profile">
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>

        <CDropdownDivider />
        <CDropdownItem as={'button'} onClick={onLogout}>
          <CIcon icon={cilLockLocked} className="me-2" />
          Se déconnecter
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
