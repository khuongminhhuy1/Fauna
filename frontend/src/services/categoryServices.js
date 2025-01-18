import axios from 'axios'
import { useToast } from 'vue-toastification'

const api_url = 'http://localhost:8080'
const toast = useToast()

export const GetCategories = async () => {
  try {
    const response = await axios.get(`${api_url}/category`, { withCredentials: true })
    return response
  } catch (error) {
    toast.error(error.response ? error.response.data.message : error.message)
  }
}

export const AddCategory = async (name) => {
  try {
    const response = await axios.post(
      `${api_url}/category`,
      {
        name,
      },
      { withCredentials: true },
    )
    if (response.data) {
      toast.success('Category added successfully!')
    }
  } catch (error) {
    toast.error(
      'Adding category failed: ' + (error.response ? error.response.data.message : error.message),
    )
  }
}

export const getSingleCategory = async (id) => {
  try {
    const response = await axios.get(`${api_url}/category/${id}`, { withCredentials: true })
    return response
  } catch (error) {
    toast.error(
      'Fetching category failed: ' + (error.response ? error.response.data.message : error.message),
    )
  }
}
export const UpdateCategory = async (id, name) => {
  try {
    const response = await axios.put(
      `${api_url}/category/${id}`,
      {
        name,
      },
      { withCredentials: true },
    )
    if (response.data) {
      toast.success('Category updated successfully!')
    }
  } catch (error) {
    toast.error(
      'Updating category failed: ' + (error.response ? error.response.data.message : error.message),
    )
  }
}

export const DeleteCategory = async (id) => {
  try {
    const response = await axios.delete(`${api_url}/category/${id}`, { withCredentials: true })
    if (response.data) {
      toast.success('Category deleted successfully!')
    }
  } catch (error) {
    toast.error(
      'Deleting category failed: ' + (error.response ? error.response.data.message : error.message),
    )
  }
}
