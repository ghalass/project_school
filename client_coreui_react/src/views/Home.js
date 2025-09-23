import { NavLink } from 'react-router-dom'
import { CButton, CNavLink } from '@coreui/react'
import { useAuth } from '../context/AuthContext'

const Home = () => {
  const { isAuthenticated, user } = useAuth()
  return (
    <>
      <div className="mt-5">
        <h1 className="text-center">Welcome {`${user?.name} ${user?.lastName}`}</h1>

        {!isAuthenticated ? (
          <div>
            <h1 className="text-center">Welcome home page</h1>
            <div className="d-flex justify-content-center">
              <CNavLink to="/login" as={NavLink}>
                <CButton variant="outline">Login</CButton>
              </CNavLink>
            </div>
          </div>
        ) : (
          <div className="d-flex justify-content-center">
            <CNavLink to="/dashboard" as={NavLink}>
              Dashboard
            </CNavLink>
          </div>
        )}
      </div>
    </>
  )
}

export default Home
