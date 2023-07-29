import React from 'react'
import { useForm, yup, yupResolver } from '../../utils/form';
import ErrorShow from '../../components/common/ErrorShow';
import { changePassword } from '../../services/auth';
import { useNavigate } from 'react-router-dom';
import { errorToast, successToast } from '../../helpers';

const teamSchema = yup.object().shape({
    old_password: yup.string().required("Old Password is Required"),
    new_password: yup.string().required("New Password is Required"),
    confirm_password: yup.string().required("Confirm Password is Required").oneOf([yup.ref('new_password'), null], 'Passwords must match'),
})

const ChangePassword = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(teamSchema),
    });

    const onSubmit = handleSubmit((values) => {
        handleChangePassword(values)
    });

    const handleChangePassword = async (values) => {
        let response = await changePassword(values);
        if (response?.statusCode === 200) {
            successToast(response?.message);
            navigate("/");
        } else {
            errorToast(response?.message)
        }
    }



    return (
        <div className='d-flex justify-content-center align-items-center pt-5'>
            <form className='w-50' onSubmit={onSubmit}>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label common-font-color">Old Password</label>
                    <input type="password" class="form-control" {...register("old_password")} id="exampleInputPassword1" />
                    <ErrorShow error={errors?.old_password} />
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword2" class="form-label common-font-color">New Password</label>
                    <input type="password" class="form-control"  {...register("new_password")} id="exampleInputPassword2" />
                    <ErrorShow error={errors?.new_password} />
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword3" class="form-label common-font-color">Confirm Password</label>
                    <input type="password" class="form-control"  {...register("confirm_password")} id="exampleInputPassword3" />
                    <ErrorShow error={errors?.confirm_password} />
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default ChangePassword