import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const getConnections = async () => {
    const res = await axios.get(BASE_URL + "/user/connections", {
      withCredentials: true,
    });
    dispatch(addConnections(res.data.data));
  };

  useEffect(() => {
    getConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0) return <h1>No Connection Found</h1>;

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h1 className="text-2xl font-bold text-center mb-6">Connections</h1>

      {connections.map((connection) => {
        const { _id, firstName, lastName, about, photoUrl } = connection;

        return (
          <div
            key={_id}
            className="card card-side bg-base-300 shadow-md mb-4 p-4"
          >
            <div className="flex-shrink-0">
              <img
                src={photoUrl}
                alt={firstName}
                className="w-24 h-24 rounded-lg object-cover"
              />
            </div>

            <div className="card-body py-0">
              <h2 className="card-title">
                {firstName} {lastName}
              </h2>
              <p>{about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
