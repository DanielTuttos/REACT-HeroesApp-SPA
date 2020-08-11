import React, { useContext } from 'react';
import {
    BrowserRouter as Router,
    Switch
} from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';


// import { Navbar } from '../components/ui/Navbar';
import { LoginScreen } from '../components/login/LoginScreen';
import { DashboardRoutes } from './DashboardRoutes';
import { AuthContext } from '../auth/authContext';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {

    const { user: { logged } } = useContext(AuthContext);

    return (
        <Router>
            <div>
                {/* <Navbar /> */}

                <Switch>
                    <PublicRoute
                        exact
                        path="/login"
                        isAuthenticated={logged}
                        component={LoginScreen}
                    />
                    <PrivateRoute
                        path="/"
                        isAuthenticated={logged}
                        component={DashboardRoutes}
                    />
                </Switch>
            </div>
        </Router>
    )
}
