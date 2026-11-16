import { useRef, useEffect, useState, use } from "react";
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
  const usernameInputRef = useRef();

  const [username, setUsername] = useState("");
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);

  const [pwd, setPwd] = useState("");
  const [isPwdValid, setIsPwdValid] = useState(false);
  const [isPwdFocused, setIsPwdFocused] = useState(false);

  const [confirmPwd, setConfirmPwd] = useState("");
  const [isConfirmPwdValid, setIsConfirmPwdValid] = useState(false);
  const [isConfirmPwdFocused, setIsConfirmPwdFocused] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);

  useEffect(() => {
    usernameInputRef.current?.focus();
  }, []);

  useEffect(() => {
    const isUsernameRegexValid = USER_REGEX.test(username);
    setIsUsernameValid(isUsernameRegexValid);
  }, [username]);

  useEffect(() => {
    const isPwdRegexValid = PWD_REGEX.test(pwd);
    setIsPwdValid(isPwdRegexValid);
    setIsConfirmPwdValid(pwd === confirmPwd);
  }, [pwd, confirmPwd]);

  return (
    <>
      {isSuccess ? (
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
                className={isUsernameValid ? classes.valid : classes.hide}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={
                  isUsernameValid || !username ? classes.hide : classes.invalid
                }
              />
            </label>
            <input
              type="text"
              id="username"
              ref={usernameInputRef}
              autoComplete="off"
              onChange={(e) => setUsername(e.target.value)}
              onFocus={() => {
                setIsUsernameFocused(true);
              }}
              onBlur={() => {
                setIsUsernameFocused(false);
              }}
              value={username}
              required
            />
            <p
              id="uinote"
              className={
                isUsernameFocused && username && !isUsernameValid
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

            <label htmlFor="pwd">
              Password:
              <FontAwesomeIcon
                icon={faCheck}
                className={isPwdValid ? classes.valid : classes.hide}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={isPwdValid || !pwd ? classes.hide : classes.invalid}
              />
            </label>
            <input
              type="password"
              id="pwd"
              onChange={(e) => setPwd(e.target.value)}
              onFocus={() => {
                setIsPwdFocused(true);
              }}
              onBlur={() => {
                setIsPwdFocused(false);
              }}
              value={pwd}
              required
            />
            <p
              id="pwdnote"
              className={
                isPwdFocused && pwd && !isPwdValid
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
                  isConfirmPwdFocused && isConfirmPwdValid && confirmPwd
                    ? classes.valid
                    : classes.hide
                }
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={
                  isConfirmPwdValid || !confirmPwd
                    ? classes.hide
                    : classes.invalid
                }
              />
            </label>
            <input
              type="password"
              id="confirm_pwd"
              onChange={(e) => setConfirmPwd(e.target.value)}
              onFocus={() => {
                setIsConfirmPwdFocused(true);
              }}
              onBlur={() => {
                setIsConfirmPwdFocused(false);
              }}
              value={confirmPwd}
              required
            />
            <p
              id="confirmpwdnote"
              className={
                confirmPwd && !isConfirmPwdValid
                  ? classes.instructions
                  : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Must match the first password input field.
            </p>

            <button
              type="submit"
              disabled={
                !isUsernameValid || isPwdValid || isConfirmPwdValid
                  ? true
                  : false
              }
            >
              Sign up
            </button>
          </form>

          <p>
            Already registered? <br />
            Sign in
          </p>
        </section>
      )}
    </>
  );
}

export default Register;
