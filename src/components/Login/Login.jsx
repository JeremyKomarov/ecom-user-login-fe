import { useEffect, useRef, useState } from "react";
import classes from "./Login.module.css";

function Login() {
  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  return (
    <>
      {success ? (
        <section>
          <h1>You are logged in!</h1>
          <br />
          Go to home
        </section>
      ) : (
        <section>
          <p ref={errRef} className={errMsg ? classes.error_mes : "offscreen"}>
            {errMsg}
          </p>
          <h1>Sign In</h1>
          <form>
            <label htmlFor="username">User Name:</label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="passwsord"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
            <button type="submit" disabled={!username || !pwd}>
              Sign In
            </button>
          </form>
          <p>
            Need an account? <br />
            Sign Up
          </p>
        </section>
      )}
    </>
  );
}

export default Login;
