import axios, { AxiosInstance } from 'axios'

const httpClient: AxiosInstance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL_API,
  headers: {
    'Content-type': 'application/json',
  },
})

export default httpClient
