import React, { useState } from "react";
import useAxios from "axios-hooks";
import Navbar from "../layouts/Navbar";

//Global Token
var accessTokenObj = localStorage.getItem("token");

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [modal, setModal] = useState(false);
  const popUp = () => {
    setModal(!modal);
  };
  const [
    { data, loading, error },
    //  refetch
  ] = useAxios({
    method: "get",
    url: "http://localhost:8000/userData",
    headers: {
      "Content-Type": "application/json",
      token: accessTokenObj,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return window.location.replace("/login");
  if (data) {
    // console.log(data);
    if (profile === null) {
      setProfile({ ...data });
    }
  }

  const submitName = (e) => {
    e.preventDefault();
    console.log("hello");
    fetch("http://localhost:8000/update_name", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: accessTokenObj,
      },
      body: JSON.stringify({
        newName: profile.user_name,
      }),
    })
      .then((res) => res.json())
      .then((res) => console.log(res.string));
  };
  return (
    <React.Fragment>
      <Navbar />
      {/* <div
        className={
          modal
            ? " fixed mx-auto z-50  sm:w-2/5 bg-gray-900  rounded-lg p-6"
            : "hidden"
        }
      >
        <form onSubmit={submitName}>
          <label className="mb-6 text-white">Name</label>
          <input
            className="rounded py-1 px-1 block mb-2 w-full sm:w-full"
            // type="text"
            // name="name"change profile picture in react js
            value={profile ? profile.user_name : ""}
            // ref={register({ required: true, minLength: 5 })}
            name="name"
            type="text"
            onChange={(e) =>
              setProfile({
                ...profile,
                user_name: e.target.value,
              })
            }
          />
          <input
            type="submit"
            value="Submit"
            className="mr-2 mt-5 cursor-pointer bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          />
        </form>
      </div> */}

      <div
        style={{ backgroundColor: "rgba(0,0,0,0.4" }}
        className={
          modal
            ? "fixed z-50 pt-64  top-0 left-0  w-full h-full overflow-auto"
            : "hidden"
        }
      >
        <div className="bg-white mx-auto pb-12 w-4/5 sm:w-3/6 px-6 rounded-md">
          <h1 className="py-5">Edit your name</h1>
          <form onSubmit={submitName}>
            <label className="mb-6 text-white">Name</label>
            <input
              className="rounded bg-gray-600 focus:outline-none py-1 px-1 block mb-2 w-full sm:w-full"
              // type="text"
              // name="name"change profile picture in react js
              value={profile ? profile.user_name : ""}
              // ref={register({ required: true, minLength: 5 })}
              name="name"
              type="text"
              onChange={(e) =>
                setProfile({
                  ...profile,
                  user_name: e.target.value,
                })
              }
            />
            <input
              type="submit"
              value="Submit"
              className="mr-2 mt-5 cursor-pointer bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            />
            <input
              onClick={popUp}
              type="button"
              value="Cancel"
              className="mr-2 mt-5 cursor-pointer bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            />
          </form>
        </div>
      </div>

      <div className="  mx-auto  px-4 py-12  max-w-screen-lg sm:px-2">
        <div className=" pb-7/5 bg-black rounded-lg max-w-screen-lg w-full">
          <img
            className="  inset-0 sm:h-auto object-cover rounded-lg  "
            src="/img/cover.jpg"
          />
        </div>
        <div className="px-4 -mt-12 sm:-mt-32  py-4  ">
          <div className="blur h-64 bg-white rounded-lg px-4 py-3 shadow-lg h-48 sm:h-auto">
            <img
              className=" md:-mt-20  sm:mx-auto h-24 w-24 -mt-16 md:h-32 md:w-32 rounded-full   "
              // src="/img/01-shutterstock_476340928-Irina-Bg.jpg"
              src={profile ? profile.user_profile : ""}
            />
            <div
              onClick={popUp}
              className="cursor-pointer mt-2 flex  text-xl font-bold text-blue-600 text-gray-600"
            >
              <span className="ml-2 sm:mx-auto ">
                {profile ? profile.user_name : ""}
              </span>
            </div>
            <div className="text-blue-600 sm:font-medium sm:text-xl flex sm:justify-center mt-2 sm:mt-2">
              <div>
                <span>Like</span>
                <h1>120</h1>
              </div>
              <div className="pl-12">
                <span>Score</span>
                <h1>120</h1>
              </div>
              <div className="pl-10">
                <span>Game</span>
                <h1>120</h1>
              </div>
            </div>
            {/* Popup */}

            <div className=" mt-16">
              <div className="mb-4 flex -mt-12 sm:justify-center cursor-pointer hover:bg-gray-200 rounded-md ">
                <svg
                  className="fill-current text-gray-700 svg-icon h-8 w-8"
                  viewBox="0 0 20 20"
                >
                  <path d="M17.388,4.751H2.613c-0.213,0-0.389,0.175-0.389,0.389v9.72c0,0.216,0.175,0.389,0.389,0.389h14.775c0.214,0,0.389-0.173,0.389-0.389v-9.72C17.776,4.926,17.602,4.751,17.388,4.751 M16.448,5.53L10,11.984L3.552,5.53H16.448zM3.002,6.081l3.921,3.925l-3.921,3.925V6.081z M3.56,14.471l3.914-3.916l2.253,2.253c0.153,0.153,0.395,0.153,0.548,0l2.253-2.253l3.913,3.916H3.56z M16.999,13.931l-3.921-3.925l3.921-3.925V13.931z"></path>
                </svg>
                <span className="text-gray-700 text-lg font-semibold">
                  {profile ? profile.user_email : ""}
                </span>
              </div>
              <div className="flex mt-1 sm:justify-center cursor-pointer hover:bg-gray-200 rounded-md ">
                <svg
                  className="text-gray-700 fill-current svg-icon h-8 w-8"
                  viewBox="0 0 20 20"
                >
                  <path d="M13.372,1.781H6.628c-0.696,0-1.265,0.569-1.265,1.265v13.91c0,0.695,0.569,1.265,1.265,1.265h6.744c0.695,0,1.265-0.569,1.265-1.265V3.045C14.637,2.35,14.067,1.781,13.372,1.781 M13.794,16.955c0,0.228-0.194,0.421-0.422,0.421H6.628c-0.228,0-0.421-0.193-0.421-0.421v-0.843h7.587V16.955z M13.794,15.269H6.207V4.731h7.587V15.269z M13.794,3.888H6.207V3.045c0-0.228,0.194-0.421,0.421-0.421h6.744c0.228,0,0.422,0.194,0.422,0.421V3.888z"></path>
                </svg>
                <span className="text-gray-700 text-lg font-semibold">
                  {profile ? profile.phone_number : ""}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Profile;
