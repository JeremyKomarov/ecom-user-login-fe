import React, { useEffect, useRef, useState } from "react";
import classes from "./Register.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function Register() {
  const userRef = useRef();

  const [username, setUsername] = useState("");
  const [isValidUsername, setIsValidUsername] = useState(false);
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);

  const [pwd, setPwd] = useState("");
  const [isValidPwd, setIsValidPwd] = useState(false);
  const [isPwdFocused, setIsPwdFocused] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [isValidMatchPwd, setIsValidMatchPwd] = useState(false);
  const [isMatchPwdFocused, setIsMatchPwdFocused] = useState(false);

  const [errMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    const isUsernameValid = USER_REGEX.test(username);
    setIsValidUsername(isUsernameValid);
  }, [username]);

  useEffect(() => {
    const isPwdValid = PWD_REGEX.test(pwd);

    setIsValidPwd(isPwdValid);
    setIsValidMatchPwd(pwd === matchPwd);
  }, [pwd, matchPwd]);

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>Sign In</p>
        </section>
      ) : (
        <section>
          <p className={errMsg ? classes.errmsg : "offscreen"}>{errMsg}</p>
          <h1>Register</h1>
          <form>
            <label htmlFor="username">
              Username:
              <FontAwesomeIcon
                icon={faCheck}
                className={isValidUsername ? classes.valid : classes.hide}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={
                  isValidUsername || !username ? classes.hide : classes.invalid
                }
              />
            </label>
            <input
              type="text"
              id="username"
              ref={userRef}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              onFocus={() => setIsUsernameFocused(true)}
              onBlur={() => setIsUsernameFocused(false)}
              autoComplete="off"
              required
              value={username}
            />
            <p
              id="uinote"
              className={
                isUsernameFocused && username && !isValidUsername
                  ? classes.instructions
                  : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              4 to 24 characters.
              <br />
              Must begin with a letter.
              <br />
              Letters, numbers, underscores, hyphens allowed.
            </p>

            <label htmlFor="password">
              Password:
              <FontAwesomeIcon
                icon={faCheck}
                className={isValidPwd ? classes.valid : classes.hide}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={isValidPwd || !pwd ? classes.hide : classes.invalid}
              />
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => {
                setPwd(e.target.value);
              }}
              onFocus={() => setIsPwdFocused(true)}
              onBlur={() => setIsPwdFocused(false)}
              value={pwd}
              required
            />

            <p
              id="pwdnote"
              className={
                isPwdFocused && pwd && !isValidPwd
                  ? classes.instructions
                  : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number and a
              special character.
              <br />
              Allowed special characters: <span>!</span>
              <span aria-label="at symbol">@</span> <span>#</span>
              <span>$</span> <span>%</span>
            </p>

            <label htmlFor="confirm_pwd">
              Confirm Password:
              <FontAwesomeIcon
                icon={faCheck}
                className={
                  matchPwd && isValidMatchPwd ? classes.valid : classes.hide
                }
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={
                  isValidMatchPwd || !matchPwd ? classes.hide : classes.invalid
                }
              />
            </label>
            <input
              type="password"
              id="confirm_pwd"
              onChange={(e) => {
                setMatchPwd(e.target.value);
              }}
              onFocus={() => setIsMatchPwdFocused(true)}
              onBlur={() => setIsMatchPwdFocused(false)}
              value={matchPwd}
              required
            />

            <p
              id="confirmnote"
              className={
                isMatchPwdFocused && matchPwd && !isValidMatchPwd
                  ? classes.instructions
                  : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Must match the first password input field.
            </p>

            <button
              disabled={
                !isValidUsername || !isValidPwd || !isValidMatchPwd
                  ? true
                  : false
              }
            >
              Sign up
            </button>
          </form>
          <p>
            Already registered? <br />
            Sign In
          </p>
        </section>
      )}
    </>
  );
}

export default Register;
