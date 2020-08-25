import React from "react";
import "./Login.css";
import { Button } from "@material-ui/core";
import { Authentication, provider } from "../firebase";
import GitHubIcon from "@material-ui/icons/GitHub";

//For Context APi
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";

function Login() {
  const [state, dispatch] = useStateValue();

  const signIn = (e) => {
    Authentication.signInWithPopup(provider)
      .then((result) => {
        console.log(result);
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://cdn.svgporn.com/logos/slack-icon.svg"
          alt="slack logo"
        ></img>

        <h2>Welcome to Slack Clone</h2>

        <Button onClick={signIn}>Sign In With Google</Button>

        <div className="footer text-center">
          <a className="" href="https://github.com/robin025">
            <GitHubIcon className="github__logo" />
          </a>
          <h3>Made My Robin Singh | 2020</h3>
          <p>
            <strong>Made Using React</strong>
          </p>
          <p>
            I do not own Slack brand & logo, this web app clone was created only
            to learn & show my skills in creating web applications and will
            never be used for commercial purposes.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
