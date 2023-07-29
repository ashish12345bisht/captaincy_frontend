import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getTeamDetails, removeTeamMember } from '../../services/teams';
import NoDataFound from '../../components/common/NoDataFound';
import CustomModal from '../../components/common/CustomModal';
import AddTeamMembers from '../../components/team/AddTeamMembers';
import { successToast, triggerModal } from '../../helpers';
import { generateConfirm } from '../../utils/confirmAlert';
import AddTask from '../../components/team/AddTask';

const TeamDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [teamData, setTeamData] = useState({});
    const [isAddTeam, setIsAddTeam] = useState(true);
    const [userId, setUserId] = useState("0");

    useEffect(() => {
        fetchTeamDetails()
    }, [])

    const fetchTeamDetails = async () => {
        let response = await getTeamDetails({ id });
        if (response?.statusCode === 200) {
            setTeamData(response?.data || {})
        }
    }

    const handleAddTeamMembers = () => {
        setIsAddTeam(true);
        triggerModal(true)
    }

    const handleRemove = (id) => {
        generateConfirm("Are You Sure?", "You want to Remove this team Member", () => removeHandler(id))
    }

    const removeHandler = async (user_id) => {
        let response = await removeTeamMember({ user_id, team_id: id });
        if (response?.statusCode === 200) {
            successToast(response?.message);
            fetchTeamDetails();
        }
    }

    const handleView = (user_id) => {
        navigate(`/user-details/${user_id}`)
    }

    const handleTask = (user_id) => {
        setUserId(user_id)
        setIsAddTeam(false);
        triggerModal(true);
    }

    return (
        <div className='common-font-color'>
            <h4>{teamData?.name || "NA"}</h4>
            <button onClick={handleAddTeamMembers} className='btn btn-success'>Add Members to Team</button>
            <div>
                {teamData?.teamMembers?.map((user) => (
                    <div>
                        <h3>{user?.name || "NA"}</h3>
                        <h5>{user?.email || "NA"}</h5>
                        <div>
                            <button onClick={() => handleView(user.id)} className='btn btn-primary'>View</button>
                            <button onClick={() => handleTask(user.id)} className='btn btn-success'>Add Task</button>
                            <button onClick={() => handleRemove(user.id)} className='btn btn-danger'>Delete</button>
                        </div>
                    </div>
                ))}
                {teamData?.teamMembers?.length === 0 && <NoDataFound />}
            </div>
            <CustomModal children={isAddTeam ? <AddTeamMembers fetchTeamDetails={fetchTeamDetails} team_id={teamData?.id} /> : <AddTask team_id={id} user_id={userId} />} />
        </div>
    )
}

export default TeamDetails