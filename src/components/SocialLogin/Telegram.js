import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import three_dots from '../../assets/bars.svg';

const Telegram = () => {
  const [loaading, setLoading] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const [click, setClick] = useState(true);

  const onSubmit = (data) => {
    const newUser = {
      phone_number: data.phone,
    };
    console.log('phone', newUser);
  };
  const onSubmitVerify = (data) => {
    const verify = {
      code_verify: data.verifyy,
    };
    console.log('verify', verify);
  };
  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setClick(false);
    }, 5000);
    // setTimeout('window.location.reload()', 9000);
    // setClick(false);
    console.log('clicked');
  };
  //   const loadingSingup = () => {
  //     setLoading(true);
  //     setTimeout(() => {
  //       setLoading(false);
  //     }, 9000);
  //     setTimeout('window.location.reload()', 9000);
  //   };
  return (
    <div className="flex  items-center justify-center h-screen ">
      <div className="w-full max-w-md">
        {click ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Phone
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                ref={register({ required: true, minLength: 9 })}
                name="phone"
                type="number"
              />
              {errors.phone && (
                <p className="text-red-500 text-xs italic">Email required</p>
              )}
            </div>
            <button
              onClick={handleClick}
              value="local"
              type="submit"
              className="mb-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {loaading ? (
                <img
                  className="justify-center mx-auto w-6 h-6"
                  src={three_dots}
                  alt="loading image"
                  // height="8"
                />
              ) : (
                'Sign Up'
              )}
              {/* Sing Up */}
            </button>
          </form>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmitVerify)}
            className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Verify
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                // ref={register({ required: true, minLength: 9 })}
                name="verifyy"
                type="number"
              />
              {/* {errors.phone && (
                <p className="text-red-500 text-xs italic">Email required</p>
              )} */}
            </div>
            <button
              value="local"
              type="submit"
              className="mb-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {/* {loading ? (
              <img
                className="justify-center mx-auto w-6 h-6"
                src={three_dots}
                alt="loading image"
                // height="8"
              />
            ) : (
              'Sign Up'
            )} */}
              Verify
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Telegram;
