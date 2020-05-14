import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
// import axios from "axios";
import ParticlesBg from "particles-bg";
import jwt from "jsonwebtoken";

const Login = () => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    fetch("http://52.221.199.235:9000/test_login", {
      method: "POST",
      // headers: {
      //   Accept: "application/json, text/plain, */*",
      //   "Content-type": "application/json",
      // },

      body: JSON.stringify({
        user_name: data.Username,
        user_password: data.Password,
      }),
    })
      .then((res) => res.text())
      .then((data) => {
        localStorage.setItem("token", data);
        console.log("data", data);
        const decodeToken = jwt.decode(data);
        console.log(decodeToken);
        if (decodeToken) {
          window.location.replace("/start");
        } else {
          console.log(data);
          alert(data);
        }
      })
      .catch((err) => {
        alert(err);
        console.log(err.res.data);
      });

    const alertMessage = () => {
      return (
        <div
          class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong class="font-bold">Holy smokes!</strong>
          <span class="block sm:inline">Something seriously bad happened.</span>
          <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg
              class="fill-current h-6 w-6 text-red-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>
        </div>
      );
    };
  };

  return (
    <div className="flex  items-center justify-center h-screen ">
      <ParticlesBg type="ball" bg={true} />
      <div className="w-full max-w-md">
        <form
          style={{ backgroundColor: "rgb(250, 255, 255, 0.625)" }}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-gray-900 font-medium flex text-3xl  items-center justify-center mb-10">
            Login
          </h1>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <input
              className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              ref={register({ required: true, minLength: 1 })}
              name="Username"
              type="text"
            />
            {errors.Username && (
              <p className="text-red-500 text-xs italic">First Name required</p>
            )}
          </div>
          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-bold  mb-2">
              Password
            </label>
            <input
              className=" appearance-none border  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              ref={register({ required: true, minLength: 8 })}
              name="Password"
              type="password"
            />
            {errors.Password && (
              <p className="text-red-500 text-xs italic">Password required</p>
            )}
          </div>
          {/* <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign In
            </button>
            <span
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Forgot Password?
            </span>
          </div> */}
          <span
            className="mb-4 cursor-pointer inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="#"
          >
            Forgot Password?
          </span>
          <button
            type="submit"
            className="mb-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Sign In
          </button>
          <p className="text-center text-gray-600 mb-4">
            Don't hava an account yet?
          </p>
          {/* <span className="text-blue-500">
            <Link to="/register">register now</Link>
          </span> */}
          <Link to="/register">
            <button
              type="submit"
              className="mb-6 w-full border text-blue-700 hover:bg-gray-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Create account
            </button>
          </Link>
          <p className="text-center text-gray-600 ">Terms and conditions</p>
        </form>
      </div>
    </div>
  );
};

export default Login;
