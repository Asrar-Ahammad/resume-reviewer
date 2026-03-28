import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

const api = axios.create({
  baseURL: API_URL,
  withCredentials: false, // ✅ switched to false — using Bearer token not cookies
})

// ✅ Attaches token to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export async function register({ username, email, password }) {
  try {
    const response = await api.post("/api/auth/register", {
      username,
      email,
      password,
    })
    if (response.data?.token) {
      localStorage.setItem('token', response.data.token) // ✅ save token
    }
    return response.data
  } catch (err) {
    console.log('register error:', err)
    return null
  }
}

export async function login({ email, password }) {
  try {
    const response = await api.post("/api/auth/login", {
      email,
      password,
    })
    if (response.data?.token) {
      localStorage.setItem('token', response.data.token) // ✅ save token
    }
    return response.data
  } catch (err) {
    console.log('login error:', err)
    return null
  }
}

export async function logout() {
  try {
    const response = await api.get("/api/auth/logout")
    localStorage.removeItem('token') // ✅ clear token on logout
    return response.data
  } catch (err) {
    console.log('logout error:', err)
    localStorage.removeItem('token') // ✅ clear token even if request fails
    return null
  }
}

export async function getMe() {
  try {
    const response = await api.get("/api/auth/get-me")
    return response.data
  } catch (err) {
    console.log('getMe error:', err)
    return null // ✅ return null instead of throwing — prevents crashes in useAuth
  }
}