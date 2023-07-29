import React, { useEffect, useState } from 'react'
import { getUserDetails } from '../../services/users';
import { useParams } from 'react-router-dom';
import NoDataFound from '../../components/common/NoDataFound';
import { updateTaskStatus } from '../../services/tasks';
import { errorToast, successToast } from '../../helpers';
import { generateConfirm } from '../../utils/confirmAlert';

const UserDetails = () => {
    const [userDetails, setUserDetails] = useState({});
    const { user_id } = useParams();

    useEffect(() => {
        fetchUserDetails();
    }, [])

    const fetchUserDetails = async () => {
        let response = await getUserDetails({ user_id });
        if (response?.statusCode === 200) {
            setUserDetails(response?.data || {});
        }
    }

    const handleTaskStatusChange = async (task) => {
        generateConfirm("Are you sure?", "You want to approve the task?", async () => {
            let payload = {
                task_id: task.id,
                status: "approved"
            }
            let response = await updateTaskStatus(payload);
            if (response?.statusCode === 200) {
                successToast(response?.message);
                fetchUserDetails();
            } else {
                errorToast(response?.message)
            }
        })
    }
    return (
        <div>
            <section className='common-font-color'>
                <h3>{userDetails?.user?.name || "NA"}</h3>
                <h5>{userDetails?.user?.email || "NA"}</h5>
            </section>
            <section>
                <div>
                    {userDetails?.tasks?.map((task) => (
                        <div className='common-font-color'>
                            <h4>{task?.name || "NA"}</h4>
                            <p>{task?.description || "NA"}</p>
                            {(task?.status === "approved" || task?.status === "pending") ? <p style={{ textTransform: "capitalize" }}>{task?.status}</p> :
                                <>
                                    <input className='cursor-pointer' checked={task?.status !== "completed"} onChange={() => handleTaskStatusChange(task)} id={`iscomplete${task?.id}`} type="checkbox" />
                                    <label className='cursor-pointer' htmlFor={`iscomplete${task?.id}`}>Mark as Approved</label>
                                </>}
                        </div>
                    ))}
                    {userDetails?.tasks?.length === 0 && <NoDataFound />}
                </div>
            </section>
        </div>
    )
}

export default UserDetails