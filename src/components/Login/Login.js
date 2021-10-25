import {Avatar, Box, Button, Container, CssBaseline, TextField, Typography} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {NavLink, useHistory} from "react-router-dom";
import StyleLogin from "./StyleLogin";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {hasUpperCase, isEmail} from "../../Utils";
import Message from "../Message";
import {LOGIN} from "../../redux/userReducer";

const Login = () => {
    const classes = StyleLogin();
    const dispatch = useDispatch();
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {users} = useSelector(store => store.user);
    const [showMessage, setShowMessage] = useState(false);
    const [isEmailValue, setIsEmailValue] = useState(false);
    const [isPassword, setIsPassword] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        //    here we need to do query to backend
        if (!(isEmailValue && isPassword)) {
            setShowMessage(true);
            return;
        }

        let candidate = users.find(user => user.email === email);

        if (!candidate) {
            setShowMessage(true);
            return;
        }

        if (candidate.password === password) {
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

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box className={classes.paper}>
                <Avatar className={classes.avatar}><LockOutlinedIcon/></Avatar>
                <Typography component="h1" variant="h5">Login</Typography>

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
                    <Box marginTop={3} marginBottom={2}>
                        <Button
                            type="submit" fullWidth variant="contained" color="primary"
                            onClick={handleLogin}
                        >
                            Sign in
                        </Button>
                    </Box>
                </form>
            </Box>
            <Box marginTop={3} textAlign='center'>
                <NavLink to='/register' className={classes.signIn}>Not a user ? Register</NavLink>
            </Box>
            <Message isOpen={showMessage} message={'Wrong Login or Password'} handleClose={() => setShowMessage(false)}/>
        </Container>
    )
}

export default Login;