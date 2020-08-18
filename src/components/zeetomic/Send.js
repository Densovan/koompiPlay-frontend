import React, { useState, useEffect } from 'react';
import SuccessMessage from '../../components/Message/SuccessMessage';
import axios from 'axios';
import three_dots from '../../assets/bars.svg';
import { data } from 'autoprefixer';
const Send = () => {
  const [send, setSend] = useState({
    recieve: '',
    amount: '',
    memo: '',
    select: 'SEL',
    apikey: 'c9c3cce7-61c1-43e8-97f7-495d75c51b18',
    apisec:
      'ZTc3NGQ2NTEtMTYzMy00YjVjLWI4ZmQtNmQwNDI5NmUxYzRlQmVhcmVyIGV5SmhiR2NpT2lKSVV6STFOaUo5LmV5SmZhV1FpT2lKak9XTXpZMk5sTnkwMk1XTXhMVFF6WlRndE9UZG1OeTAwT1RWa056VmpOVEZpTVRnaUxDSmxlSEFpT2pFMU9UYzRNakkxTVRkOS5iazdoXzJzQ1JlZlFfZ1EtNW9LRWNBMjFoWFd5U3JkUlVGdDJJQ1c4dmU4',
  });
  var accessTokenObj = localStorage.getItem('token');
  const [loading, setLoading] = useState(false);
  const [wallet, setgetWallet] = useState([]);
  const [successMessage, setSucessMessage] = useState('');

  const handleChange = (e) => {
    setSend({ ...send, [e.target.name]: e.target.value });
  };
  const selectChage = (e) => {
    setSend({ select: e.target.value });
  };

  useEffect(() => {
    axios({
      method: 'GET',
      url: 'https://backend.rielcoin.com/get-wallet',
      headers: {
        token: accessTokenObj,
      },
    }).then((res) => {
      setgetWallet(res.data);
      console.log(res.data);
    });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    axios({
      method: 'GET',
      url: 'https://backend.rielcoin.com/get-wallet',
      headers: {
        token: accessTokenObj,
      },
    }).then((res) => {
      console.log('wallet Get', res.data);
    });

    axios({
      method: 'POST',
      url: 'https://testnet-api.selendra.com/apis/v1/payment',
      data: {
        id: wallet.wallet_id,
        apikey: send.apikey,
        apisec: send.apisec,
        destination: send.recieve,
        amount: send.amount,
        asset_code: send.select,
        memo: send.memo,
      },
    }).then((res) => {
      console.log(res.data.message);

      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        // setSucessMessage(res.data.message);
      }, 5000);
      setSucessMessage(res.data.message);
      setTimeout(() => {
        setSucessMessage();
      }, 3000);
    });

    const newUser = {
      id: wallet.wallet_id,
      apikey: send.apikey,
      apisec: send.apisec,
      destination: send.recieve,
      amount: send.amount,
      asset_code: send.select,
      memo: send.memo,
    };
    console.log('helo', newUser);
  };

  return (
    <div className="send-zeetomic-bg overflow-hidden">
      <div className="overflow-hidden mx-auto max-w-md form-bg-send mt-40 shadow-xl px-6 rounded-lg">
        {successMessage ? <SuccessMessage msg={successMessage} /> : null}
        <div>
          <center className="mt-10">
            <h1 className=" text-gray-300 font-bold text-2xl">
              SELENTRA TOKEN
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
                  {/* <option value="native">Native</option> */}
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
              {send.recieve === '' ||
              send.amount === '' ||
              send.memo === '' ||
              send.select === '' ||
              send.select === '' ? (
                <button
                  disabled={
                    send.recieve === '' ||
                    send.amount === '' ||
                    send.memo === ''
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
                  {loading ? (
                    <img
                      className="justify-center mx-auto w-6 h-6"
                      src={three_dots}
                      alt="loading image"
                      // height="8"
                    />
                  ) : (
                    'Send'
                  )}
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
