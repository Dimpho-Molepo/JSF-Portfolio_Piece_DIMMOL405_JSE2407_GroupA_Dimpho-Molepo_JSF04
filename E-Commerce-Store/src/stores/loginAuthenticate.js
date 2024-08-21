import { defineStore } from 'pinia'
import { jwtDecode } from 'jwt-decode'
import { ref, computed } from 'vue'

/**
 * Define the authentication store
 * @returns {Object} The authentication store
 */
export const useAuthenticationStore = defineStore('loginAuthentication', () => {
  /**
   * The authentication token
   * @type {String|null}
   */
  const token = ref(localStorage.getItem('token') || null)

  /**
   * The decoded token
   * @type {Object|null}
   */
  const decodedToken = ref(token.value ? jwtDecode(token.value) : null)

  /**
   * Whether the user is logged in
   * @type {Boolean}
   */
  const userLogin = ref(!!token.value)

  /**
   * The user object
   * @type {Object|null}
   */
  const user = ref(null)

  /**
   * Whether the store is loading
   * @type {Boolean}
   */
  const loading = ref(false)

  /**
   * The error message
   * @type {String|null}
   */
  const error = ref(null)

  /**
   * The URL to return to after login
   * @type {String}
   */
  const returnTo = ref('/')

  /**
   * Whether the user is authenticated
   * @returns {Boolean} Whether the user is authenticated
   */
  const isAuthenticated = computed(() => !!token.value)

  /**
   * Login to the application
   * @param {String} username The username
   * @param {String} password The password
   * @returns {Promise<Boolean>} Whether the login was successful
   */
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

  /**
   * Fetch the user information
   * @returns {Promise<void>}
   */
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

  /**
   * Logout from the application
   * @returns {void}
   */
  const logout = () => {
    user.value = null
    decodedToken.value = null
    localStorage.removeItem('token')
    returnTo.value = '/'
  }

  /**
   * Set the URL to return to after login
   * @param {String} path The URL to return to
   * @returns {void}
   */
  const setReturnTo = (path) => {
    returnTo.value = path
  }

  return {
    /**
     * Login to the application
     * @param {String} username The username
     * @param {String} password The password
     * @returns {Promise<Boolean>} Whether the login was successful
     */
    login,
    /**
     * Whether the user is logged in
     * @type {Boolean}
     */
    userLogin,
    /**
     * Logout from the application
     * @returns {void}
     */
    logout,
    /**
     * Whether the user is authenticated
     * @returns {Boolean} Whether the user is authenticated
     */
    isAuthenticated,
    /**
     * The decoded token
     * @type {Object|null}
     */
    decodedToken,
    /**
     * The error message
     * @type {String|null}
     */
    error,
    /**
     * Whether the store is loading
     * @type {Boolean}
     */
    loading,
    /**
     * Set the URL to return to after login
     * @param {String} path The
      /**
     * Set the URL to return to after login
     * @param {String} path The URL to return to
     * @returns {void}
     */
    setReturnTo,
    /**
     * The URL to return to after login
     * @type {String}
     */
    returnTo,
    /**
     * The user object
     * @type {Object|null}
     */
    user,
    /**
     * Fetch the user information
     * @returns {Promise<void>}
     */
    fetchUserInfo
  }
})
