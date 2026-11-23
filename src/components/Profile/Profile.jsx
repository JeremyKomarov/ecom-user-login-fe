import { useContext, useEffect, useState } from "react";
import classes from "./Profile.module.css";
import AuthContext from "../context/AuthProvider";
import { getProfile } from "../services/api";
import { Link } from "react-router-dom";

const EMPTY_PROFILE = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
};

function Profile() {
  const { auth } = useContext(AuthContext);

  const [profile, setProfile] = useState(EMPTY_PROFILE);
  const [hasProfile, setHasProfile] = useState(true);

  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const authHeaders = () => ({
    Authorization: "Bearer " + auth,
  });

  const applyProfile = (profile) => {
    setHasProfile(profile.profile != null);
    setProfile(
      profile.profile
        ? { ...EMPTY_PROFILE, ...profile.profile }
        : EMPTY_PROFILE,
    );
  };

  const handleError = (e) => {
    setSuccessMsg("");
    if (!e.response) {
      setErrMsg("No Server Response");
    } else if (e.response.status === 403) {
      setErrMsg("Please log in again");
    } else {
      setErrMsg(e.response.data);
    }
  };

  useEffect(() => {
    if (!auth) return;

    getProfile(authHeaders())
      .then((res) => applyProfile(res.data))
      .catch(handleError);
  }, [auth]);

  if (!auth) {
    return (
      <section className={classes.profile}>
        <h1>Profile</h1>
        <Link to="/login">Please Sign in</Link>
      </section>
    );
  }

  return (
    <section className={classes.profile}>
      <p className={errMsg ? classes.errmsg : "offscreen"}>{errMsg}</p>
      <p className={successMsg ? classes.successmsg : "offscreen"}>
        {successMsg}
      </p>

      <h1>Profile</h1>

      <form>
        <label htmlFor="firstName">First Name:</label>
        <input type="text" id="firstName" value={profile.firstName} />

        <label htmlFor="lastName">Last Name:</label>
        <input type="text" id="lastName" value={profile.lastName} />

        <label htmlFor="email">Email:</label>
        <input type="text" id="email" value={profile.email} />

        <label htmlFor="phone">Phone:</label>
        <input type="text" id="phone" value={profile.phone} />

        <label htmlFor="address">Address:</label>
        <input type="text" id="address" value={profile.address} />

        <button type="submit">{hasProfile ? "Update" : "Create"}</button>

        {hasProfile && <button type="button">Delete</button>}
      </form>
    </section>
  );
}

export default Profile;
