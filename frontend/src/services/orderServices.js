import axios from 'axios'
import { useToast } from 'vue-toastification'

const api_url = 'http://localhost:8080'
const toast = useToast()
/**
 * Handles the checkout process by placing an order.
 *
 * @param {Object} orderData - The order details.
 * @param {string} orderData.userId - The ID of the user.
 * @param {string} orderData.addressId - The ID of the shipping address.
 * @param {string} orderData.paymentMethod - The selected payment method.
 *
 * @returns {Promise<Object>} - The response from the server.
 */
export async function Checkout(orderData) {
  try {
    const response = await axios.post(`${api_url}/orders/checkout`, orderData)
    return response.data // Return the response data for further processing in the UI
  } catch (error) {
    console.error('Checkout error:', error.response?.data || error.message)
    throw error.response?.data || { error: 'An error occurred during checkout.' }
  }
}

export const GetOrders = async () => {
  try {
    const response = await axios.get(`${api_url}/orders`, { withCredentials: true })
    return response.data
  } catch (error) {
    toast.error(error.response ? error.response.data.message : 'Failed to fetch orders')
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
