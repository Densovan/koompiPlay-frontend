import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import three_dots from '../../assets/bars.svg';
import axios from 'axios';

const Telegram = ({ Telegram }) => {
  const [loaading, setLoading] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const [click, setClick] = useState(true);

  const onSubmit = (data) => {
    axios({
      method: 'POST',
      url: 'https://telegram.rielcoin.com/api/login/telegram_auth',
      data: {
        phone: data.phone,
      },
    }).then((res) => {
      console.log(res.data);
      localStorage.setItem('code_hash', res.data.phone_code_hash);
      localStorage.setItem('phone_number', res.data.phone);
    });
    const newUser = {
      phone_number: data.phone,
    };
    // const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setClick(false);
      // window.location.replace('/verify');
    }, 5000);
    // console.log('clicked');

    console.log('phone', newUser);
  };

  return (
    <div className="flex  items-center justify-center h-screen ">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Your Phone Number
            </label>
            <input
              className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              ref={register({ required: true, minLength: 9 })}
              name="phone"
              type="number"
              // value={+855}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs italic">
                Phone number required
              </p>
            )}
          </div>
          <button
            // onClick={handleClick}
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
              'Next'
            )}
            {/* Sing Up */}
          </button>
        </form>
        {/* 
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
            
          </div>
          <button
            value="local"
            type="submit"
            className="mb-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Verify
          </button>
        </form> */}
      </div>
    </div>
  );
};

export default Telegram;
