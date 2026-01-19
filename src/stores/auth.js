import { defineStore } from 'pinia'
import axios from 'axios'
import { error } from '../utils/error'
import { useThrowMessage } from './throwMessage'

function getInitialToken() {
  return localStorage.getItem('jwt-token')
}

export const useAuthStore = defineStore('auth', {
 
  state: () => ({
    token: getInitialToken(),
  }),

  getters: {
    tokenValue: (state) => state.token,

    isAuthenticated: (state) => !!state.token,
  },

  actions: {
   
    setToken(token) {
      this.token = token

      localStorage.setItem('jwt-token', token)
    },

  
    logout() {
      this.token = null

      localStorage.removeItem('jwt-token')
    },

    async login(credentials) {
      const messageStore = useThrowMessage()

      try {
        const apiKey = import.meta.env.VITE_MY_FIREBASE_API_KEY
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`
        const { data } = await axios.post(url, { ...credentials, returnSecureToken: true })
        console.log(data.idToken, credentials)
        this.setToken(data.idToken)

        messageStore.clearMessage()
      } catch (e) {
        console.log(e.response.data.error.message)
        const errorMessage = error(e.response.data.error.message)
        messageStore.setMessage({
          value: errorMessage,
          type: 'danger',
        })
        console.log(error(e.response.data.error.message))
        throw new Error()
      }
    },
  },
})
