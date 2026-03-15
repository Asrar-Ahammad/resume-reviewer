import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import React from 'react'

const Protected = ({children}) => {
    const { loading, user } = useAuth()

    if (loading) {
        return (<main>Loading.....</main>)
    }
    if (!user) {
        return <Navigate to={'/login'} />
    }
    return children
}

export default Protected