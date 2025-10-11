// src/App.js
import React, { Suspense, useEffect } from 'react'
import { HashRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ToastContainer, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'
import './scss/examples.scss'

import { useAuth } from './context/AuthContext'
import useUIStore from './stores/store'
import i18next from 'i18next'

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))
const Login = React.lazy(() => import('./views/Login'))

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.theme)
  const { isAuthenticated, loading } = useAuth()
  const { lang } = useUIStore()

  // --- Appliquer le thème CoreUI ---
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme')?.match(/^[A-Za-z0-9\s]+/)?.[0]
    if (theme) {
      setColorMode(theme)
    } else if (!isColorModeSet()) {
      setColorMode(storedTheme)
    }
  }, [storedTheme, setColorMode, isColorModeSet])

  // --- Gérer la langue ---
  useEffect(() => {
    i18next.changeLanguage(lang)
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = lang
  }, [lang])

  return (
    <>
      {/* ⚡ Remount ToastContainer à chaque changement de theme */}
      <ToastContainer
        key={'light'} // ← force le re-render
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={lang === 'ar' ? true : false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={'light'}
        transition={Bounce}
      />

      <HashRouter>
        <Suspense
          fallback={
            <div className="pt-3 text-center">
              <CSpinner color="primary" variant="grow" />
            </div>
          }
        >
          <Routes>
            {/* Routes publiques */}
            <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />

            {/* Routes protégées */}
            <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} loading={loading} />}>
              <Route path="*" element={<DefaultLayout />} />
            </Route>
          </Routes>
        </Suspense>
      </HashRouter>
    </>
  )
}

const ProtectedRoute = ({ isAuthenticated, loading, redirectPath = '/login' }) => {
  if (loading) {
    return (
      <div className="pt-3 text-center">
        <CSpinner color="primary" variant="grow" />
      </div>
    )
  }
  if (!isAuthenticated) return <Navigate to={redirectPath} replace />
  return <Outlet />
}

export default App
