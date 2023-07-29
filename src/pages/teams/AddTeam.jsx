import React, { useEffect, useState } from 'react'
import { useForm, yup, yupResolver } from '../../utils/form';
import ErrorShow from '../../components/common/ErrorShow';
import { addTeam, editTeam, getTeamDetails } from '../../services/teams';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { successToast } from '../../helpers';

const teamSchema = yup.object().shape({
    name: yup.string().required("Name is Required").max(50, "Max 50 characters allowed"),
})

const AddTeam = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();
    const editable = location.pathname.indexOf("edit") > -1 ? true : false;
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(teamSchema),
    });

    useEffect(() => {
        if (editable) {
            fetchTeamDetails()
        }
    }, [])


    const fetchTeamDetails = async () => {
        let response = await getTeamDetails({ id });
        if (response?.statusCode === 200) {
            setValue("name", response?.data?.name || "")
        }
    }

    const onSubmit = handleSubmit((values) => {
        handleTeamAdd(values)
    });

    const handleTeamAdd = async (values) => {
        let response = {}
        if (editable) {
            response = await editTeam({ ...values, id });
        } else {
            response = await addTeam(values);
        }
        if (response?.statusCode === 200) {
            successToast(response?.message);
            navigate("/")
        }
    }
    return (
        <div>
            <h1 className='common-font-color'>{!editable ? "Add" : "Edit"} Team</h1>
            <form onSubmit={onSubmit} className='w-50 h-100 m-auto mt-5'>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label common-font-color">Team Name</label>
                    <input placeholder='example:- Team 1234' {...register("name")} class="form-control" aria-describedby="emailHelp" />
                    <ErrorShow error={errors.name} />
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default AddTeam