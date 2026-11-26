import { useContext, useEffect, useState } from "react";
import classes from "./Profile.module.css";
import AuthContext from "../context/AuthProvider";
import {
  createProfile,
  deleteProfile,
  getProfile,
  updateProfile,
} from "../services/api";
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

  const [username, setUsername] = useState("");
  const [roles, setRoles] = useState("");
  const [profile, setProfile] = useState(EMPTY_PROFILE);
  const [hasProfile, setHasProfile] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const authHeaders = () => ({
    Authorization: "Bearer " + auth,
  });

  const applyProfile = (profile) => {
    setUsername(profile.username);
    setRoles(profile.roles);
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

  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setProfile({ ...profile, [key]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const profileBody = {
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      phone: profile.phone,
      address: profile.address,
    };

    try {
      const res = hasProfile
        ? await updateProfile(profileBody, authHeaders())
        : await createProfile(profileBody, authHeaders());

      applyProfile(res.data);
      setErrMsg("");
      setSuccessMsg(hasProfile ? "Details updated" : "Details Created");
    } catch (e) {
      handleError(e);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProfile(authHeaders());

      setHasProfile(false);
      setProfile(EMPTY_PROFILE);
      setErrMsg("");
      setSuccessMsg("Details deleted");
    } catch (e) {
      handleError(e);
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
      <p>
        {username} ({roles})
      </p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          onChange={handleChange}
          value={profile.firstName}
        />

        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          onChange={handleChange}
          value={profile.lastName}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          onChange={handleChange}
          value={profile.email}
        />

        <label htmlFor="phone">Phone:</label>
        <input
          type="text"
          id="phone"
          name="phone"
          onChange={handleChange}
          value={profile.phone}
        />

        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          onChange={handleChange}
          value={profile.address}
        />

        <button type="submit">{hasProfile ? "Update" : "Create"}</button>

        {hasProfile && (
          <button type="button" onClick={handleDelete}>
            Delete
          </button>
        )}
      </form>
    </section>
  );
}

export default Profile;
