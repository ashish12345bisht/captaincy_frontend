import React from 'react'
import { updateTaskStatus } from '../../services/tasks'
import { errorToast, successToast } from '../../helpers'

const TaskCard = ({ task = {}, fetchTasks = () => { } }) => {
    const handleTaskStatusChange = async (task) => {
        let payload = {
            task_id: task.id,
            status: task?.status === "pending" ? "completed" : "pending"
        }
        let response = await updateTaskStatus(payload);
        if (response?.statusCode === 200) {
            successToast(response?.message);
            fetchTasks();
        } else {
            errorToast(response?.message)
        }
    }
    return (
        <div className='common-font-color'>
            <h4>{task?.name || "NA"}</h4>
            <p>{task?.description || "NA"}</p>
            {task?.status === "approved" ? <p>Approved</p> :
                <>
                    <input className='cursor-pointer' checked={task?.status === "completed"} onChange={() => handleTaskStatusChange(task)} id={`iscomplete${task?.id}`} type="checkbox" />
                    <label className='cursor-pointer' htmlFor={`iscomplete${task?.id}`}>Mark As Done</label>
                </>}
        </div>
    )
}

export default TaskCard