import React, { useEffect, useState } from 'react'
import { getTeamMembers } from '../../services/home';
import UserCard from './UserCard';

const TeamMembers = ({ activeTeam }) => {
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([])

    useEffect(() => {
        getUsers();
    }, [search, activeTeam])

    const getUsers = async () => {
        let response = await getTeamMembers({ skip, limit, search, id: activeTeam?._id });
        if (response?.statusCode === 200) {
            setUsers(response?.data?.result || [])
        }
    }
    return (
        <div>
            <h4>{activeTeam?.name || "NA"}</h4>
            <input placeholder='Search...' value={search} onChange={e => setSearch(e.target.value)} />
            {users.map((item) => (
                <UserCard key={item?.id} user={item} />
            ))}
        </div>
    )
}

export default TeamMembers