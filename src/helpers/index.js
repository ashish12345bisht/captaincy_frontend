import { toast } from 'react-hot-toast'
import store from '../redux/store/store'
import { closeModal, openModal } from '../redux/actions/modal'

export const successToast = (message = "success") => {
    toast.dismiss()
    toast.success(message)
}

export const errorToast = (message = "Something Went Wrong") => {
    toast.dismiss()
    toast.error(message)
}

export const imageValidation = (value) => {
    if (value.length > 0) {
        return true;
    }
    return false;
}

export const triggerModal = (bool) => {
    if (bool) {
        store.dispatch(openModal())
    } else {
        store.dispatch(closeModal())
    }
}