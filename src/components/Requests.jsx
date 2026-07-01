import React, { useEffect } from "react";
import { addRequests } from "../utils/requestSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const getRequests = async () => {
    const res = await axios.get(BASE_URL + "/user/requests/received", {
      withCredentials: true,
    });
    dispatch(addRequests(res.data.data));
  };

  useEffect(() => {
    getRequests();
  }, []);

  const handleReviewRequest = (status, _id) => {
    axios.post(
      BASE_URL + "/request/review/" + status + "/" + _id,
      {},
      { withCredentials: true },
    );
  };

  if (!requests) return;

  if (requests.length === 0) return <h1 className="text-center text-2xl font-bold mt-10">No Request Found</h1>;
  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h1 className="text-2xl font-bold text-center mb-6">Requests</h1>

      {requests.map((request) => {
        const { _id, firstName, lastName, about, photoUrl } =
          request.fromUserId;

        return (
          <div
            key={_id}
            className="card card-side bg-base-300 shadow-md mb-4 p-4 gap-5"
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
            <div className="flex gap-2">
              <button
                className="btn btn-primary"
                onClick={() => handleReviewRequest("rejected", request._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => handleReviewRequest("accepted", request._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
