import './App.css';
import Login from "./components/Login";
import Register from "./components/Register";
import NotFound from "./components/NotFound";
import {Switch, Route} from 'react-router-dom';
import {createTheme, ThemeProvider} from '@material-ui/core/styles';
import ChangePassword from "./components/ChangePassword";
import Header from "./components/Header";
import {useSelector} from "react-redux";
import Message from "./components/Message";

function App() {
    const theme = createTheme({palette: {type: 'dark'}});
    const {current} = useSelector(store => store.user)

    return (
        <div className="App">
            <Message/>
            <ThemeProvider theme={theme}>
                {
                    current ? (
                        <Switch>
                            <Route exact path={'/'} component={Header}/>
                            <Route exact path={'/change'} component={ChangePassword}/>
                            <Route path={'*'} component={NotFound}/>
                        </Switch>
                    ) : (
                        <Switch>
                            <Route exact path={'/'} component={Header}/>
                            <Route exact path={'/login'} component={Login}/>
                            <Route exact path={'/register'} component={Register}/>
                            <Route path={'*'} component={NotFound}/>
                        </Switch>
                    )
                }
            </ThemeProvider>
        </div>
    );
}

export default App;
