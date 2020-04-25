import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    // alert(JSON.stringify(data));
    console.log(data);
  };
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  //   const validateUserName = async (value) => {
  //     await sleep(1000);
  //     if (value !== 'bill') {
  //       setError('username', 'validate');
  //     } else {
  //       clearError('username');
  //     }
  //   };
  return (
    <div className="flex  items-center justify-center h-screen ">
      <div className="w-full max-w-md">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-gray-900 font-medium flex text-3xl  items-center justify-center mb-10">
            Login
          </h1>
          <div
            className={errors.lastName ? "field error" : "field"}
            className="mb-4"
          >
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              ref={register({ required: true, minLength: 5 })}
              name="Email"
              type="email"
            />
            {errors.Email && (
              <p className="text-red-500 text-xs italic">First Name required</p>
            )}
          </div>
          <div className="mb-6">
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
          <div class="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign In
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
          <p>or</p>
          <a className="text-blue-500">
            <Link to="/register">register now</Link>
          </a>
        </form>
      </div>
    </div>
  );
};

export default Login;
