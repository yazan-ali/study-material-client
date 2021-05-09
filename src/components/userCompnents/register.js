import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import signUpSvg from "../../img/signup.svg";
import AppBar from '../appBar';
import '../styles/register.css';
import { AuthContext } from '../userContext';
import Alert from '@material-ui/lab/Alert';
import { useForm } from '../../util/hooks';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';


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
    isAdmin: false,
  }

  const { handleChange, handleSubmit, values } = useForm(registerUser, initialState);

  const [addUser] = useMutation(REGISTER_USER, {
    update(_, result) {
      context.login(result.data.login);
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
      <AppBar backgroundColor={"#711B7E"} />
      <div className="container">
        <div className="signup">
          <form onSubmit={handleSubmit} className="sign-up-form">
            <h2 className="title">Sign up</h2>
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
            )}
            <div className="input-field">
              <i className="fas fa-dice-one"></i>
              <input type="text" onChange={handleChange} name="first_name" value={values.first_name} placeholder="* First name" />
            </div>
            <div className="input-field">
              <i className="fas fa-dice-two"></i>
              <input type="text" onChange={handleChange} name="last_name" value={values.last_name} placeholder="* Last name" />
            </div>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" onChange={handleChange} name="username" value={values.username} placeholder="* Username" />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" onChange={handleChange} name="password" value={values.password} placeholder="* Password" />
            </div>
            <div className="input-field">
              <i className="fas fa-graduation-cap"></i>
              <input type="text" onChange={handleChange} name="university" value={values.university} placeholder="University name" />
            </div>
            <div className="input-field">
              <i className="fas fa-book-reader"></i>
              <input type="text" onChange={handleChange} name="major" value={values.major} placeholder="Major" />
            </div>
            <input type="submit" className="regBtn" value="Sign up" />
          </form>
        </div>

        <div className="panels-container">
          <div className="panel signup-left-panel">
            <div className="content">
              <h3>already have an account ?</h3>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </p>
              <Link to="/login" className="regBtn transparent" id="sign-up-btn">
                Sign in
            </Link>
            </div>
            <img src={signUpSvg} className="image" alt="" />
          </div>
        </div>
      </div >
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