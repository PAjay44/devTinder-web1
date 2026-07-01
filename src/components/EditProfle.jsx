import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import UserCard from "./UserCard";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfle = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [about, setAbout] = useState(user.about);
  const [showToast, setShowToast] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const handleEditProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, gender, photoUrl, about },
        { withCredentials: true },
      );
      dispatch(addUser(res.data.data));
      setShowToast(true);
      setTimeout(() => {
          setShowToast(false)
      },3000)
      setSuccessMsg(res.data.message);
    } catch (err) {
      setError(err?.response?.data?.data);
    }
  };

  return (
    <>
      <div className="flex justify-center py-5 pb-20">
        <div className="flex justify-center  mx-10">
          <div className="card card-border bg-base-300 w-96">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <div className="py-2">
                <fieldset className="fieldset my-2">
                  <legend className="fieldset-legend">first Name</legend>
                  <input
                    type="text"
                    className="input"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset my-2">
                  <legend className="fieldset-legend">last Name</legend>
                  <input
                    type="text"
                    className="input"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>

                <fieldset className="fieldset my-2">
                  <legend className="fieldset-legend">photoUrl</legend>
                  <input
                    type="text"
                    className="input"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </fieldset>

                <fieldset className="fieldset my-2">
                  <legend className="fieldset-legend">gender</legend>
                  <input
                    type="text"
                    className="input"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  />
                </fieldset>

                <fieldset className="fieldset my-2">
                  <legend className="fieldset-legend">age</legend>
                  <input
                    type="text"
                    className="input"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </fieldset>

                <fieldset className="fieldset my-2">
                  <legend className="fieldset-legend">about</legend>
                  <input
                    type="text"
                    className="input"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </fieldset>
              </div>
              <p className="text-red-500">{error}</p>
              <div className="card-actions justify-center">
                <button className="btn btn-primary" onClick={handleEditProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard
          user={{ firstName, lastName, gender, age, photoUrl, about }}
        />

        {/* {showToast && (
          <div className="toast toast-top toast-end">
            <div className="alert alert-success">
              <span>{successMsg}</span>
            </div>
          </div>
        )} */}

        {showToast && (
          <div className="fixed top-5 right-5 z-[9999] bg-green-600 text-white p-4 rounded">
            {successMsg}
          </div>
        )}
      </div>
    </>
  );
};

export default EditProfle;
