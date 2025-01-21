import axios from 'axios'
import { useToast } from 'vue-toastification'

const api_url = 'http://localhost:8080'
const toast = useToast()

export const GetProducts = async () => {
  try {
    const response = await axios.get(`${api_url}/product`, { withCredentials: true })
    return response
  } catch (error) {
    toast.error(error.response ? error.response.data.message : error.message)
  }
}
export const AddProduct = async (name, price, category) => {
  try {
    const response = await axios.post(
      `${api_url}/product`,
      {
        name,
        price,
        category,
      },
      { withCredentials: true },
    )
    if (response.data) {
      toast.success('Product added successfully!')
    }
  } catch (error) {
    toast.error(
      'Adding product failed: ' + (error.response ? error.response.data.message : error.message),
    )
  }
}
export const getSingleProduct = async (id) => {
  try {
    const response = await axios.get(`${api_url}/product/${id}`, { withCredentials: true })
    return response
  } catch (error) {
    toast.error(
      'Fetching product failed: ' + (error.response ? error.response.data.message : error.message),
    )
  }
}

export const DeleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${api_url}/product/${id}`, { withCredentials: true })
    if (response.data) {
      toast.success('Product deleted successfully!')
    }
  } catch (error) {
    toast.error(
      'Deleting product failed: ' + (error.response ? error.response.data.message : error.message),
    )
  }
}
export const SearchProduct = async (query) => {
  try {
    // Call API to fetch products based on the query
    const response = await axios.get('/search', { params: { query } });
    console.log(response.data); // Handle the search results
    return response.data; // Return the data for use in the component
  } catch (error) {
    console.error('Error searching products:', error);
    throw error; // Optional: Throw the error so that the calling function can handle it
  }
}