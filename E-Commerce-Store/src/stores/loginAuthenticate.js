import { defineStore } from 'pinia'
import { jwtDecode } from 'jwt-decode'
import { ref } from 'vue'

export const useAuthenticationStore = defineStore('product', () => {
  const decodedToken = ref(null)
  const userLogin = ref(false);
  const user = ref(null)

  const login = async (username, password) => {
    try {
      const response = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      })
      const data = await response.json();
    //   console.log(token)
      if (data.token) {
        const token = data.token
        // console.log(token)
        decodedToken.value = jwtDecode(token)
        // console.log('Decoded token:', decodedToken.value)
        userLogin.value = true 
        user.value = decodedToken.value.user
        console.log(user.value)
        // localStorage.setItem()
        alert('Login successful!')
      } 
    //   else {
    //     alert('Login failed. No token received.')
    //   }
    } catch (error) {
      console.error('Login error:', error)
      alert('Login failed. Please check your credentials.')
    }
  }

  return{
    login,
    userLogin
  }
})
