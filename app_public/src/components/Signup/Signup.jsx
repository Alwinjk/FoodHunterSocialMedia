import React, { useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useHistory } from 'react-router';
import { Person, VpnKey, Lock, PersonAdd, MailOutline } from '@material-ui/icons';

import './signup.css';

const SignupApiReq = async (user) => {
  const res = await axios.post('/register', user);
  return res.data;
}

// async function signupUser(credentials) {
//   return fetch('http://localhost:8000/api/register', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(credentials)
//   })
//     .then(data => data.json())
//  }

export default function Signup() {

  const firstname = useRef();
  const lastname = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const history = useHistory();


  const handleSubmit = async e => {
    e.preventDefault();

    // registration post request
    try {
      const res = await SignupApiReq({
        firstname: firstname.current.value,
        lastname: lastname.current.value,
        email: email.current.value,
        password: password.current.value
      });
      console.log("Registration res " + res);
      history.push("/login");
    } catch (err) {
      console.log("Registration error: " + err);
    }
  };

  return (
    <div className="bg-image">
      <section className="login py-5 ">
        <div className="container">
          <div className="col">
            <div className="row">
              <div className="col">
                <div className="col-lg-9 col-md-10  ">
                  <div className="create-img">
                    <h1></h1>
                    <h3> </h3>
                    <h2> </h2>
                  </div>
                </div>
              </div>
              <div className="col-lg-5 col-md-4-py-2 text-center py-5 bg-white rounded ">
                <div className="signin">
                  <PersonAdd color="secondary" fontSize="large" />
                  <h1>CREATE NEW ACCOUNT</h1>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="offset-1 col-lg-10   pt-5">
                      <Person />
                      <input type="text" className="inp px-2" placeholder="First name" ref={firstname} />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="offset-1 col-lg-10  pt-2">
                      <Person />
                      <input type="text" className="inp px-2" placeholder="Last name" ref={lastname} />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="offset-1 col-lg-10  pt-2">
                      <MailOutline />
                      <input type="gmail" className="inp px-2" placeholder="E-mail" ref={email} />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="offset-1 col-lg-10  pt-2">
                      <VpnKey color="action" />
                      <input type="password" className="inp px-2" placeholder="Password" ref={password} />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="offset-1 col-lg-10  pt-2">
                      <VpnKey color="action" />
                      <input type="password" className="inp px-2" placeholder="Confirm password" ref={confirmPassword} />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="offset-1 col-lg-10  pt-2">
                      <button className="btn2">Create new account</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

Signup.prototype = {
  setToken: PropTypes.func.isRequired
}