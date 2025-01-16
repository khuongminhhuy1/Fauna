import axios from 'axios'
import { useToast } from 'vue-toastification'

const api_url = 'http://localhost:8080'
const toast = useToast()

export const fetchCart = (userId) => {
  try {
    const response = axios.get(`${api_url}/cart/${userId}`)
    return response
  } catch (error) {
    toast.error(error.response ? error.response.data.message : error.message)
  }
}

// Add an item to the cart
export const addItemToCart = (item) => {
  try {
    const response = axios.post(`${api_url}/cart/add`, item)
    return response
  } catch (error) {
    toast.error(error.response ? error.response.data.message : error.message)
  }
}

// Update item quantity
export const updateCartItemQuantity = (id, quantity) => {
  try {
    const response = axios.put(`${api_url}/cart/${id}`, { quantity })
    return response
  } catch (error) {
    toast.error(error.response ? error.response.data.message : error.message)
  }
}

// Remove item from cart
export const removeItemFromCart = (id) => {
  try {
    const response = axios.delete(`${api_url}/cart/${id}`)
    return response
  } catch (error) {
    toast.error(error.response ? error.response.data.message : error.message)
  }
}
