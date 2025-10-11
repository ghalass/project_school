import { useState } from 'react'
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCardHeader,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CHeaderNav,
  CInputGroup,
  CInputGroupText,
  CRow,
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilSchool, cilUser } from '@coreui/icons'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../features/users/users.queries'

import { useAuthContext } from '../context/AuthContext'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import useUIStore from '../stores/store'
import ChangeLang from './components/ChangeLang'
import ChangeTheme from './components/ChangeTheme'

const Login = () => {
  const initialVal = { email: 'ghalass@gmail.com', password: 'gh@l@ss@dmin' }
  const loginMutation = useLoginMutation()
  const [formData, setFormData] = useState(initialVal)
  const navigate = useNavigate()
  const { dispatch } = useAuthContext()
  const { t } = useTranslation()

  const onSubmit = (e) => {
    e.preventDefault()
    loginMutation.mutate(
      { email: formData.email, password: formData.password },
      {
        onSuccess: (data) => {
          dispatch({ type: 'LOGIN', payload: data?.user })
          navigate('/')
          toast.success(t('pages.login.successMessage'))
        },
        onError: (err) => {
          console.log(err?.message)
          toast.error(err?.message)
        },
      },
    )
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <Helmet>
        <title>
          {t('logo')} | {t('pages.login.title')}
        </title>
        <meta name="description" content="Bienvenue sur le tableau de bord" />
      </Helmet>

      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CHeaderNav className="d-flex align-items-center justify-content-between gap-3 mx-5">
              <ChangeLang />
              <ChangeTheme />
            </CHeaderNav>
          </CCol>

          {/*  */}
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-2">
                <CCardHeader className="d-flex justify-content-center align-items-center">
                  <CIcon customClassName="sidebar-brand-full" icon={cilSchool} height={32} />
                  <h1 className="fw-bold ms-2 m-0 mb-1">{t('logo')}</h1>
                </CCardHeader>
                <CCardBody>
                  <CForm onSubmit={onSubmit}>
                    <h1>{t('pages.login.title')}</h1>
                    <p className="text-body-secondary">{t('pages.login.message1')}</p>

                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        type="email"
                        placeholder="Email"
                        value={formData?.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        disabled={loginMutation?.isPending}
                        dir="ltr"
                      />
                    </CInputGroup>

                    <CInputGroup className="mb-4 ">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        disabled={loginMutation?.isPending}
                        dir="ltr"
                      />
                    </CInputGroup>

                    <CRow>
                      <CCol>
                        <CButton
                          disabled={loginMutation.isPending}
                          color="primary"
                          className="px-4"
                          type="submit"
                        >
                          <div className="d-flex gap-1 align-items-center justify-content-end">
                            {loginMutation.isPending && <CSpinner size="sm" />}
                            <span>{t('pages.login.title')}</span>
                          </div>
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                  {loginMutation.isError && (
                    <CAlert color="danger" className="mb-0 mt-2">
                      {loginMutation.isError.message}
                    </CAlert>
                  )}
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
