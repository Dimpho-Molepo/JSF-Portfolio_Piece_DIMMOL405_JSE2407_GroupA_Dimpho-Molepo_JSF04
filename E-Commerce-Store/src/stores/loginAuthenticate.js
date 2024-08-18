import { defineStore } from 'pinia'
import { jwtDecode } from 'jwt-decode'
import { ref, computed } from 'vue'

export const useAuthenticationStore = defineStore('loginAuthentication', () => {
  const decodedToken = ref(localStorage.getItem('token') || null)
  const userLogin = ref(false)
  const user = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const returnTo = ref('/')

  const isAuthenticated = computed(() => !!decodedToken.value)

  const login = async (username, password) => {
    loading.value = true
    error.value = null
    try {
      const response = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      })

      const data = await response.json()

      if (data.token) {
        const token = data.token
        decodedToken.value = jwtDecode(token)
        userLogin.value = true
        user.value = decodedToken.value.user
        localStorage.setItem('token', token)
        loading.value = false
        return true
      } else {
        throw new Error('Login failed. No token received.')
      }
    } catch (error) {
      console.error('Login error:', error)
      error.value = 'Login failed. Please check your credentials.'
      loading.value = false
      return false
    }
  }

  const logout = () => {
    user.value = null
    decodedToken.value = null
    localStorage.removeItem('token')
    returnTo.value = '/'
  }

  const setReturnTo = (path) => {
    returnTo.value = path
  }

  return {
    login,
    userLogin,
    logout,
    isAuthenticated,
    decodedToken,
    error,
    loading,
    setReturnTo,
    returnTo
  }
})
