import axios from 'axios'
import { useToast } from 'vue-toastification'

const api_url = 'http://localhost:8080'
const toast = useToast()

export const createOrder = async (userId, items, totalAmount, paymentMethod) => {
  try {
    const response = await axios.post(`${api_url}/orders`, {
      userId,
      items,
      totalAmount,
      paymentMethod,
    }, { withCredentials: true })
    toast.success('Order created successfully!')
    return response.data
  } catch (error) {
    toast.error(error.response ? error.response.data.message : 'Failed to create order')
    throw error
  }
}

export const getOrdersByUser = async (userId) => {
  try {
    const response = await axios.get(`${api_url}/orders/${userId}`, { withCredentials: true })
    return response.data
  } catch (error) {
    toast.error(error.response ? error.response.data.message : 'Failed to fetch orders')
    throw error
  }
}
