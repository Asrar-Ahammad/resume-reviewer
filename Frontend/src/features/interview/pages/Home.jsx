import React, { useRef, useState } from 'react'
import '../style/home.scss'
import { SparkleIcon } from '@phosphor-icons/react'
import { useInterview } from '../hooks/useInterview'
import { useNavigate } from 'react-router'

const Home = () => {

    const { generateReport, loading } = useInterview()
    const [jobDescription, setJobDescription] = useState("")
    const [selfDescription, setSelfDescription] = useState("")
    const resumeInputRef = useRef()

    const navigate = useNavigate()

    const handleGenerateReport = async ()=>{
        const resumeFile = resumeInputRef.current.files[0]
        const data = await generateReport({jobDescription, selfDescription, resumeFile})
        navigate(`/interview/${data._id}`)
    }
    if(loading){
        return(
            <main className='loading-screen'><p>Loading...</p></main>
        )
    }

    return (
        <main>
            <div className="heading">
                <div className="heading-left">
                <h1>New Interview Report</h1>
                <p>Fill in the details below to generate a comprehensive interview assessment.</p>
                </div>
                <div className="heading-right">
                    <button onClick={() => navigate('/interview-reports')}>View Reports</button>
                </div>
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
                    <button onClick={handleGenerateReport} > <SparkleIcon size={16} weight="bold" /> Generate Report</button>
                </div>
            </div>
        </main>
    )
}

export default Home