import React from 'react'
import { useNavigate } from 'react-router-dom'

const BackButton = () => {
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1)
    }
    return (
        <button onClick={handleBack} style={{ zIndex: "9999999" }} className='common-btn'>
            Back
        </button>
    )
}

export default BackButton