import React from 'react';
import Quiz from '../components/quizComponents/quiz';
import AllQuizizz from '../components/quizComponents/allQuizizz';
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
import { AuthRoute, MutationRoute } from '../util/AuthRoute';

function Routes() {
    return (
        <div className="App">
            <Switch>
                <Route exact path="https://6097254bedc1db000894f7e8--inspiring-babbage-e50db6.netlify.app/" component={AllPosts} />
                <AuthRoute exact path="https://6097254bedc1db000894f7e8--inspiring-babbage-e50db6.netlify.app/login" component={Login} />
                <AuthRoute exact path="https://6097254bedc1db000894f7e8--inspiring-babbage-e50db6.netlify.app/register" component={SignUp} />
                <Route exact path="https://6097254bedc1db000894f7e8--inspiring-babbage-e50db6.netlify.app/quiz" component={AllQuizizz} />
                <Route exact path="https://6097254bedc1db000894f7e8--inspiring-babbage-e50db6.netlify.app/:course_name" render={(routeProps) => <OneCourseQuizizz {...routeProps} />} />
                <Route exact path="https://6097254bedc1db000894f7e8--inspiring-babbage-e50db6.netlify.app/quiz/:course_name/:id" render={(routeProps) => < Quiz {...routeProps} />} />
                <MutationRoute exact path="https://6097254bedc1db000894f7e8--inspiring-babbage-e50db6.netlify.app/quiz/new" component={AddQuiz} />
                <Route exact path="https://6097254bedc1db000894f7e8--inspiring-babbage-e50db6.netlify.app/quiz/:id/:username/edit" render={(routeProps) => <EditQuiz {...routeProps} />} />
                <Route exact path="https://6097254bedc1db000894f7e8--inspiring-babbage-e50db6.netlify.app/profile/:username" render={(routeProps) => <Profile {...routeProps} />} />
                <Route exact path="https://6097254bedc1db000894f7e8--inspiring-babbage-e50db6.netlify.app/dashbord/:username" render={(routeProps) => <DashbordData {...routeProps} />} />
            </Switch>
        </div>
    );
}

export default Routes;