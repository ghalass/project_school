import { NavLink } from 'react-router-dom'
import { CButton, CNavLink } from '@coreui/react'

const Home = () => {
  return (
    <>
      <div className="mt-5">
        <h1 className="text-center">Wecome home page</h1>
        <div className="d-flex justify-content-center">
          <CNavLink to="/login" as={NavLink}>
            <CButton variant="outline">Login</CButton>
          </CNavLink>
        </div>
      </div>
    </>
  )
}

export default Home
