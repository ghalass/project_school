import { createContext, useContext, useEffect, useReducer } from 'react'

// Context
export const AuthContext = createContext()

// Reducer
export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload, isAuthenticated: true, loading: false }
    case 'LOGOUT':
      return { ...state, user: null, isAuthenticated: false, loading: false }
    case 'LOADING':
      return { ...state, loading: true }
    case 'FINISH_LOADING':
      return { ...state, loading: false }
    case 'UPDATE_USER':
      return { ...state, user: { ...state.user, ...action.payload } }
    default:
      return state
  }
}

// État initial
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true, // 🔑 on commence en "chargement"
}

// Provider Component
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  // Fonction pour vérifier l'auth au chargement
  const checkAuthStatus = async () => {
    dispatch({ type: 'LOADING' })
    try {
      const response = await fetch('/user/users', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const userData = await getCurrentUser()
        if (userData) {
          dispatch({ type: 'LOGIN', payload: userData })
        } else {
          dispatch({ type: 'LOGOUT' })
        }
      } else {
        dispatch({ type: 'LOGOUT' })
      }
    } catch (error) {
      console.error('Erreur vérification auth:', error)
      dispatch({ type: 'LOGOUT' })
    } finally {
      dispatch({ type: 'FINISH_LOADING' })
    }
  }

  const getCurrentUser = async () => {
    try {
      const response = await fetch('/api/auth/me', {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      })

      if (response.ok) {
        const data = await response.json()

        console.log(data)
        return data.user || data
      }
      return null
    } catch (error) {
      console.log(error)

      // console.log('Erreur récupération utilisateur:', error)
      return null
    }
  }

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const updateUser = (userData) => {
    dispatch({ type: 'UPDATE_USER', payload: userData })
  }

  const authenticatedFetch = async (url, options = {}) => {
    const response = await fetch(url, {
      ...options,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })
    if (response.status === 401) {
      dispatch({ type: 'LOGOUT' })
      throw new Error('Session expirée')
    }
    return response
  }

  const contextValue = {
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    loading: state.loading, // 🔑 exposer loading
    updateUser,
    authenticatedFetch,
    checkAuthStatus,
    dispatch,
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

// Hook personnalisé
export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used inside an AuthContextProvider')
  }
  return context
}

export const useAuth = () => {
  const { user, isAuthenticated, authenticatedFetch, loading } = useAuthContext()
  return { user, isAuthenticated, authenticatedFetch, loading }
}
