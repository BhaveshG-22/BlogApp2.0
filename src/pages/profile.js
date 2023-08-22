import React, { useEffect, useState } from "react";
import { getUserData } from "../helpers/getUsername";

export const Profile = () => {
  const [data, setData] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      let resp = await getUserData();
      setData(resp);
    };

    fetchData();
  }, []);
  console.log(data);
  return !data ? (
    <h1>Loading...</h1>
  ) : (
    <div
      className="page-content page-container align-items-center mt-5 "
      id="page-content"
    >
      <div className="padding">
        <div className="row container d-flex justify-content-center">
          <div className="col-xl-6 col-md-12">
            <h1 className="mb-3">Hello {data.name}!</h1>
            <div className="card user-card-full">
              <div className="row m-l-0 m-r-0">
                <div className="col-sm-4 bg-c-lite-green user-profile">
                  <div className="card-block text-center text-white">
                    <div className="m-b-25">
                      <img
                        src="https://img.icons8.com/bubbles/100/000000/user.png"
                        className="img-radius"
                        alt="User-Profile-Image"
                      />
                    </div>
                    <br />
                  </div>
                </div>
                <div className="col-sm-8">
                  <div className="card-block">
                    <div className="row ">
                      <div className="col-sm-6">
                        <h6 className="text-muted f-w-400 ml-3">
                          Email: {data.username}
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
