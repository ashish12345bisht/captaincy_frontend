import React from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../redux/actions/modal';

const style = {
    position: 'absolute',
    minHeight:"300px",
    maxHeight:"400px",
    overflow:"scroll",
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "50vw",
    minWidth:"360px",
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: '0px 0px 10px #333',
    borderRadius:"1rem",
    p: 4,
};

const CustomModal = ({ children }) => {
    const {open} = useSelector(state=>state.modalReducer)
    const dispatch = useDispatch()
    const handleClose = () => {
        dispatch(closeModal())
    }
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                {children}
            </Box>
        </Modal>
    )
}

export default CustomModal