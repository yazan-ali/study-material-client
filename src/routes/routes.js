import React from 'react';
import Quiz from '../components/quizComponents/quiz';
import AllQuizizz from '../components/quizComponents/allQuizizz';
import AllDocuments from '../components/documentCompnents/allDocuments';
import OneCourseQuizizz from '../components/quizComponents/oneCourseQuizizz';
import AddQuiz from '../components/quizComponents/addQuiz';
import EditQuiz from '../components/quizComponents/editQuiz';
import Login from '../components/userCompnents/login';
import SignUp from '../components/userCompnents/register';
import Profile from '../components/userCompnents/profile';
import DashbordData from '../components/userCompnents/dashbordData';
import AllPosts from '../components/postsComponets/allPosts';
import { Route, Switch } from 'react-router-dom';
import '../App.css';
import Pdf from '../components/documentCompnents/pdf';
import { AuthRoute, MutationRoute } from '../util/AuthRoute';

function Routes() {
    return (
        <div className="App">
            <Switch>
                <Route exact path="/" component={AllPosts} />
                <AuthRoute exact path="/login" component={Login} />
                <AuthRoute exact path="/register" component={SignUp} />
                <Route exact path="/quiz" component={AllQuizizz} />
                <Route exact path="/documents" component={AllDocuments} />
                <Route exact path="/:course_name" render={(routeProps) => <OneCourseQuizizz {...routeProps} />} />
                <Route exact path="/quiz/:course_name/:id" render={(routeProps) => < Quiz {...routeProps} />} />
                <MutationRoute exact path="/quiz/new" component={AddQuiz} />
                <Route exact path="/quiz/:id/:username/edit" render={(routeProps) => <EditQuiz {...routeProps} />} />
                <Route exact path="/profile/:username" render={(routeProps) => <Profile {...routeProps} />} />
                <Route exact path="/dashbord/:username" render={(routeProps) => <DashbordData {...routeProps} />} />
                <Route exact path="/pdf/:file_name" render={(routeProps) => <Pdf {...routeProps} />} />
            </Switch>
        </div>
    );
}

export default Routes;