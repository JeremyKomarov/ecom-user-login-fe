import { useEffect, useRef, useState } from "react";
import classes from "./Login.module.css";

function Login() {
  const usernameInputRef = useRef();

  const [username, setUsername] = useState("");

  const [pwd, setPwd] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    usernameInputRef.current?.focus();
  }, []);

  return (
    <>
      {isSuccess ? (
        <section>
          <h1>You are logged in!</h1>
          <br />
          <p>Go to Home!</p>
        </section>
      ) : (
        <section>
          <p className={errMsg ? classes.errmsg : "offscreen"}>{errMsg}</p>
          <h1>Sign In</h1>

          <form>
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
