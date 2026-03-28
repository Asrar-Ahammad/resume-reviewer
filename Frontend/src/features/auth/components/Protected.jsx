import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import React from 'react'
import '../style.css'

const Protected = ({children}) => {
    const { loading, user } = useAuth()

    if (loading) {
        return (<main>
            <div className="loading-screen">
                <div className="loader"></div>
            </div>
        </main>)
    }
    if (!user) {
        return <Navigate to={'/login'} />
    }
    return children
}

export default Protected