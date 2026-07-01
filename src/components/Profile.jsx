import React from "react";
import EditProfle from "./EditProfle";
import { useSelector } from "react-redux";  

const Profile = () => {
  const user = useSelector((store) => store.user);
  return (
    user && (
      <div>
        <EditProfle user={user} />
      </div>
    )
  );
};

export default Profile;
