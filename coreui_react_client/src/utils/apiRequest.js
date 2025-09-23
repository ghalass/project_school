// src/utils/apiRequest.js
import axios from 'axios'

const TIME_OUT = 0 // FOR TEST LOADING TIME

export const apiRequest = async (endpoint, method = 'GET', body = null) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      // ⛔ pas besoin d'Authorization si tu utilises les cookies
    }

    const baseUrl = import.meta.env.VITE_BASE_URL
    const url = `${baseUrl}${endpoint}`

    const config = {
      method: method.toLowerCase(),
      url,
      headers,
      withCredentials: true, // ⚡ cookies envoyés automatiquement
      data: body ? JSON.stringify(body) : undefined,
    }

    const response = await axios(config)

    if (TIME_OUT > 0) {
      await new Promise((resolve) => setTimeout(resolve, TIME_OUT))
    }

    return response.data
  } catch (error) {
    const response = error.response
    throw {
      message:
        response?.data?.error || error.message || 'Une erreur est survenue lors de la requête.',
      status: response?.status,
    }
  }
}
