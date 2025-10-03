import React from 'react'
const UsersPage = React.lazy(() => import('./views/users/UsersPage'))
const Dashboard = React.lazy(() => import('./views/Dashboard'))
const Home = React.lazy(() => import('./views/Home'))
const ProfilePage = React.lazy(() => import('./views/Profile'))
const ChatPage = React.lazy(() => import('./views/chat/Chat'))

const routes = [
  { path: '/', name: 'Home', element: Home },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/users', name: 'Users', element: UsersPage },
  { path: '/profile', name: 'Profile', element: ProfilePage },
  { path: '/chat', name: 'Chat', element: ChatPage },
]

export default routes
