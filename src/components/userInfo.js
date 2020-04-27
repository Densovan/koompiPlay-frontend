import React, { useState } from "react";
import { useForm } from "react-hook-form";
import uuid from "uuid/v1";

const UserInfo = () => {
  const [profile, setProfile] = useState({
    name: "Chhim Chany",
    email: "chhimchany@gmail.com",
    phone: "086280018",
  });
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (profile) => {
    // alert(JSON.stringify(data));
    console.log(profile);
  };

  const onChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
    console.log(profile);
  };
  const [modal, setModal] = useState(false);
  const popUp = () => {
    setModal(!modal);
  };
  const onClose = () => {
    setModal(false);
  };
  // const changeName = (name) => {
  //   setProfile([...profile, { name, id: uuid() }]);
  // };
  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   const data = profile;
  //   console.log(data);
  // };
  return (
    <div className=" flex  items-center justify-center h-screen">
      <div className=" w-full max-w-screen-md">
        <div className="bg-white shadow-md rounded  ">
          <div className="bg-gray-700 rounded">
            <h1 className="text-yellow-100 px-2 py-2">Your Profile</h1>
          </div>
          <div className="overflow-hidden">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="md:flex mt-8 pb-8 px-4"
            >
              <div className="ml-4">
                <img
                  className="h-20 w-20 md:h-32 md:w-32 rounded-full mx-auto md:mx-0 md:mr-6"
                  src="/img/01-shutterstock_476340928-Irina-Bg.jpg"
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
                  <h1 className="block mb-5 text-white">Edit Your Profile</h1>
                  <div></div>

                  <label className="text-white">Name</label>
                  <input
                    className="rounded py-1 px-1 block mb-2"
                    // type="text"
                    // name="name"
                    value={profile.name}
                    ref={register({ required: true, minLength: 5 })}
                    name="name"
                    type="text"
                    onChange={onChange}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs italic">Name required</p>
                  )}

                  <label className="text-white">Email</label>
                  <input
                    className="rounded py-1 px-1 block mb-2"
                    // type="text"
                    // name="name"
                    value={profile.email}
                    ref={register({ required: true, minLength: 5 })}
                    name="email"
                    type="email"
                    onChange={onChange}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs italic">Name required</p>
                  )}
                  <label className="text-white">Phone</label>
                  <input
                    className="rounded py-1 px-1 block"
                    // type="text"
                    // name="name"
                    value={profile.phone}
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
                    onClick={onClose}
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
                    {profile.name}
                  </h1>
                  <span className="text-xs ">Name</span>
                </div>
                <div className=" px-3 mb-3 ">
                  <h1 className="-mb-2 font-extrabold text-lg">
                    {profile.email}
                  </h1>
                  <span className="text-xs ">Email</span>
                </div>
                <div className=" px-3 ">
                  <h1 className="-mb-2 font-extrabold text-lg">
                    {profile.phone}
                  </h1>
                  <span className="text-xs ">Phone</span>
                </div>
              </div>
            </form>
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
  );
};

export default UserInfo;
