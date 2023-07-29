import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { generateConfirm } from '../../utils/confirmAlert';
import { deleteTeam } from '../../services/teams';
import { successToast } from '../../helpers';

const TeamCard = ({ team, onClick = () => { }, getTeams = () => { } }) => {
  const navigate = useNavigate();

  useEffect(() => {

    return () => {

    }
  }, [])
  const handleEdit = (id) => {
    navigate(`/edit-team/${id}`)
  }
  const handleView = (id) => {
    navigate(`/team-details/${id}`)
  }
  const handleDelete = async (id) => {
    generateConfirm("Are You Sure?", "You want to delete this team?", () => teamDelete(id))
  }

  const teamDelete = async (id) => {
    let response = await deleteTeam({ id });
    if (response?.statusCode === 200) {
      successToast(response?.message);
      getTeams()
    }
  }
  return (
    <div onClick={onClick} className='card-glow' id={`card-${team._id}`}>
      <h1>{team?.name || "NA"}</h1>
      <div className='btn-container'>
        <button onClick={() => handleEdit(team._id)}>Edit</button>
        <button onClick={() => handleView(team._id)}>View</button>
        <button onClick={() => handleDelete(team._id)}>Delete</button>
      </div>
    </div>
  )
}

export default TeamCard