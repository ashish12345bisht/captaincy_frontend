import { confirmAlert } from 'react-confirm-alert';

export const generateConfirm = (title = "", message = "", yesFunc = () => { }) => {
    confirmAlert({
        title,
        message,
        buttons: [
            {
                label: 'Yes',
                onClick: () => yesFunc()
            },
            {
                label: 'No',
                onClick: () => { }
            }
        ]
    });
}