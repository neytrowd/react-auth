import {Avatar, Box, Button, Container, CssBaseline, TextField, Typography} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {NavLink, useHistory} from "react-router-dom";
import StyleRegister from "./StyleRegister";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {LOGIN, REGISTER} from "../../redux/userReducer";
import {hasUpperCase, isEmail} from "../../Utils";
import Message from "../Message";


const Register = () => {
    const classes = StyleRegister();
    const dispatch = useDispatch();
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPasword, setConfirmPassword] = useState('');
    const {users} = useSelector(store => store.user);
    const [showMessage, setShowMessage] = useState(false);
    const [isEmailValue, setIsEmailValue] = useState(false);
    const [isPassword, setIsPassword] = useState(false);

    const handleRegister = (e) => {
        e.preventDefault();
        //    here we need to do query to backend
        if (!(isEmailValue && isPassword)) {
            setShowMessage(true);
            return;
        }

        let candidate = users.find(user => user.email === email);

        if (candidate) return;

        if (password === confirmPasword) {
            dispatch({type: REGISTER, payload: {email, password}});
            dispatch({type: LOGIN, payload: email})
            history.push('/');
            return;
        }

        setShowMessage(true);
    }

    const handleEmail = (e) => {
        let email = isEmail(e.target.value);
        setIsEmailValue(email)
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        let value = e.target.value
        let password = hasUpperCase(value);
        let correctLength = value.length > 3 && value.length < 10;
        setIsPassword(password && correctLength);
        setPassword(value);
    }

    const handleConfirm = (e) => {
        setConfirmPassword(e.target.value);
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}><LockOutlinedIcon/></Avatar>
                <Typography component="h1" variant="h5">Register</Typography>

                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined" required fullWidth label="Email Address"
                        name="email" margin="normal" size={"small"}
                        onChange={handleEmail}
                    />
                    <TextField
                        variant="outlined" required fullWidth label="Password"
                        name="password" type="password" margin="normal" size={"small"}
                        onChange={handlePassword}
                    />
                    <TextField
                        variant="outlined" required fullWidth label="Confirm Password"
                        name="confirmPassword" type="password" margin="normal" size={"small"}
                        onChange={handleConfirm}
                    />
                    <Box marginTop={3} marginBottom={2}>
                        <Button
                            type="submit" fullWidth variant="contained" color="primary"
                            onClick={handleRegister}
                        >
                            Register
                        </Button>
                    </Box>
                </form>
            </div>
            <Box marginTop={3} textAlign='center'>
                <NavLink to='/login' className={classes.signIn}>Already have an account ? Log in</NavLink>
            </Box>
            <Message isOpen={showMessage} message={'Wrong Login or Password'} handleClose={() => setShowMessage(false)}/>
        </Container>
    )
}

export default Register;