import React, { useContext, useEffect } from "react";
import { testApiRoute1 } from "../services/api";
import AuthContext from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (!auth) return;

    const params = {
      Authorization: "Bearer " + auth,
    };

    testApiRoute1(params).then((res) => {
      console.log(res);
    });
  }, []);

  return <h1>Profile</h1>;
}

export default Profile;
