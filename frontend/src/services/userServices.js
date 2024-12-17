import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { useToast } from 'vue-toastification'

const api_url = 'http://localhost:8080'
const toast = useToast()

export const login = async (email, password, router) => {
  try {
    const response = await axios.post(`${api_url}/user/login`, {
      email,
      password,
    })
    if (response.data) {
      const decodedToken = jwtDecode(response.data)
      console.log(decodedToken)
      localStorage.setItem(
        'user',
        JSON.stringify({
          id: decodedToken.id,
          userId: decodedToken.userId,
          name: decodedToken.name,
          email: decodedToken.email,
          role: decodedToken.role,
        }),
      )
      localStorage.setItem('isLoggedIn', 'true')
      setTimeout(function () {
        toast.success('Login successfully !')
      }, 2500)
      router.push('/')
    } else {
      toast.error('Login failed: Invalid response from server.')
    }
  } catch (error) {
    console.error('Login error:', error)
    toast.error(`Login failed: ${error.response ? error.response.data.message : error.message}`)
  }
}
export const register = async (name, email, password, router) => {
  try {
    const response = await axios.post(`${api_url}/user/register`, {
      name,
      email,
      password,
    })
    if (response.data) {
      toast.success('Register Successfully! Please confirm your email.')
      router.push('/')
    }
  } catch (error) {
    toast.error(
      'Registration failed: ' + (error.response ? error.response.data.message : error.message),
    )
  }
}
