import React from 'react'

const UserCard = ({user}) => {
  return (
    <div>
        {user?.name || "NA"}
    </div>
  )
}

export default UserCard