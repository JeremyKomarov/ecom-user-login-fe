import { useContext, useEffect, useRef, useState } from "react";
import classes from "./Login.module.css";
import { authenticate } from "../services/api";
import AuthContext from "../context/AuthProvider";
import { Link } from "react-router-dom";

function Login() {
  const usernameInputRef = useRef();
  const errMsElRef = useRef();
  const { auth, setAuth } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");

  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userBody = {
      username: username,
      password: pwd,
    };

    try {
      const res = await authenticate(userBody);
      setAuth(res.data.jwt);

      setUsername("");
      setPwd("");
    } catch (e) {
      if (!e.response) {
        setErrMsg("No Server Response");
      } else if (e.response.status == 403) {
        setErrMsg(e.response.data);
      } else {
        setErrMsg("Login Failed");
      }
      errMsElRef.current.focus();
    }
  };

  useEffect(() => {
    usernameInputRef.current?.focus();
  }, []);

  return (
    <>
      {auth ? (
        <section>
          <h1>You are logged in!</h1>
          <br />
          <Link to="/">Go to Home!</Link>
        </section>
      ) : (
        <section>
          <p ref={errMsElRef} className={errMsg ? classes.errmsg : "offscreen"}>
            {errMsg}
          </p>
          <h1>Sign In</h1>

          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              ref={usernameInputRef}
              autoComplete="off"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
            />

            <label htmlFor="pwd">Password:</label>
            <input
              type="password"
              id="pwd"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />

            <button type="submit" disabled={!username || !pwd ? true : false}>
              Sign In
            </button>
          </form>

          <p>
            Need an Account? <br />
            Sign Up
          </p>
        </section>
      )}
    </>
  );
}

export default Login;
