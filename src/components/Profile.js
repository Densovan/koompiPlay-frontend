import React from "react";

const Profile = () => {
  return (
    <React.Fragment>
      <div className=" flex  items-center justify-center h-screen">
        <div className=" w-full max-w-screen-md">
          <div className="overflow-hidden bg-white shadow-md rounded  ">
            <img src="/img/cover.jpg" />
            <div className=" ">
              <img
                className="overflow-hidden -mt-16 md:ml-12 h-20 w-20 md:h-32 md:w-32 rounded-full mx-auto md:mx-0 "
                src="/img/01-shutterstock_476340928-Irina-Bg.jpg"
              />
              <div className="flex justify-end mb-2 -mt-12 mr-2">
                <button className="bg-no-repeat border-blue-500 border-2 px-3 py-2 rounded-full hover:bg-blue-200 text-blue-300">
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Profile;
