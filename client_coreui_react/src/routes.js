import React from 'react'
const UsersPage = React.lazy(() => import('./views/users/UsersPage'))

const routes = [{ path: '/users', name: 'Users', element: UsersPage }]

export default routes
