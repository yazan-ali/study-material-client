import React, { useState, useContext } from 'react';
import logSvg from "../../img/log.svg";
import AppBar from '../appBar';
import '../styles/register.css';
import { AuthContext } from '../userContext';
import Alert from '@material-ui/lab/Alert';
import { useForm } from '../../util/hooks';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

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
      props.history.push("/quiz");
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
      <AppBar backgroundColor={"#711B7E"} />
      <div className="container">
        <div className="signin">
          <form onSubmit={handleSubmit} className="sign-in-form">
            <h2 className="title">Sign in</h2>
            {Object.keys(errors).length > 0 && (
              <Alert style={{ borderRadius: "10px" }} severity="error">{
                <div className="ui error message">
                  <ul className="list">
                    {Object.values(errors).map(err => (
                      <li key={err}>{err}</li>
                    )
                    )}
                  </ul>
                </div>
              }</Alert>
            )}            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" onChange={handleChange} name="username" value={values.username} placeholder="Username" />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" onChange={handleChange} name="password" value={values.password} placeholder="Password" />
            </div>
            <input type="submit" value="Login" className="regBtn solid" />
          </form>
        </div>
        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>New here ?</h3>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </p>
              <a href="/register" className="" id="sign-up-btn">
                Sign up
            </a>
            </div>
            <img src={logSvg} className="image" alt="" />
          </div>
        </div>
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
      token
      university
      major
      isAdmin
    }
  }
`;

export default Login;