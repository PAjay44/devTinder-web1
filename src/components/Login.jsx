import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmail] = useState("panidapuajay44@gmail.com");
  const [password, setPassword] = useState("Chowdary@220");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSend = async () => {
    const res = await axios.post(
      BASE_URL + "/login",
      {
        emailId,
        password,
      },
      { withCredentials: true },
      // I am logging with credentials so send cookie to browser,and brow to server to verify token
    );
    dispatch(addUser(res.data));
    navigate("/feed");
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div className="py-2">
            <fieldset className="fieldset my-2">
              <legend className="fieldset-legend">Email ID</legend>
              <input
                type="text"
                className="input"
                value={emailId}
                onChange={handleEmail}
              />
            </fieldset>
            <fieldset className="fieldset my-2">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="text"
                className="input"
                value={password}
                onChange={handlePassword}
              />
            </fieldset>
          </div>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleSend}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
