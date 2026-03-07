import React from 'react'
import { Link, useNavigate } from 'react-router';


const Register = () => {
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <main>
            <div className="form-container">
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" id='username' name='username' placeholder='Username' required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id='email' name='email' placeholder='Email' required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id='password' name='password' placeholder='Password' required />
                    </div>
                    <button className='button primary-button'>Get Started</button>
                </form>
                <p>Already have an account? <Link to={"/login"}>Login</Link></p>
            </div>
        </main>
    )
}

export default Register