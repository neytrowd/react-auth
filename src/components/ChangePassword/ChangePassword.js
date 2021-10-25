import {Avatar, Box, Button, Container, CssBaseline, TextField, Typography} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import StyleChange from "./StyleChange";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {hasUpperCase} from "../../Utils";
import Message from "../Message";
import {CHANGE} from "../../redux/userReducer";
import {useHistory} from 'react-router-dom'

const ChangePassword = () => {
    const classes = StyleChange();
    const dispatch = useDispatch();
    const history = useHistory();
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const {users, current} = useSelector(store => store.user);
    const [showMessage, setShowMessage] = useState(false);
    const [isPassword, setIsPassword] = useState(false);

    const handlePassword = (e) => {
        let value = e.target.value
        let password = hasUpperCase(value);
        let correctLength = value.length > 3 && value.length < 10;
        setIsPassword(password && correctLength);
        setPassword(value);
    }

    const handleChange = (e) => {
        e.preventDefault();

        if (!isPassword) {
            setShowMessage(true);
            return;
        }

        let candidate = users.find(user => user.email === current);
        if (!candidate) return;

        if (candidate.password !== oldPassword) {
            setShowMessage(true);
            return;
        }

        if (password === confirmPassword) {
            dispatch({
                type: CHANGE,
                payload: {email: candidate.email, password}
            })
            history.push('/');
            return;
        }

        setShowMessage(true);
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box className={classes.paper}>
                <Avatar className={classes.avatar}><LockOutlinedIcon/></Avatar>
                <Typography component="h1" variant="h5">Change Password</Typography>

                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined" required fullWidth label="Old Password"
                        name="password" type="password" margin="normal" size={"small"}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                    <TextField
                        variant="outlined" required fullWidth label="New Password"
                        name="password" type="password" margin="normal" size={"small"}
                        onChange={handlePassword}
                    />
                    <TextField
                        variant="outlined" required fullWidth label="Confirm Password"
                        name="confirmPassword" type="password" margin="normal" size={"small"}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <Box marginTop={3} marginBottom={2}>
                        <Button
                            type="submit" fullWidth variant="contained" color="primary"
                            onClick={handleChange}
                        >
                            Change
                        </Button>
                    </Box>
                </form>
                <Message isOpen={showMessage} message={'Wrong Login or Password'} handleClose={()=> setShowMessage(false)}/>
            </Box>
        </Container>
    )
}

export default ChangePassword;