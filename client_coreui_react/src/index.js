import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import 'core-js'

import App from './App'
import store from './store'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthContextProvider } from './context/AuthContext'
import { Bounce, ToastContainer } from 'react-toastify'
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <QueryClientProvider client={queryClient}>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <Provider store={store}>
        <App />
      </Provider>
    </QueryClientProvider>
  </AuthContextProvider>,
)
