import { createContext, useContext, useEffect, useReducer } from 'react'

// Context
export const AuthContext = createContext()

// Reducer
export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload, isAuthenticated: true }
    case 'LOGOUT':
      return { user: null, isAuthenticated: false }
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
}

// Provider Component
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  // Fonction pour vérifier l'auth au chargement
  const checkAuthStatus = async () => {
    try {
      // Simple requête vers un endpoint protégé pour vérifier l'auth
      const response = await fetch('/user/users', {
        method: 'GET',
        credentials: 'include', // Important : envoie les cookies automatiquement
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        // Si la requête réussit, récupérer les infos utilisateur
        const userData = await getCurrentUser()
        if (userData) {
          dispatch({ type: 'LOGIN', payload: userData })
        }
      } else {
        // Si non authentifié, s'assurer que l'état est correct
        dispatch({ type: 'LOGOUT' })
      }
    } catch (error) {
      console.error('Erreur vérification auth:', error)
      dispatch({ type: 'LOGOUT' })
    }
  }

  // Fonction pour récupérer l'utilisateur actuel
  const getCurrentUser = async () => {
    try {
      // Vous devez créer cet endpoint sur votre serveur
      const response = await fetch('http://localhost:4000/auth/me', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (response.ok) {
        const data = await response.json()
        return data.user || data // selon votre structure de réponse
      }

      return null
    } catch (error) {
      console.error('Erreur récupération utilisateur:', error)
      return null
    }
  }

  // Vérifier l'auth au chargement du composant
  useEffect(() => {
    checkAuthStatus()
  }, [])

  // Fonction pour mettre à jour l'utilisateur
  const updateUser = (userData) => {
    dispatch({ type: 'UPDATE_USER', payload: userData })
  }

  // Fonction helper pour faire des requêtes authentifiées
  const authenticatedFetch = async (url, options = {}) => {
    const response = await fetch(url, {
      ...options,
      credentials: 'include', // Toujours inclure les cookies
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    // Si 401, déconnecter automatiquement
    if (response.status === 401) {
      dispatch({ type: 'LOGOUT' })
      throw new Error('Session expirée')
    }

    return response
  }

  const contextValue = {
    // État
    user: state.user,
    isAuthenticated: state.isAuthenticated,

    // Actions
    updateUser,
    authenticatedFetch,

    // Utilitaires
    checkAuthStatus,
    dispatch,
  }

  // console.log('AuthContext state:', state)

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

// Hook personnalisé pour utiliser le contexte
export const useAuthContext = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuthContext must be used inside an AuthContextProvider')
  }

  return context
}

// Hook pour les requêtes authentifiées (optionnel)
export const useAuth = () => {
  const { user, isAuthenticated, authenticatedFetch } = useAuthContext()

  return {
    user,
    isAuthenticated,
    authenticatedFetch,
  }
}
