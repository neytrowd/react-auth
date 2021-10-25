import {makeStyles} from "@material-ui/core";

const StyleLogin = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(15),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    signIn: {
        color: '#fff'
    }
}));

export default StyleLogin;