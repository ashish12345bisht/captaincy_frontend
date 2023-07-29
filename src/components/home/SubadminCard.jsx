import React from 'react'
import { generateConfirm } from '../../utils/confirmAlert'
import { userDelete } from '../../services/users';
import { errorToast, successToast } from '../../helpers';

const SubadminCard = ({ subadmin, getUserList = () => { } }) => {
    const handleDelete = (id) => {
        generateConfirm("Are you Sure?", "You want to delete this user?", () => deleteUser(id));
    }

    const deleteUser = async (id) => {
        let response = await userDelete({ id })
        if (response?.statusCode === 200) {
            successToast(response?.message);
            getUserList();
        } else {
            errorToast(response?.message)
        }
    }
    return (
        <div className='card-glow' id={`card-${subadmin.id}`}>
            <h1>{subadmin?.name || "NA"}</h1>
            <p>{subadmin?.email || "NA"}</p>
            <div className='btn-container'>
                {/* <button onClick={() => handleEdit(subadmin._id)}>Edit</button> */}
                {/* <button onClick={() => handleView(subadmin._id)}>View</button> */}
                <button onClick={() => handleDelete(subadmin.id)}>Delete</button>
            </div>
        </div>
    )
}

export default SubadminCard