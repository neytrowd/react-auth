import React, {useState} from "react";
import {
    AppBar,
    Avatar,
    Box,
    Container,
    CssBaseline,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip
} from "@material-ui/core";
import {NavLink} from "react-router-dom";
import StyleHeader from "./StyleHeader";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {useDispatch, useSelector} from "react-redux";
import {LOGOUT} from "../../redux/userReducer";


const Header = () => {
    const dispatch = useDispatch();
    const {current} = useSelector(store => store.user);
    const classes = StyleHeader();
    const [openSettings, setOpenSettings] = useState(null);
    const handleClose = () => setOpenSettings(null);
    const handleClick = (event) => setOpenSettings(event.currentTarget);

    const logout = () => {
        dispatch({type: LOGOUT});
    }

    return (
        <React.Fragment>
            <CssBaseline/>
            <AppBar position="static" color="default" elevation={0}>
                <Container>
                    <Toolbar>
                        <Box
                            display={'flex'}
                            justifyContent='space-between'
                            width={'100%'}
                            alignItems={'center'}
                        >
                            <Box>
                                {current}
                            </Box>
                            <Box>
                                <Avatar>
                                    <Tooltip title='Actions'>
                                        <IconButton onClick={handleClick}>
                                            <MoreVertIcon/>
                                        </IconButton>
                                    </Tooltip>
                                </Avatar>


                                {
                                    !Boolean(current) ?
                                        (

                                            <Menu
                                                anchorEl={openSettings}
                                                keepMounted
                                                open={Boolean(openSettings)}
                                                onClose={handleClose}
                                            >
                                                <MenuItem>
                                                    <NavLink to={'/login'} className={classes.menuItem}>
                                                        Login
                                                    </NavLink>
                                                </MenuItem>
                                                <MenuItem>
                                                    <NavLink to={'/register'} className={classes.menuItem}>
                                                        Register
                                                    </NavLink>
                                                </MenuItem>
                                            </Menu>

                                        )

                                        : (
                                            <Menu
                                                anchorEl={openSettings}
                                                keepMounted
                                                open={Boolean(openSettings)}
                                                onClose={handleClose}
                                            >
                                                <MenuItem>
                                                    <NavLink to={'/change'} className={classes.menuItem}>
                                                        Change Password
                                                    </NavLink>
                                                </MenuItem>
                                                <MenuItem onClick={logout}>
                                                    Logout
                                                </MenuItem>
                                            </Menu>
                                        )
                                }
                            </Box>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </React.Fragment>

    )
}

export default Header