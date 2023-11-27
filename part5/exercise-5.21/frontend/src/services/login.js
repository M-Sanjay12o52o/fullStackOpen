import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/login'
import cors from 'cors'

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }
