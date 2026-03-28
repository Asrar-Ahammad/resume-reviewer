import React, { useRef, useState } from 'react'
import '../style/home.scss'
import '../style/home.css'
import { SparkleIcon, UserIcon } from '@phosphor-icons/react'
import { useInterview } from '../hooks/useInterview'
import { useNavigate } from 'react-router'
import { useAuth } from '../../auth/hooks/useAuth'

const Home = () => {

    const { generateReport, loading } = useInterview()
    const [jobDescription, setJobDescription] = useState("")
    const [selfDescription, setSelfDescription] = useState("")
    const resumeInputRef = useRef()

    const { handleLogout } = useAuth()

    const navigate = useNavigate()

    const handleGenerateReport = async () => {
    try {
        const resumeFile = resumeInputRef.current.files[0]

        if (!resumeFile) {
            alert('Please upload a resume PDF')
            return
        }

        if (!jobDescription.trim()) {
            alert('Please enter a job description')
            return
        }

        const data = await generateReport({ jobDescription, selfDescription, resumeFile })

        if (!data?._id) {
            alert('Failed to generate report. Please try again.')
            return
        }

        navigate(`/interview/${data._id}`)
    } catch (error) {
        console.error('handleGenerateReport error:', error)
    }
}
    if (loading) {
        return (
            <main className='loading-screen'>
            <div className="loader"></div>
            </main>
        )
    }

    const Logout = async ()=>{
        await handleLogout()
        navigate("/login")
    }

    return (
        <main>
            <div className="home-main">
                <div className="home-nav">
                    <div className="logo">
                        <img src="/logo.svg" alt="logo" />
                        <p>HireSight</p>
                    </div>
                    <div className="user-details">
                        <div className="home-nav-right">
                            <button onClick={() => navigate('/interview-reports')}>View Reports</button>
                        </div>
                        <div className="home-nav-right">
                            <button onClick={Logout}>Logout</button>
                        </div>
                    </div>
                </div>
                <div className="heading">
                    <h1>New Interview Report</h1>
                    <p>Fill in the details below to generate a comprehensive interview assessment.</p>
                </div>
                <div className="input-wrapper">
                    <div className="input-form-container">
                        <div className="left">
                            <label htmlFor="jobDescription">1. Job Description</label>
                            <textarea onChange={(e) => { setJobDescription(e.target.value) }} name="jobDescription" id="jobDescription" className='job-description' required placeholder='Paste the job description here... Include requirements, responsibilities, and company culture.'></textarea>
                        </div>
                        <div className="right">
                            <div className="input-form-group">
                                <label htmlFor="uploadResume">2. Upload Resume</label>
                                <input ref={resumeInputRef} type="file" name="uploadResume" id="uploadResume" className='upload-resume' accept=".pdf" required />
                            </div>
                            <div className="input-form-group">
                                <label htmlFor="selfDescription">3. Self Description</label>
                                <textarea onChange={(e) => { setSelfDescription(e.target.value) }} name="selfDescription" id="selfDescription" className='self-description' placeholder='Tell us about yourself... Include key experiences, achievements, and professional background.'></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="submit-btn">
                        <button onClick={handleGenerateReport}> <SparkleIcon size={16} weight="bold" /> Generate Report</button>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Home