// interview.api.js
import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

const api = axios.create({
  baseURL: API_URL,
  withCredentials: false, 
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const generateInterviewReport = async ({ jobDescription, selfDescription, resumeFile }) => {
  try {
    const formData = new FormData()
    formData.append("jobDescription", jobDescription)
    formData.append("selfDescription", selfDescription)
    formData.append("resume", resumeFile)

    const response = await api.post("/api/interview", formData)
    return response.data
  } catch (err) {
    console.error('generateInterviewReport error:', err)
    return null
  }
}

export const getInterviewReportById = async (interviewId) => {
  try {
    const response = await api.get(`/api/interview/report/${interviewId}`)
    return response.data
  } catch (err) {
    console.error('getInterviewReportById error:', err)
    return null
  }
}

export const getAllInterviewReports = async () => {
  try {
    const response = await api.get("/api/interview")
    return response.data
  } catch (err) {
    console.error('getAllInterviewReports error:', err)
    return null
  }
}