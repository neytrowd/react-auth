import React, {useState} from "react";
import Snackbar from '@material-ui/core/Snackbar';

const Message = ({message, isOpen, handleClose}) => {

    const [state] = useState({
        vertical: 'top',
        horizontal: 'right',
    });

    const {vertical, horizontal} = state;

    return (
        <React.Fragment>
            <Snackbar
                anchorOrigin={{vertical, horizontal}}
                open={isOpen}
                onClose={handleClose}
                message={message}
            />
        </React.Fragment>
    );
}

export default Message;