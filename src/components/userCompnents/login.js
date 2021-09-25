import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '../appBar';
import '../styles/register.css';
import { AuthContext } from '../userContext';
import Alert from '@material-ui/lab/Alert';
import { useForm } from '../../util/hooks';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { fade, withStyles } from '@material-ui/core/styles';
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
    border: "2px solid  gray",
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

function Login(props) {

  const [errors, setErrors] = useState("");
  const context = useContext(AuthContext);

  const { handleChange, handleSubmit, values } = useForm(login, {
    username: "",
    password: ""
  });

  const [loginUser] = useMutation(LOGIN_USER, {
    update(_, result) {
      context.login(result.data.login);
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values
  });

  function login() {
    loginUser();
  }

  return (
    <>
      <AppBar backgroundColor={"#4A156B"} />
      <div className="container">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
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
              Username *
            </InputLabel>
            <BootstrapInput
              onChange={handleChange}
              value={values.username}
              name="username"
              id="bootstrap-input"
              required
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
              required
            />
          </FormControl>
          <div className="btns">
            <button type="submit" className="register-btn">Login</button>
            <Link to="/register">Create an account</Link>
          </div>
        </form>
      </div >
    </>
  );
}

const LOGIN_USER = gql`
  mutation login(
    $username: String!
    $password: String!
  ) {
    login(
        username: $username
        password: $password
    ) {
      id
      first_name
      last_name
      username
      image
      token
      university
      major
      isAdmin
    }
  }
`;

export default Login;