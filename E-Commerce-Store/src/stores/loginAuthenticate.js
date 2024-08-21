import { defineStore } from 'pinia'
import { jwtDecode } from 'jwt-decode'
import { ref, computed } from 'vue'

export const useAuthenticationStore = defineStore('loginAuthentication', () => {
  const token = ref(localStorage.getItem('token') || null)
  const decodedToken = ref(token.value ? jwtDecode(token.value) : null)
  const userLogin = ref(!!token.value)
  const user = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const returnTo = ref('/')

  const isAuthenticated = computed(() => !!token.value)

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
        token.value = data.token
        decodedToken.value = jwtDecode(token.value)
        userLogin.value = true
        localStorage.setItem('token', token.value)
        await fetchUserInfo()
        loading.value = false
        return true
      } else {
        throw new Error('Login failed. No token received.')
      }
    } catch (err) {
      console.error('Login error:', err)
      error.value = 'Login failed. Please check your credentials.'
      loading.value = false
      return false
    }
  }

  const fetchUserInfo = async () => {
    if (!decodedToken.value) return

    const userId = decodedToken.value.sub
    try {
      const response = await fetch(`https://fakestoreapi.com/users/${userId}`)
      const data = await response.json()

      userInfo.value.name = `${data.name.firstname} ${data.name.lastname}`
      userInfo.value.address = `${data.address.street}, ${data.address.city}, ${data.address.zipcode}`
      userInfo.value.email = data.email
    } catch (error) {
      console.error('Error fetching user information:', error)
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
    returnTo,
    user,
    fetchUserInfo
  }
})
