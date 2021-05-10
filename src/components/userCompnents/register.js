import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '../appBar';
import '../styles/register.css';
import { AuthContext } from '../userContext';
import Alert from '@material-ui/lab/Alert';
import { useForm } from '../../util/hooks';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { fade, withStyles, makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    border: "2px solid gray",
    position: 'relative',
    backgroundColor: theme.palette.common.white,
    fontSize: 16,
    width: '400px',
    [theme.breakpoints.down('md')]: {
      width: "300px",
    },
    padding: '10px 12px',
    marginBottom: 15,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: "#5F2384",
    },
  },
}))(InputBase);


function Register(props) {

  const [errors, setErrors] = useState("");
  const context = useContext(AuthContext);

  const initialState = {
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    university: "",
    major: "",
    isAdmin: false
  }

  const { handleChange, handleSubmit, values } = useForm(registerUser, initialState);

  const [addUser] = useMutation(REGISTER_USER, {
    update(_, result) {
      context.login(result.data.register);
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values
  });

  function registerUser() {
    addUser();
  }

  return (
    <>
      <AppBar backgroundColor={"#4A156B"} />
      <div className="container">
        <form onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          {Object.keys(errors).length > 0 && (
            <Alert style={{ borderRadius: "10px", width: "100%", marginBottom: 10 }} severity="error">{
              <div>
                <ul>
                  {Object.values(errors).map(err => (
                    <li key={err}>{err}</li>
                  )
                  )}
                </ul>
              </div>
            }</Alert>
          )}
          <FormControl>
            <InputLabel style={{ color: " gray", fontWeight: 600 }} shrink htmlFor="bootstrap-input">
              First Name *
            </InputLabel>
            <BootstrapInput
              onChange={handleChange}
              value={values.first_name}
              name="first_name"
              id="bootstrap-input"
            />
          </FormControl>
          <FormControl>
            <InputLabel style={{ color: " gray", fontWeight: 600 }} shrink htmlFor="bootstrap-input">
              Last Name *
            </InputLabel>
            <BootstrapInput
              onChange={handleChange}
              value={values.last_name}
              name="last_name"
              id="bootstrap-input"
            />
          </FormControl>
          <FormControl>
            <InputLabel style={{ color: " gray", fontWeight: 600 }} shrink htmlFor="bootstrap-input">
              Username *
            </InputLabel>
            <BootstrapInput
              onChange={handleChange}
              value={values.username}
              name="username"
              id="bootstrap-input"
            />
          </FormControl>
          <FormControl>
            <InputLabel style={{ color: " gray", fontWeight: 600 }} shrink htmlFor="bootstrap-input">
              Password *
            </InputLabel>
            <BootstrapInput
              onChange={handleChange}
              value={values.password}
              name="password"
              id="bootstrap-input"
              type="password"
            />
          </FormControl>
          <FormControl>
            <InputLabel style={{ color: " gray", fontWeight: 600 }} shrink htmlFor="bootstrap-input">
              University
            </InputLabel>
            <BootstrapInput
              onChange={handleChange}
              value={values.university}
              name="university"
              id="bootstrap-input"
            />
          </FormControl>
          <FormControl>
            <InputLabel style={{ color: " gray", fontWeight: 600 }} shrink htmlFor="bootstrap-input">
              Major
            </InputLabel>
            <BootstrapInput
              onChange={handleChange}
              value={values.major}
              name="major"
              id="bootstrap-input"
            />
          </FormControl>
          <div className="btns">
            <button type="submit" className="register-btn">Sign up</button>
            <Link to="/login">Already have an account ?</Link>
          </div>
        </form>
      </div>
    </>
  );
}

const REGISTER_USER = gql`
  mutation register(
    $first_name: String!
    $last_name: String!
    $username: String!
    $password: String!
    $university: String
    $major: String
    $isAdmin: Boolean!
  ) {
    register(
      registerInput: {
        first_name: $first_name
        last_name: $last_name
        username: $username
        password: $password
        university: $university
        major: $major
        isAdmin: $isAdmin
      }
    ) {
      id
      first_name
      last_name
      username
      university
      major
      isAdmin
      token
    }
  }
`;

export default Register;