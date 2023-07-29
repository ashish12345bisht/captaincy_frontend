import React from 'react'

const ErrorShow = ({ error = false }) => {
  return (
    <>
      {error && <p style={{ color: "red" }}>{error?.message}</p>}
    </>
  )
}

export default ErrorShow