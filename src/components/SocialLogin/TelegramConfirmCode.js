import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import three_dots from '../../assets/bars.svg';
import axios from 'axios';

var phone_code_hash = localStorage.getItem('code_hash');
var phone = localStorage.getItem('phone_number');

const TelegramConfirmCode = () => {
  const [loaading, setLoading] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const [click, setClick] = useState(true);

  const onSubmit = (data) => {
    axios({
      method: 'POST',
      url: 'https://telegram.rielcoin.com/api/login/telegram_confirm',
      data: {
        phone: phone,
        phone_code_hash: phone_code_hash,
        code: data.code,
      },
    }).then((res) => {
      console.log(res.data.id);
      axios({
        method: 'POST',
        url: 'https://backend.rielcoin.com/all_login',
        data: {
          // user_external_id: res.data.id,
          user_name: res.data.first_name,
          phone_number: res.data.phone,
          user_gender: 'default',
          user_email: 'default',
          user_password: 'default',
          user_profile: 'default',
          login_type: 'telegram',
        },
      }).then((res) => {
        console.log('token', res.data.string);
      });
    });
    const newUser = {
      code_number: data.code,
    };
    // console.log('phone', newUser);
    // setLoading(true);
    // setTimeout(() => {
    //   setLoading(false);
    //   setClick(false);
    //   // window.location.replace('/profile');
    // }, 5000);
    // console.log('clicked');
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
              Verify Code
            </label>
            <input
              className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              ref={register({ required: true })}
              name="code"
              type="number"
            />
            {/* {errors.code && (
              <p className="text-red-500 text-xs italic">
                Phone number required
              </p>
            )} */}
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
              'Verify'
            )}
            {/* Sing Up */}
          </button>
          {/* <Telegram Telegram={Telegram} /> */}
        </form>
      </div>
    </div>
  );
};

export default TelegramConfirmCode;
