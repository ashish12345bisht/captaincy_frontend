import { CHANGE_MODAL_STATE } from "../../constants/constants"

export const openModal = () => {
    return {type: CHANGE_MODAL_STATE, payload: true}
}

export const closeModal = () => {
    return {type: CHANGE_MODAL_STATE, payload: false}
}