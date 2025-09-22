import React from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilSettings,
  cilUser,
  cilAccountLogout,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

// import avatar8 from './../../assets/images/avatars/8.jpg'
import avatar8 from './../../assets/images/avatars/icons8-user-80.png'
import { useNavigate } from 'react-router-dom'

// import Cookies from "universal-cookie";
import { useAuth } from '../../context/Auth'
import { apiRequest } from '../../utils/apiRequest'
import { API_PATHS } from '../../utils/apiPaths'


const AppHeaderDropdown = () => {

  const auth = useAuth();
  // const cookie = new Cookies();
  const navigate = useNavigate();

  const handlelogout = () => {
    /** LOGOUT FROM FRONT END - CONTEXT */
    // cookie.remove("Bearer");
    // REMOVE TOKEN FROM CONTEXT
    auth.logout();

    /** LOGOUT FROM SERVER */
    const logoutApi = async () => {
      await apiRequest(API_PATHS.AUTH.LOGOUT, "POST");
    };

    logoutApi();

    // REDIRECT TO LOGIN PAGE
    navigate("/login");
  };


  return (
    <CDropdown variant="nav-item" alignment="end">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <div className='d-none d-sm-inline-block me-1'>Bienvenue</div>
        <div className="d-none d-sm-inline-block text-uppercase fw-bold me-1">{auth.user && auth.user?.name}</div>
        <div className='d-none d-sm-inline-block me-1'><CBadge className='col-sm' textBgColor="light" shape="rounded-pill">
          {auth.user && auth.user?.role.replace("_", " ")}
        </CBadge>
        </div>
        <CAvatar className='border border-secondary col-sm' src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">

        <CDropdownItem as="button" onClick={() => navigate("/user/profile")}>
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>
        {/* <CDropdownItem as="button">
          <CIcon icon={cilSettings} className="me-2" />
          Settings
        </CDropdownItem> */}

        <CDropdownDivider />

        <CDropdownItem as="button" onClick={handlelogout}>
          <CIcon icon={cilAccountLogout} className="me-2" />
          Se déconnecter
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
