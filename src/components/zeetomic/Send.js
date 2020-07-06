import React, { useState, useEffect } from "react";
import axios from "axios";
import { setLogLevel } from "firebase";
const Send = () => {
  const [send, setSend] = useState({
    recieve: "",
    amount: "",
    memo: "",
    select: "zto",
  });
  var accessTokenObj = localStorage.getItem("token");
  const [wallet, setgetWallet] = useState([]);

  const handleChange = (e) => {
    setSend({ ...send, [e.target.name]: e.target.value });
  };
  const selectChage = (e) => {
    setSend({ select: e.target.value });
  };

  useEffect(() => {
    axios({
      method: "GET",
      url: "https://backend.satisyou.com/get-wallet",
      headers: {
        token: accessTokenObj,
      },
    }).then((res) => {
      setgetWallet(res.data);
      console.log(res.data.id);
    });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    axios({
      method: "GET",
      url: "https://backend.satisyou.com/get-wallet",
      headers: {
        token: accessTokenObj,
      },
    }).then((res) => {
      console.log("wallet Get", res.data);
    });

    axios({
      method: "POST",
      url: "https://pro-api.zeetomic.com/apis/v1/payment",
      data: {
        id: wallet.id,
        apikey: "d24e5deb-353d-443c-bd3a-f4a40a5d2682",
        apisec:
          "NzczYjNkZWUtZTIxOS00YmY5LWEzNzMtZThjYTk0NzAyMWYxQmVhcmVyIGV5SmhiR2NpT2lKSVV6STFOaUo5LmV5SmZhV1FpT2lKa01qUmxOV1JsWWkwek5UTmtMVFEwTTJNdFltUXpZUzFtTkdFME1HRTFaREkyT0RJaUxDSmxlSEFpT2pFMU9USTFNelF3TmpSOS43bWIzQ0JXc3JSTC1kcWhCQUZvbHVHaFRPSE9MRGlPb1ZIU0dYdVRfTjBz",
        destination: send.recieve,
        amount: send.amount,
        asset_code: send.select,
        memo: send.memo,
      },
    });

    const newUser = {
      recieve: send.recieve,
      amount: send.amount,
      memo: send.memo,
      select: send.select,
      id: wallet.id,
    };
    console.log("helo", newUser);
  };

  return (
    <div className="send-zeetomic-bg overflow-hidden">
      <div className="overflow-hidden mx-auto max-w-md form-bg-send mt-40 shadow-xl px-6 rounded-lg">
        <div>
          <center className="mt-10">
            <h1 className=" text-gray-300 font-bold text-2xl">
              ZELENTRA TOKEN
            </h1>
          </center>
          <form onSubmit={onSubmit}>
            <div className="mb-4 ">
              <label
                class="block text-gray-300 text-sm font-bold mb-2"
                for="recieve"
              >
                Reciever Address
              </label>
              <input
                value={send.recieve}
                onChange={handleChange}
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                //   id="username"
                type="text"
                placeholder="Reciever Address"
                name="recieve"
              ></input>
            </div>
            <div className="mb-4">
              <label
                class="block text-gray-300 text-sm font-bold mb-2"
                for="amount"
              >
                Amount
              </label>
              <input
                value={send.amount}
                onChange={handleChange}
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                //   id="username"
                type="text"
                name="amount"
                placeholder="Amount"
              ></input>
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-bold mb-2">
                Asset
              </label>
              <div className="relative">
                <select
                  value={send.select}
                  onChange={selectChage}
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state"
                >
                  <option value="zto">ZTO</option>
                  <option value="native">Native</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    class="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label
                class="block text-gray-300 text-sm font-bold mb-2"
                for="memo"
              >
                Memo
              </label>
              <textarea
                name="memo"
                value={send.memo}
                onChange={handleChange}
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                //   id="username"
                type="textarea"
                placeholder="Memo"
              ></textarea>
            </div>
            <div>
              {send.recieve === "" ||
              send.amount === "" ||
              send.memo === "" ||
              send.select === "" ||
              send.select === "" ? (
                <button
                  disabled={
                    send.recieve == "" || send.amount == "" || send.memo == ""
                      ? true
                      : false
                  }
                  className="focus:outline-none mb-12 cursor-not-allowed mb-4 w-full bg-green-300  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Send
                </button>
              ) : (
                <button
                  className="focus:outline-none mb-12 w-full bg-green-500 cursor-pointer hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Send
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Send;
