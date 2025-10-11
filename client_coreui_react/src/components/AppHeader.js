import { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  useColorModes,
  CBadge,
  CButton,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cifFr, cifSa, cilChatBubble, cilContrast, cilMenu, cilMoon, cilSun } from '@coreui/icons'

import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'
import { useAuth } from '../context/AuthContext'
import { getUserRole } from '../utils/func'
import useUIStore from '../stores/store'

const AppHeader = () => {
  const headerRef = useRef()
  const { colorMode, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')

  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  useEffect(() => {
    document.addEventListener('scroll', () => {
      headerRef.current &&
        headerRef.current.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0)
    })
  }, [])

  const { user } = useAuth()

  const { lang, changeLang } = useUIStore()

  const handleLanguageClick = () => {
    lang === 'fr' ? changeLang('ar') : changeLang('fr')
  }

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
              Home
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink to="/users" as={NavLink}>
              Users
            </CNavLink>
          </CNavItem>
        </CHeaderNav>

        {/*  */}

        <CHeaderNav>
          <CNavItem>
            <CNavLink to="/chat" as={NavLink} className="text-success">
              <CIcon icon={cilChatBubble} size="lg" /> Chat
            </CNavLink>
          </CNavItem>

          {/* SEPARATOR */}
          <li className="nav-item py-1">
            <div className="vr h-100 mx-1 text-body text-opacity-75"></div>
          </li>

          {/* LANG */}
          <CButton className="d-flex btn gap-1" onClick={handleLanguageClick}>
            <CIcon icon={lang === 'fr' ? cifSa : cifFr} size="lg" className="mt-1" />
            {lang === 'fr' ? 'Arabe' : 'فرنسي'}
          </CButton>

          {/* SEPARATOR */}
          <li className="nav-item py-1">
            <div className="vr h-100 mx-1 text-body text-opacity-75"></div>
          </li>

          {/* LIGHT/DARK MODE */}
          <CDropdown variant="nav-item" placement="bottom-end">
            <CDropdownToggle caret={false}>
              {colorMode === 'dark' ? (
                <CIcon icon={cilMoon} size="lg" />
              ) : colorMode === 'auto' ? (
                <CIcon icon={cilContrast} size="lg" />
              ) : (
                <CIcon icon={cilSun} size="lg" />
              )}
            </CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem
                active={colorMode === 'light'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('light')}
              >
                <CIcon className="me-2" icon={cilSun} size="lg" /> Light
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === 'dark'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('dark')}
              >
                <CIcon className="me-2" icon={cilMoon} size="lg" /> Dark
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === 'auto'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('auto')}
              >
                <CIcon className="me-2" icon={cilContrast} size="lg" /> Auto
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
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
                  <span className="text-uppercase">{getUserRole(user)}</span>
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
