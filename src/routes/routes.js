import React from 'react';
import Quiz from '../components/quizComponents/quiz';
import AllQuizizz from '../components/quizComponents/allQuizizz';
import OneCourseItems from '../components/oneCourseItems';
import AddQuiz from '../components/quizComponents/addQuiz';
import EditQuiz from '../components/quizComponents/editQuiz';
import Login from '../components/userCompnents/login';
import SignUp from '../components/userCompnents/register';
import Profile from '../components/userCompnents/profile';
import DashbordData from '../components/userCompnents/dashbordData';
import AllPosts from '../components/postsComponets/allPosts';
import AllFiles from '../components/filesComponents/allFiles';
import { Route, Switch } from 'react-router-dom';
import '../App.css';
import { AuthRoute, MutationRoute, DashboardRoute } from '../util/AuthRoute';
import RegisterAdmin from '../components/userCompnents/registerAdmin';

function Routes() {
    return (
        <div className="App">
            <Switch>
                <Route exact path="/" component={AllQuizizz} />
                <Route exact path="/posts" component={AllPosts} />
                <Route exact path="/files" component={AllFiles} />
                <AuthRoute exact path="/login" component={Login} />
                <AuthRoute exact path="/register" component={SignUp} />
                <AuthRoute exact path="/register/admin" component={RegisterAdmin} />
                <Route exact path="/:course_name" render={(routeProps) => <OneCourseItems {...routeProps} />} />
                <Route exact path="/quiz/:course_name/:id" render={(routeProps) => < Quiz {...routeProps} />} />
                <MutationRoute exact path="/quiz/new" component={AddQuiz} />
                <Route exact path="/quiz/:id/:username/edit" render={(routeProps) => <EditQuiz {...routeProps} />} />
                <Route exact path="/profile/:username" render={(routeProps) => <Profile {...routeProps} />} />
                <DashboardRoute exact path="/dashbord/:username" component={DashbordData} />
            </Switch>
        </div>
    );
}

export default Routes;