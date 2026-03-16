import React from 'react'
import '../style/home.scss'
import { SparkleIcon } from '@phosphor-icons/react'

const Home = () => {
    return (
        <main>
            <div className="heading">
                <h1>New Interview Report</h1>
                <p>Fill in the details below to generate a comprehensive interview assessment.</p>
            </div>
            <div className="input-wrapper">
                <div className="input-form-container">
                    <div className="left">
                        <label htmlFor="jobDescription">1. Job Description</label>
                        <textarea name="jobDescription" id="jobDescription" className='job-description' placeholder='Paste the job description here... Include requirements, responsibilities, and company culture.'></textarea>
                    </div>
                    <div className="right">
                        <div className="input-form-group">
                            <label htmlFor="uploadResume">2. Upload Resume</label>
                            <input type="file" name="uploadResume" id="uploadResume" className='upload-resume' accept=".pdf" />
                        </div>
                        <div className="input-form-group">
                            <label htmlFor="selfDescription">3. Self Description</label>
                            <textarea name="selfDescription" id="selfDescription" className='self-description' placeholder='Tell us about yourself... Include key experiences, achievements, and professional background.'></textarea>
                        </div>
                    </div>
                </div>
                <div className="submit-btn">
                    <button> <SparkleIcon size={16} weight="bold" /> Generate Report</button>
                </div>
            </div>
        </main>
    )
}

export default Home