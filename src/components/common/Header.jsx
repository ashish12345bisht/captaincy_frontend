import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid';
import { Button, Typography } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import { usertypes } from '../../constants';
import CustomModal from './CustomModal'
import useModal from '../../hooks/useModal';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorShow from './ErrorShow';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { errorToast, successToast } from '../../helpers';
import { addNewTeam, addNewUser, signup } from '../../services/auth';
import { getAllTeams } from '../../services/home';
import { logo } from '../../constants/images';

const loginSchema = yup.object().shape({
    name: yup.string().required(),
    type: yup.string().required(),
    email: yup.string().email().required(),
})

const teamSchema = yup.object().shape({
    name: yup.string().required()
})

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { authReducer, modalReducer } = useSelector(state => state);
    const { data } = authReducer;
    const [activeModal, setActveModal] = useState("team");
    const [teams, setTeams] = useState([]);

    const toggleModal = useModal();



    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginSchema),
    });

    const {
        register: register2,
        handleSubmit: handleSubmit2,
        reset: reset2,
        formState: { errors: errors2 },
    } = useForm({
        resolver: yupResolver(teamSchema),
    });


    const handleLogout = () => {
        dispatch(logout())
        navigate('/login')
    }

    const onSubmit = handleSubmit((values) => {
        addUser(values);
    });

    const onSubmit2 = handleSubmit2((values) => {
        addTeam(values);
    });

    const addUser = async (values) => {
        let response = await addNewUser(values);
        if (response?.statusCode === 200) {
            successToast("User Created Successfully");
            toggleModal(false);
        }
        else {
            errorToast(response?.message)
        }
    }

    const addTeam = async (values) => {
        let response = await addNewTeam(values);
        if (response?.statusCode === 200) {
            successToast("Team Created Successfully");
            toggleModal(false);
        }
        else {
            errorToast(response?.message)
        }
    }

    const getTeams = async () => {
        let response = await getAllTeams({ skip: 0, limit: 100000, search: "" });
        if (response?.statusCode === 200) {
            let data = response?.data?.result || []
            setTeams(data)
        }
    }

    const handleChangePassword = () => {
        navigate("/change-password")
    }

    return (
        <header className='header'>
            <Grid container>
                <Grid item xs={12} className='d-flex align-items-center' >
                    <img src={logo} alt="logo" style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "50%" }} />
                    <Typography variant="h5" className="header-message">Hey {data?.name || "NA"}</Typography>
                </Grid>
            </Grid>
            <CustomModal children={<>
                {activeModal === "member" ?
                    <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            {...register("email")}
                        />
                        <ErrorShow error={errors?.email} />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="name"
                            label="name"
                            type="name"
                            id="name"
                            autoComplete="current-name"
                            {...register("name")}
                        />
                        <ErrorShow error={errors?.name} />
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">User Type</InputLabel>
                            <Select labelId="demo-simple-select-label" id="demo-simple-select" {...register("type")} label="User Type">
                                {teams?.map((team) => (
                                    <MenuItem value={team._id}>{team?.name || "NA"}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <ErrorShow error={errors?.type} />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Submit
                        </Button>
                    </Box>
                    :
                    <Box component="form" onSubmit={onSubmit2} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="name"
                            label="name"
                            type="name"
                            id="name"
                            autoComplete="current-name"
                            {...register2("name")}
                        />
                        <ErrorShow error={errors?.name} />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Submit
                        </Button>
                    </Box>
                }
            </>} />
            <Button className='logout-btn' onClick={handleChangePassword}>Change Password</Button>
            <Button className='logout-btn' onClick={handleLogout}>Logout</Button>
        </header>
    )
}

export default Header