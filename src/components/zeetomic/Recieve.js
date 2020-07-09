import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const Recieve = () => {
  // const [value, setValue] = useState('');
  const [copied, setCopied] = useState(false);
  const [wallet, getWallet] = useState([]);
  var accessTokenObj = localStorage.getItem('token');
  useEffect(() => {
    axios({
      method: 'GET',
      url: 'https://backend.satisyou.com/get-wallet',
      headers: {
        token: accessTokenObj,
      },
    }).then((res) => {
      getWallet(res.data);
      console.log('wallet Get', res.data);
    });
  }, []);
  return (
    <div className="send-zeetomic-bg overflow-hidden">
      <div className="overflow-hidden mx-auto max-w-lg form-bg-send mt-40 shadow-xl px-6 rounded-lg">
        <center className="mt-10 mb-10">
          <h1 className=" text-gray-300 font-bold text-2xl">ZELENTRA TOKEN</h1>
        </center>
        {copied ? <span style={{ color: 'red' }}>Copied.</span> : null}
        {/* <input
          value={wallet.wallet}
          onChange={({ target: { value } }) => {
            getWallet(wallet.wallet);
            setCopied(false);
          }}
        /> */}
        <p className="font-medium text-sm text-white">{wallet.wallet}</p>
        <CopyToClipboard text={wallet.wallet} onCopy={() => setCopied(true)}>
          <button className="bg-green-500 px-2 py-2 rounded-md mt-6">
            Copy
          </button>
        </CopyToClipboard>
        <br />
        <br />
        {/* <CopyToClipboard text={wallet} onCopy={() => setCopied(true)}>
          <button>Copy to clipboard with button</button>
        </CopyToClipboard>
        <br />
        <br /> */}
      </div>
    </div>
  );
};

export default Recieve;
