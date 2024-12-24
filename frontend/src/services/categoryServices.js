import axios from 'axios'
import { useToast } from 'vue-toastification'

const api_url = 'http://localhost:8080'
const toast = useToast()

export const GetCategories = async () => {
  try {
    const response = await axios.get(`${api_url}/category`)
    return response
  } catch (error) {
    toast.error(error.response ? error.response.data.message : error.message)
  }
}

export const AddCategory = async (name, router) => {
  try {
    const response = await axios.post(`${api_url}/category`, {
      name,
    })
    if (response.data) {
      toast.success('Category added successfully!')
      router.push('/admin/categories')
    }
  } catch (error) {
    toast.error(
      'Adding category failed: ' + (error.response ? error.response.data.message : error.message),
    )
  }
}

export const getSingleCategory = async (id) => {
  try {
    const response = await axios.get(`${api_url}/category/${id}`)
    return response
  } catch (error) {
    toast.error(
      'Fetching category failed: ' + (error.response ? error.response.data.message : error.message),
    )
  }
} 
export const UpdateCategory = async (id, name, router) => {
  try {
    const response = await axios.put(`${api_url}/category/${id}`, {
      name,
    })
    if (response.data) {
      toast.success('Category updated successfully!')
      router.push('/admin/categories')
    }
  } catch (error) {
    toast.error(
      'Updating category failed: ' + (error.response ? error.response.data.message : error.message),
    )
  }
}

export const DeleteCategory = async (id, router) => {
  try {
    const response = await axios.delete(`${api_url}/category/${id}`)
    if (response.data) {
      toast.success('Category deleted successfully!')
      router.go()
    }
  } catch (error) {
    toast.error(
      'Deleting category failed: ' + (error.response ? error.response.data.message : error.message),
    )
  }
}
