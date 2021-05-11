import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../components/userContext';

const AuthRoute = ({ component: Component, ...rest }) => {
    const { user } = useContext(AuthContext);
    return (
        <Route
            {...rest}
            render={props =>
                user ? <Redirect to="/" /> : <Component {...props} />
            }
        />
    )
}


const MutationRoute = ({ component: Component, ...rest }) => {
    const { user } = useContext(AuthContext);
    return (
        <Route
            {...rest}
            render={props =>
                !user ? <Redirect to="/login" /> : <Component {...props} />
            }
        />
    )
}

const DashboardRoute = ({ component: Component, ...rest }) => {
    const { user } = useContext(AuthContext);
    return (
        <Route
            {...rest}
            render={props =>
                !user ? <Redirect to="/" /> : <Component {...props} />
            }
        />
    )
}

export { AuthRoute, MutationRoute, DashboardRoute };