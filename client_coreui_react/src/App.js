// src/App.js
import React, { Suspense, useEffect } from 'react'
import { HashRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'
import './scss/examples.scss'

import { useAuth } from './context/AuthContext'
import useUIStore from './stores/store'
import i18next from 'i18next'

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/Login'))

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.theme)

  const { isAuthenticated, loading } = useAuth()

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme')?.match(/^[A-Za-z0-9\s]+/)?.[0]
    if (theme) {
      setColorMode(theme)
    } else if (!isColorModeSet()) {
      setColorMode(storedTheme)
    }
  }, [storedTheme, setColorMode, isColorModeSet])

  // GESTION DES LANGUES
  const { lang } = useUIStore()
  useEffect(() => {
    i18next.changeLanguage(lang) // <-- changer la langue après que i18next soit initialisé
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = lang
  }, [lang])

  return (
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
  )
}

// Composant de route protégée
const ProtectedRoute = ({ isAuthenticated, loading, redirectPath = '/login' }) => {
  if (loading) {
    return (
      <div className="pt-3 text-center">
        <CSpinner color="primary" variant="grow" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />
  }

  return <Outlet />
}

export default App

// // src/App.js

// import React, { Suspense, useEffect } from 'react'
// import { HashRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
// import { useSelector } from 'react-redux'

// import { CSpinner, useColorModes } from '@coreui/react'
// import './scss/style.scss'

// // We use those styles to show code examples, you should remove them in your application.
// import './scss/examples.scss'
// import { useAuth } from './context/AuthContext'
// import useUIStore from './stores/store'

// // Containers
// const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// // Pages
// const Login = React.lazy(() => import('./views/Login'))

// const App = () => {
//   const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
//   const storedTheme = useSelector((state) => state.theme)

//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.href.split('?')[1])
//     const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
//     if (theme) {
//       setColorMode(theme)
//     }

//     if (isColorModeSet()) {
//       return
//     }

//     setColorMode(storedTheme)
//   }, []) // eslint-disable-line react-hooks/exhaustive-deps

//   const { isAuthenticated, loading } = useAuth()

//   const { lang } = useUIStore()
//   // ✅ mettre à jour la direction du document selon la langue
//   useEffect(() => {
//     document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
//     document.documentElement.lang = lang
//   }, [lang])

//   useEffect(() => {
//     document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
//     document.documentElement.lang = lang
//   }, [])

//   return (
//     <HashRouter>
//       <Suspense
//         fallback={
//           <div className="pt-3 text-center">
//             <CSpinner color="primary" variant="grow" />
//           </div>
//         }
//       >
//         <Routes>
//           {/* Routes publiques */}
//           <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />

//           {/* Routes protégées */}
//           <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} loading={loading} />}>
//             <Route path="*" element={<DefaultLayout />} />
//           </Route>
//         </Routes>
//       </Suspense>
//     </HashRouter>
//   )
// }

// const ProtectedRoute = ({ isAuthenticated, loading, redirectPath = '/login' }) => {
//   if (loading) {
//     return (
//       <div className="pt-3 text-center">
//         <CSpinner color="primary" variant="grow" />
//       </div>
//     )
//   }

//   if (!isAuthenticated) {
//     return <Navigate to={redirectPath} replace />
//   }

//   return <Outlet />
// }

// export default App
