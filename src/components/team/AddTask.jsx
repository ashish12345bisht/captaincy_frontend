import React from 'react'
import { useForm, yup, yupResolver } from '../../utils/form';
import ErrorShow from '../common/ErrorShow';
import { addTask } from '../../services/tasks';
import { errorToast, successToast, triggerModal } from '../../helpers';

const taskSchema = yup.object().shape({
    name: yup.string().required("Name is Required").max(50, "Max 50 characters allowed"),
    description: yup.string().required("Description is Required").max(500, "Max 500 characters allowed"),
})

const AddTask = ({ user_id, team_id }) => {

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(taskSchema),
    });

    const onSubmit = handleSubmit((values) => {
        handleAddTask(values)
    });

    const handleAddTask = async (values) => {
        let response = await addTask({ ...values, user_id, team_id });
        if (response?.statusCode === 200) {
            triggerModal(false)
            successToast(response?.message);
        } else {
            errorToast(response?.message)
        }
    }


    return (
        <div>
            <form onSubmit={onSubmit}>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Name</label>
                    <input {...register("name")} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <ErrorShow error={errors.name} />
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail2" class="form-label">Description</label>
                    <textarea {...register("description")} class="form-control" id="exampleInputEmail2" aria-describedby="emailHelp"></textarea>
                    <ErrorShow error={errors.description} />
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default AddTask