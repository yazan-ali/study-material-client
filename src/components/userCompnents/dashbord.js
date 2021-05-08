import React, { useState, useContext } from 'react';
import '../styles/profile.css';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import App_Bar from '../appBar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Axios from 'axios';
import AuthUserQuizList from '../quizComponents/authUserQuizList';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import { AuthContext } from '../userContext';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        width: "80%",
        margin: "auto",
        [theme.breakpoints.down('sm')]: {
            width: "100%",
        },
    },
    pic: {
        fontSize: 150,
        color: "white"
    },
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        [theme.breakpoints.down('sm')]: {
        },
    },
    appBar: {
        backgroundColor: "#26a0da",
    },
}));


function Dashbord(props) {

    const classes = useStyles();
    const [value, setValue] = useState(0);

    const [user, setUser] = useState(props.userData);

    const handleQuizDelete = (id) => {
        const filterUserQuizizz = user.quizizz.filter(quiz => quiz.id !== id);
        setUser({ ...user, quizizz: filterUserQuizizz });
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="profile-root">
            <div className="profile-card">
                <Container maxWidth="md">
                    <App_Bar backgroundColor={"#26a0da"} />
                    <div className={classes.paper}>
                        <div className="user-card">
                            <div className="profile-pic">
                                <AccountCircleIcon className={classes.pic} />
                            </div>
                            <div className="user-info">
                                <h3>{`${user.first_name}  ${user.last_name}`}</h3>
                                <h3> {user.university}</h3>
                                <h3>{user.major}</h3>
                            </div>
                        </div>
                        <div className={classes.root}>
                            <AppBar className={classes.appBar} position="static">
                                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" indicatorColor="primary">
                                    <Tab label="Quizizz" {...a11yProps(0)} />
                                    <Tab label="Documents" {...a11yProps(1)} />
                                    <Tab label="Send message" {...a11yProps(2)} />
                                </Tabs>
                            </AppBar>
                            <TabPanel value={value} index={0}>
                                {user && (
                                    <div style={{ marginBottom: "15px" }}>
                                        <a className="addQuizBtn" href={`/quiz/new`}>Add New Quiz</a>
                                    </div>
                                )}
                                <AuthUserQuizList quizizz={user.quizizz} user={user} handleQuizDelete={handleQuizDelete} />
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                {/* <AuthUserDocList doc={doc} handleDelete={handleDocDelete} /> */}
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                            </TabPanel>
                        </div>
                    </div>
                </Container>
            </div>
        </div >
    );
}

// const FETCH_USER_QUERY = gql`
//   query($username: String!){
//       getUser(username: $username){
//         id
//         first_name
//         last_name
//         username
//         university
//         major
//         quizizz{
//             id
//             questions{
//                 question
//                 answersOptions{
//                     answerText
//                 }
//                 correctAnswer
//             }
//             course_name
//             quiz_title
//             number_of_questions
//             isOneWay
//             createdBy{
//                 username
//                 id
//             }
//             up_votes
//             down_votes
//             up_votes_counts
//             down_votes_counts
//             participants
//         }
//         # up_voted_quiz:[Quiz!]
//         # down_voted_quiz:[Quiz!]
//       }
//   }
// `

export default Dashbord;