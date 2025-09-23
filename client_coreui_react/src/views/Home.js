import { useAuth } from '../context/AuthContext'

const Home = () => {
  const { user } = useAuth()
  return (
    <>
      <div className="mt-2">
        <h1 className="text-center">Welcome {`${user?.name} ${user?.lastName}`}</h1>
      </div>
    </>
  )
}

export default Home
