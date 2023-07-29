import React, { useEffect, useState } from 'react'
import { getAllTeams } from '../../services/home';
import TeamCard from './TeamCard';

const TeamList = () => {
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState("");
    const [teams, setTeams] = useState([]);
    useEffect(() => {
        getTeams();
    }, [search])

    const getTeams = async () => {
        let response = await getAllTeams({ skip, limit, search });
        if (response?.statusCode === 200) {
            setTeams(response?.data?.result || [])
        }
    }
    return (
        <div>
            <input value={search} onChange={e => setSearch(e.target.value)} />
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                {teams.map((item) => (
                    <TeamCard key={item._id} team={item} />
                ))}
            </div>
        </div>
    )
}

export default TeamList