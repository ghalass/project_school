import React from 'react'
const UsersPage = React.lazy(() => import('./views/users/UsersPage'))
const Dashboard = React.lazy(() => import('./views/Dashboard'))

const routes = [
  { path: '/users', name: 'Users', element: UsersPage },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
]

export default routes
