import React, { useEffect, useState } from 'react'
import { getUsers } from '../../services/home';
import UserCard from './UserCard';

const UserList = () => {
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, [search])

    const getUsers = async () => {
        let response = await getUsers({ skip, limit, search });
        if (response?.statusCode === 200) {
            setUsers(response?.data?.result || [])
        }
    }
    return (
        <div>
            <input value={search} onChange={e => setSearch(e.target.value)} />
            {users.map((item) => (
                <UserCard key={item?.id} user={item} />
            ))}
        </div>
    )
}

export default UserList