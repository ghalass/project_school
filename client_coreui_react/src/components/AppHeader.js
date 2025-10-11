import { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  CBadge,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilChatBubble, cilMenu } from '@coreui/icons'

import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'
import { useAuth } from '../context/AuthContext'
import { getUserRole } from '../utils/func'
import { useTranslation } from 'react-i18next'
import ChangeLang from '../views/components/ChangeLang'
import ChangeTheme from '../views/components/ChangeTheme'

const AppHeader = () => {
  const headerRef = useRef()

  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  useEffect(() => {
    document.addEventListener('scroll', () => {
      headerRef.current &&
        headerRef.current.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0)
    })
  }, [])

  const { user } = useAuth()

  const { t } = useTranslation()

  return (
    <CHeader position="sticky" className="mb-4 p-0" ref={headerRef}>
      <CContainer className="border-bottom px-4" fluid>
        <CHeaderToggler
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
          style={{ marginInlineStart: '-14px' }}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>

        {/*  */}
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink to="/" as={NavLink}>
              {t('navBar.home')}
            </CNavLink>
          </CNavItem>
        </CHeaderNav>

        {/*  */}

        <CHeaderNav>
          <CNavItem>
            <CNavLink to="/chat" as={NavLink} className="text-success">
              <CIcon icon={cilChatBubble} size="lg" /> {t('navBar.chat')}
            </CNavLink>
          </CNavItem>

          {/* SEPARATOR */}
          <li className="nav-item py-1">
            <div className="vr h-100 mx-1 text-body text-opacity-75"></div>
          </li>

          {/* LANG */}
          <ChangeLang />

          {/* SEPARATOR */}
          <li className="nav-item py-1">
            <div className="vr h-100 mx-1 text-body text-opacity-75"></div>
          </li>

          {/* LIGHT/DARK MODE */}
          <ChangeTheme />

          {/*  */}
          <li className="nav-item py-1">
            <div className="vr h-100 mx-1 text-body text-opacity-75"></div>
          </li>

          {/* USER INFOS */}
          <div className="d-none d-md-flex">
            <div className="d-block align-content-center ">
              <div className="d-flex align-content-center gap-1">
                <CBadge textBgColor="light" shape="rounded-pill">
                  <span className="text-uppercase">
                    {user?.name} {user?.lastName}
                  </span>
                </CBadge>

                <CBadge color="info" shape="rounded-pill">
                  <span className="text-uppercase">{t(`userRole.${getUserRole(user)}`)}</span>
                </CBadge>
              </div>
            </div>
            <li className="nav-item py-1">
              <div className="vr h-100 mx-1 text-body text-opacity-75"></div>
            </li>
          </div>

          {/* USER OPTIONS */}
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>

      {/*  */}
      <CContainer className="px-4" fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
