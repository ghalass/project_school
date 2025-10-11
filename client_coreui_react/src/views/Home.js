import { useAuth } from '../context/AuthContext'
import { useTranslation } from 'react-i18next'

const Home = () => {
  const { user } = useAuth()
  const { t, i18n } = useTranslation()

  return (
    <>
      <div className="mt-2">
        <h1 className="text-center">
          {t('welcome')} {`${user?.name} ${user?.lastName ?? ''}`}
        </h1>
      </div>
    </>
  )
}

export default Home
