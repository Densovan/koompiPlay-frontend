import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import uuid from "uuid/v1";
import jwt from "jsonwebtoken";
import axios from "axios";
import useAxios from "axios-hooks";
import Navbar from "../layouts/Navbar";

var accessTokenObj = localStorage.getItem("token");

const getUser = () => [{ user_name: "", phone_number: "", user_email: " " }];

function UserInfo() {
  const [profile, setProfile] = useState(null);
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("Choose file");
  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);
  // const onChangeimage = (e) => {
  //   setFile(e.target.files[0]);
  //   setFile(e.target.files[0].name);
  // };
  const { register, handleSubmit, errors } = useForm();
  const handleImageUpload = (e) => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };
  const onSubmitImage = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
  };

  const onChange = (e) => {
    // setProfile({ ...profile, [e.target.name]: e.target.value });
    const target = e.target;
    const value = target.value;
    const name = target.value;
    setProfile({
      [name]: value,
    });
    // console.log(profile);
  };
  const [modal, setModal] = useState(false);
  const popUp = () => {
    setModal(!modal);
  };
  const [buttonUpload, setButtonupload] = useState(false);
  const showButtonUplaod = () => {
    setButtonupload(!buttonUpload);
  };

  const onClose = () => {
    setModal(false);
  };
  // const changeName = (name) => {
  //   setProfile([...profile, { name, id: uuid() }]);
  // };
  const onSubmit = (e) => {
    e.preventDefault();
    const data = profile;
  };
  const cancle = (e) => {
    setModal(false);
    // profile();
    // setProfile({
    // name: "Chhim Chany",
    // email: "chhimchany@gmail.com",
    // phone: "086280018",
    // });
  };

  // const getProfile = () => {
  //   // axios.get("http://localhost:8000/userData2").then((response) => {
  //   //   console.log(response.data);
  //   // });
  //   fetch("http://localhost:8000/userData2", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Host: "localhost:8000",
  //       token: accessTokenObj,
  //     },
  //     body: JSON.stringify({
  //       user_name: data.Username,
  //       user_gender: data.gender,
  //       user_email: data.Email,
  //       user_password: data.Password,
  //       phone_number: data.Phone,
  //     }),
  //   })
  //     .then((res) => res.text())
  //     .then((data) => {
  //       // alert(data);
  //       console.log(data);
  //     });
  // };
  // useEffect(() => {
  //   // getProfile();
  //   console.log(profile);
  // });

  const [
    { data, loading, error },
    //  refetch
  ] = useAxios({
    method: "get",
    url: "http://localhost:8000/userData2",
    headers: {
      "Content-Type": "application/json",
      token: accessTokenObj,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;
  if (data) {
    if (profile === null) {
      setProfile({ ...data });
    }
  }

  return (
    <div>
      {/* <button onClick={refetch}>refetch</button>
      <pre>
        <input type="text" value={profile ? profile.user_email : ""} />
      </pre>
      <div>{profile ? profile.user_email : ""}</div> */}
      <Navbar />

      <div className=" flex  items-center justify-center h-screen">
        <div className=" w-full max-w-screen-md">
          <div className="overflow-hidden bg-white shadow-md rounded  ">
            <form>
              <img src="/img/cover.jpg" />
              <div className="px-6 sm:px-3 ">
                <img
                  className="overflow-hidden -mt-12 sm:-mt-16  h-20 w-20 md:h-32 md:w-32 rounded-full  md:mx-0 "
                  // src="/img/01-shutterstock_476340928-Irina-Bg.jpg"
                  src={profile ? profile.user_profile : ""}
                />
                <h1 className="mt-2 ml-1 sm:ml-6 text-blue-800 text-xl font-medium">
                  {profile ? profile.user_name : ""}
                </h1>
                <div className="flex justify-end mb-2 -mt-16 sm:-mt-20 mr-2">
                  <input
                    type="button"
                    value="Edit Profile"
                    onClick={popUp}
                    className="bg-no-repeat border-blue-500 border-2 px-3 py-2 bg-blue-400 rounded-full hover:bg-blue-200 text-white cursor-pointer"
                  />

                  {/* </input> */}
                </div>
              </div>
              {/* Popup */}

              <div>
                <div
                  className={
                    modal
                      ? "fixed overflow-hidden z-40 -mt-32 items-center justify-center bg-gray-400  rounded-lg p-6"
                      : "hidden"
                  }
                >
                  <h1 className="block mb-5 text-white">Edit Your Profile</h1>
                  <label className="text-white">Name</label>
                  <input
                    className="rounded py-1 px-1 block mb-2"
                    // type="text"
                    // name="name"change profile picture in react js
                    value={profile ? profile.user_name : ""}
                    ref={register({ required: true, minLength: 5 })}
                    name="name"
                    type="text"
                    onChange={onChange}
                  />
                  <label className="text-white">Name</label>
                  <input
                    className="rounded py-1 px-1 block mb-2"
                    // type="text"
                    // name="name"change profile picture in react js
                    value={profile ? profile.user_email : ""}
                    ref={register({ required: true, minLength: 5 })}
                    name="name"
                    type="email"
                    onChange={onChange}
                  />
                  <label className="text-white">Name</label>
                  <input
                    className="rounded py-1 px-1 block mb-2"
                    // type="text"
                    // name="name"change profile picture in react js
                    value={profile ? profile.phone_number : ""}
                    ref={register({ required: true, minLength: 5 })}
                    name="name"
                    type="text"
                    onChange={onChange}
                  />
                  <input
                    onClick={onClose}
                    className={errors.name ? "block" : "hidden"}
                    type="submit"
                    className="mr-2 mt-5 bg-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  />

                  <input
                    type="button"
                    value="Cancel"
                    onClick={cancle}
                    className="mr-2 mt-5 hover:bg-red-700 text-white bg-no-repeat font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  />
                </div>
              </div>

              <div className="ml-6 mt-12 ">
                <div className=" px-3 mb-3 ">
                  <span className="text-xs ">Email</span>
                  <h1
                    // onClick={popUp}
                    className="-mb-2 font-xl text-lg   "
                  >
                    {profile ? profile.user_email : ""}
                  </h1>
                </div>
                <div className=" px-3 mb-10">
                  <span className="text-xs ">Phone</span>
                  <h1
                    // onClick={popUp}
                    className="-mb-2 font-xl text-lg   "
                  >
                    {profile ? profile.phone_number : ""}
                  </h1>
                </div>
              </div>

              {/* <div>
                <div
                  className={
                    modal
                      ? "block fixed -mt-32 items-center justify-center bg-gray-400 rounded-lg p-6"
                      : "hidden"
                  }
                >
                  <h1 className="block mb-5 text-white">Edit Your Profile</h1>
                  <label className="text-white">Name</label>
                  <input
                    className="rounded py-1 px-1 block mb-2"
                    // type="text"
                    // name="name"change profile picture in react js
                    value={profile ? profile.user_name : ""}
                    ref={register({ required: true, minLength: 5 })}
                    name="name"
                    type="text"
                    onChange={onChange}
                  />
                  <label className="text-white">Name</label>
                  <input
                    className="rounded py-1 px-1 block mb-2"
                    // type="text"
                    // name="name"change profile picture in react js
                    value={profile ? profile.user_email : ""}
                    ref={register({ required: true, minLength: 5 })}
                    name="name"
                    type="email"
                    onChange={onChange}
                  />
                  <label className="text-white">Name</label>
                  <input
                    className="rounded py-1 px-1 block mb-2"
                    // type="text"
                    // name="name"change profile picture in react js
                    value={profile ? profile.phone_number : ""}
                    ref={register({ required: true, minLength: 5 })}
                    name="name"
                    type="text"
                    onChange={onChange}
                  />
                  <input
                    onClick={onClose}
                    className={errors.name ? "block" : "hidden"}
                    type="submit"
                    className="mr-2 mt-5 bg-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  />

                  <input
                    type="button"
                    value="Cancel"
                    onClick={cancle}
                    className="mr-2 mt-5 hover:bg-red-700 text-white bg-no-repeat font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  />
                </div>
              </div> */}
            </form>
          </div>
        </div>
      </div>

      {/* <div className=" flex  items-center justify-center h-screen">
        <div className=" w-full max-w-screen-md">
          <div className="bg-white shadow-md rounded  ">
            <div className="bg-gray-700 rounded">
              <h1 className="text-yellow-100 px-2 py-2">Your Profile</h1>
            </div>
            <div className="overflow-hidden">
              <div className="md:flex px-12 ">
                <form onSubmit={onSubmit} className="md:flex mt-8 pb-8 px-4">
                  <div className="ml-4">
                    <img
                      className="h-20 w-20 md:h-32 md:w-32 rounded-full mx-auto md:mx-0 md:mr-6"
                      src="/img/01-shutterstock_476340928-Irina-Bg.jpg"
                      // src={image.img}01-shutterstock_476340928-Irina-Bg.jpg
                    />

                    <h1 className="mt-2">Chagne Your Profile</h1>
                  </div>

                  <div className="ml-12">
                    <div
                      className={
                        modal
                          ? "block fixed -mt-32 items-center justify-center bg-gray-800 rounded-lg p-6"
                          : "hidden"
                      }
                    >
                      <h1 className="block mb-5 text-white">
                        Edit Your Profile
                      </h1>
                      <div></div>

                      <label className="text-white">Name</label>
                      <input
                        className="rounded py-1 px-1 block mb-2"
                        // type="text"
                        // name="name"change profile picture in react js
                        value={profile ? profile.user_name : ""}
                        ref={register({ required: true, minLength: 5 })}
                        name="name"
                        type="text"
                        onChange={onChange}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs italic">
                          Name required
                        </p>
                      )}

                      <label className="text-white">Email</label>
                      <input
                        className="rounded py-1 px-1 block mb-2"
                        // type="text"
                        // name="name"
                        value={profile ? profile.email : ""}
                        ref={register({ required: true, minLength: 5 })}
                        name="email"
                        type="email"
                        onChange={onChange}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs italic">
                          Name required
                        </p>
                      )}
                      <label className="text-white">Phone</label>
                      <input
                        className="rounded py-1 px-1 block"
                        // type="text"
                        // name="name"
                        value={profile ? profile.user_phone : ""}
                        ref={register({ required: true, minLength: 5 })}
                        name="phone"
                        type="number"
                        onChange={onChange}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs italic">
                          phone required
                        </p>
                      )}
                      <button
                        onClick={onClose}
                        className={errors.name ? "block" : "hidden"}
                        type="submit"
                        className="mr-2 mt-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancle}
                        className="mr-2 mt-5 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        Cancel
                      </button>
                    </div>
                    <div className=" px-3 mb-3">
                      <h1
                        // onClick={popUp}
                        className="-mb-2 font-extrabold text-lg  "
                      >
                        {profile ? profile.user_name : ""}
                      </h1>
                      <span className="text-xs ">Name</span>
                    </div>
                    <div className=" px-3 mb-3 ">
                      <h1 className="-mb-2 font-extrabold text-lg">
                        {profile ? profile.user_email : ""}
                      </h1>
                      <span className="text-xs ">Email</span>
                    </div>
                    <div className=" px-3 mb-3">
                      <h1 className="-mb-2 font-extrabold text-lg">
                        {profile ? profile.user_phone : ""}
                      </h1>
                      <span className="text-xs ">Phone</span>
                    </div>
                    <div className=" px-3 mb-3">
                      <h1 className="-mb-2 font-extrabold text-lg">
                        {profile ? profile.user_gender : ""}
                      </h1>
                      <span className="text-xs ">Gender</span>
                    </div>
                    <div className=" px-3 mb-3">
                      <h1 className="-mb-2 font-extrabold text-lg">
                        {profile ? profile.user_password : ""}
                      </h1>
                      <span className="text-xs ">Password</span>
                    </div>
                    <div className=" px-3 mb-3">
                      <h1 className="-mb-2 font-extrabold text-lg">
                        {profile ? profile.create_date : ""}
                      </h1>
                      <span className="text-xs ">createDate</span>
                    </div>
                  </div>
                </form>
              </div>
              <button
                onClick={popUp}
                className=" bg-blue-700 rounded float-right py-2 px-2 mb-5 mr-5 hover:bg-blue-600"
              >
                <span className="text-white">Edit Profile</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      ); */}
    </div>
  );
}
export default UserInfo;
