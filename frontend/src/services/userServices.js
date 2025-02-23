import router from '@/router'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { useToast } from 'vue-toastification'

const api_url = 'http://localhost:8080'
const toast = useToast()

export const login = async (email, password, router) => {
  try {
    const response = await axios.post(
      `${api_url}/login`,
      {
        email,
        password,
      },
      { withCredentials: true },
    )
    if (response.data.token) {
      const decodedToken = jwtDecode(response.data.token)
      console.log(decodedToken)
      localStorage.setItem(
        'user',
        JSON.stringify({
          id: decodedToken.id,
          userId: decodedToken.userId,
        }),
      )
      localStorage.setItem('isLoggedIn', 'true')
      toast.success('Login successfully !')
      router.push('/')
    } else {
      toast.error('Login failed: Invalid response from server.')
      return
    }
  } catch (error) {
    console.error('Login error:', error)
    toast.error(`Login failed: ${error.response ? error.response.data.message : error.message}`)
  }
}
export const register = async (name, email, password, router) => {
  try {
    const response = await axios.post(`${api_url}/register`, {
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
export const GetUsers = async () => {
  try {
    const response = await axios.get(`${api_url}/users`)
    return response
  } catch (error) {
    toast.error(error.response ? error.response.data.message : error.message)
  }
}
export const GetUserById = async (id) => {
  try {
    const response = await axios.get(`${api_url}/user/${id}`)
    return response
  } catch (error) {
    toast.error(error.response ? error.response.data.message : error.message)
  }
}

export const UpdateUser = async (id) => {
  try {
    const response = await axios.put(`${api_url}/user/${id}`, { withCredentials: true })
    return response
  } catch (error) {
    toast.error(error.response ? error.response.data.message : error.message)
  }
}
export const DeleteUser = async (id) => {
  try {
    const response = await axios.delete(`${api_url}/user/${id}`, { withCredentials: true })
    toast.success('User Deleted !')
    router.push('/admin/users')
    return response
  } catch (error) {
    toast.error(error.response ? error.response.data.message : error.message)
  }
}

// USER INFORMATION
export const saveUserInformation = async (
  userId,
  address,
  city,
  state,
  zipCode,
  phone,
  country,
) => {
  try {
    const response = await axios.post(`${api_url}/user/${userId}/user-information`, {
      userId,
      address,
      city,
      state,
      zipCode,
      phone,
      country,
    })
    toast.success('Information saved successfully!')
    return response
  } catch (error) {
    toast.error(error.response ? error.response.data.message : error.message)
  }
}

export const getUserInformation = async (userId) => {
  try {
    const response = await axios.get(`${api_url}/user/${userId}/user-information`)
    return response
  } catch (error) {
    toast.error(error.response ? error.response.data.message : error.message)
  }
}
export const deleteUserInformation = async (userId) => {
  try {
    const response = await axios.delete(`${api_url}/user/${userId}/user-information`)
    toast.success('Information deleted successfully!')
    return response
  } catch (error) {
    toast.error(error.response ? error.response.data.message : error.message)
  }
}
