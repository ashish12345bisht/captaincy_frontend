import React, { useEffect, useState } from 'react'
import TeamList from '../../components/home/TeamList';
import UserList from '../../components/home/UserList';
import { getAllTeams } from '../../services/home';
import TeamCard from '../../components/home/TeamCard';
import TeamMembers from '../../components/home/TeamMembers';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAllTasks } from '../../services/tasks';
import TaskCard from '../../components/home/TaskCard';
import { getAllSubadmin, getAllUsers } from '../../services/users';
import SubadminCard from '../../components/home/SubadminCard';

const Home = () => {
    const { data } = useSelector(state => state.authReducer)
    const [tab, setTab] = useState(0);
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState("");
    const [teams, setTeams] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [subadmins, setSubadmins] = useState([]);
    const [users, setUsers] = useState([]);

    const [activeTeam, setActiveTeam] = useState({});
    const navigate = useNavigate()
    useEffect(() => {
        if (data?.type === "TEAM_MEMBER") {
            fetchTasks();
        } else if (data?.type === "SUBADMIN") {
            getTeams();
        } else {
            if (tab === 0) {
                fetchSubadminList()
            } else {
                fetchUserList();
            }
        }
    }, [search, tab])

    const getTeams = async () => {
        let response = await getAllTeams({ skip, limit, search });
        if (response?.statusCode === 200) {
            let data = response?.data?.result || []
            setTeams(data)
            if (data.length) {
                setActiveTeam(data[0]);
            }
        }
    }

    const fetchTasks = async () => {
        let response = await getAllTasks();
        if (response?.statusCode === 200) {
            setTasks(response?.data || []);
        }
    }

    const fetchSubadminList = async () => {
        let response = await getAllSubadmin();
        if (response?.statusCode === 200) {
            setSubadmins(response?.data);
        }
    }

    const fetchUserList = async () => {
        let response = await getAllUsers();
        if (response?.statusCode === 200) {
            setUsers(response?.data);
        }
    }

    const handleAddTeam = () => {
        navigate("/add-team")
    }

    const handleAddSubadmin = () => {
        navigate("/add-subadmin")
    }


    return (
        <>
            <div>
                {data?.type === "ADMIN" && <button className='btn btn-primary' onClick={handleAddSubadmin}>Add Subadmin</button>}
                {data?.type === "SUBADMIN" && <button className='btn btn-primary' onClick={handleAddTeam}>Add Team</button>}
                {data?.type === "TEAM_MEMBER" ?
                    <div className='home-team-container'>
                        {tasks.map((item) => (
                            <TaskCard key={item.id} task={item} fetchTasks={fetchTasks} />
                        ))}
                    </div> :
                    data?.type === "SUBADMIN" ?
                        <div className='home-team-container'>

                            {teams.map((item) => (
                                <TeamCard getTeams={getTeams} onClick={() => setActiveTeam(item)} key={item.id} team={item} />
                            ))}
                        </div> :
                        <>

                            <div>
                                <button className='btn btn-dark' onClick={() => setTab(0)}>Subamins</button>
                                <button className='btn btn-dark' onClick={() => setTab(1)}>Users</button>
                            </div>
                            <div className='home-team-container'>

                                {tab === 0 && subadmins.map((item) => (
                                    <SubadminCard getUserList={fetchSubadminList} key={item.id} subadmin={item} />
                                ))}
                                {tab === 1 && users.map((item) => (
                                    <SubadminCard getUserList={fetchUserList} key={item.id} subadmin={item} />
                                ))}
                            </div>
                        </>
                }
                {/* <TeamMembers activeTeam={activeTeam} /> */}
            </div>
        </>
    )
}

export default Home