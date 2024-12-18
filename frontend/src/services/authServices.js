import axios from 'axios'

const API_URL = 'http://localhost:8080'

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password })
  if (response.data.token) {
    localStorage.setItem('token', response.data.token)
    localStorage.setItem('role', response.data.role)
  }
  return response.data
}

export const getProfile = async () => {
  const token = localStorage.getItem('token')
  const response = await axios.get(`${API_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data
}
