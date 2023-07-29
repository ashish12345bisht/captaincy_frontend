import { useEffect, useState } from 'react';
import makeAnimated from 'react-select/animated';
import { getAllUsers } from '../../services/users';
import Select from 'react-select';
import { addTeamMembers } from '../../services/teams';
import { successToast, triggerModal } from '../../helpers';

const animatedComponents = makeAnimated();

const AddTeamMembers = ({ team_id, fetchTeamDetails = () => { } }) => {
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);

    useEffect(() => {
        fetchAllUsers()
    }, [])
    const fetchAllUsers = async () => {
        let response = await getAllUsers({ id: team_id });
        if (response?.statusCode === 200) {
            setUsers(response?.data?.map((item) => ({ value: item.id, label: (item.name + " " + item.email) })) || []);
        }
    }

    const handleChange = (e) => {
        setSelectedUsers(e);
    }

    const handleAdd = async () => {
        let response = await addTeamMembers({ team_id, users: selectedUsers?.flatMap(item => item.value) });
        if (response?.statusCode === 200) {
            successToast(response?.message);
            fetchTeamDetails()
            triggerModal(false);
        }
    }
    return (
        <div>
            <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={users}
                value={selectedUsers}
                onChange={handleChange}
            />
            <button onClick={handleAdd} className='btn btn-success'>Add</button>
        </div>
    )
}

export default AddTeamMembers