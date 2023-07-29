import { useDispatch } from 'react-redux';
import { closeModal, openModal } from '../redux/actions/modal';

const useModal = () => {
    const dispatch = useDispatch()
    const toggleModal = (open) => {
        if (open) {
            dispatch(openModal())
        } else {
            dispatch(closeModal())
        }
    }
    return toggleModal;
};

export default useModal;