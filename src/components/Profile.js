import React, { useState, useEffect } from 'react';
import useAxios from 'axios-hooks';
import Navbar from '../layouts/Navbar';
import { Link } from 'react-router-dom';
import three_dots from '../assets/bars.svg';
import SuccessMessage from '../components/Message/SuccessMessage';
// import historyData from "./data/history.json";
import axios from 'axios';
//Global Token
var accessTokenObj = localStorage.getItem('token');
var phone_code_hash = localStorage.getItem('code_hash');
var phone = localStorage.getItem('phone_number');

const Profile = () => {
  //Error
  const [modalWallet, setModalWallet] = useState('');
  const [successMessage, setSucessMessage] = useState('');

  //zeetomic wallet
  const [wallet, setwallet] = useState([]);
  const [takewallet, setTakewallet] = useState({
    apikey: 'd24e5deb-353d-443c-bd3a-f4a40a5d2682',
    apisec:
      'NzczYjNkZWUtZTIxOS00YmY5LWEzNzMtZThjYTk0NzAyMWYxQmVhcmVyIGV5SmhiR2NpT2lKSVV6STFOaUo5LmV5SmZhV1FpT2lKa01qUmxOV1JsWWkwek5UTmtMVFEwTTJNdFltUXpZUzFtTkdFME1HRTFaREkyT0RJaUxDSmxlSEFpT2pFMU9USTFNelF3TmpSOS43bWIzQ0JXc3JSTC1kcWhCQUZvbHVHaFRPSE9MRGlPb1ZIU0dYdVRfTjBz',
  });

  //modal all show score
  const [show, setShow] = useState(false);
  const [historyShow, setHistoryShow] = useState(false);
  const [sciencShow, setSciencShow] = useState(false);
  const [GeneralShow, setGeneralShow] = useState(false);
  // const [history, setHistory] = useState("");

  // Score
  const [scoress, setScore] = useState([]);
  const [calculating, setCalculating] = useState([]);
  const [history, setHistory] = useState([]);
  const [scienc, setScienc] = useState([]);
  const [general, setGeneral] = useState([]);

  // const [loading, setLoading] = useState(false);
  const [loaading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);
  const [modal, setModal] = useState(false);
  const [image, setImage] = useState({
    // preview: "",
    raw: '',
  });

  const handleShowHistory = () => {
    setHistoryShow(true);
    document.body.style.overflow = 'hidden';
  };
  const handleShowScienc = () => {
    setSciencShow(true);
    document.body.style.overflow = 'hidden';
  };
  const handleSetGeneral = () => {
    setGeneralShow(true);
    document.body.style.overflow = 'hidden';
  };
  const closeGeneral = () => {
    setGeneralShow(false);
    document.body.style.overflow = 'unset';
  };
  const closeHistory = () => {
    setHistoryShow(false);
    document.body.style.overflow = 'unset';
  };
  const closeScienc = () => {
    setSciencShow(false);
    document.body.style.overflow = 'unset';
  };

  const getWalletLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 20000);
    setTimeout('window.location.reload()', 20000);
  };
  const walletSubmit = (e) => {
    e.preventDefault();
    axios
      .post('https://pro-api.zeetomic.com/apis/v1/get-wallet', {
        apikey: 'c3e090dd-5f39-4533-8f80-286d5e594915',
        apisec:
          'YmY4ODM3YmQtMzM5Ni00NzZkLTg2Y2MtYjUyNWM5NzZkMTcxQmVhcmVyIGV5SmhiR2NpT2lKSVV6STFOaUo5LmV5SmZhV1FpT2lKak0yVXdPVEJrWkMwMVpqTTVMVFExTXpNdE9HWTRNQzB5T0Raa05XVTFPVFE1TVRVaUxDSmxlSEFpT2pFMU9UUXhNREl6TXpOOS51Z3FsWW9NVWxyZWd0NjhhUHNpbTBoTkJ4aS1iUGNmVVhYSk94cV83M0Jz',
      })
      .then((res) => {
        console.log('wallet', res.data.message);
        axios({
          method: 'POST',
          url: 'https://backend.rielcoin.com/create-wallet',
          data: {
            wallet_id: res.data.message.id,
            wallet: res.data.message.wallet,
            email: profile.user_email,
          },
        }).then((res) => {
          console.log(res.data.string);
        });
      });
  };
  useEffect(() => {
    axios({
      method: 'GET',
      url: 'https://backend.rielcoin.com/get-wallet',
      headers: {
        token: accessTokenObj,
      },
    }).then((res) => {
      setwallet(res.data);
      console.log('wallet Get', res.data);
    });
  }, []);

  useEffect(() => {
    axios({
      method: 'GET',
      url: 'https://backend.rielcoin.com/last-calculating-result',

      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        token: accessTokenObj,
      },
    })
      // .then((res) => res.json())
      .then((res) => {
        // const scoress = res.data;
        setCalculating(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios({
      method: 'GET',
      url: 'https://backend.rielcoin.com/last-history-result',

      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        token: accessTokenObj,
      },
    })
      // .then((res) => res.json())
      .then((res) => {
        // const scoress = res.data;
        setHistory(res.data);
        console.log('history', res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    axios({
      method: 'GET',
      url: 'https://backend.rielcoin.com/last-science-result',

      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        token: accessTokenObj,
      },
    })
      // .then((res) => res.json())
      .then((res) => {
        // const scoress = res.data;
        setScienc(res.data);
        console.log('scienc', res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    axios({
      method: 'GET',
      url: 'https://backend.rielcoin.com/last-general-result',

      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        token: accessTokenObj,
      },
    })
      // .then((res) => res.json())
      .then((res) => {
        // const scoress = res.data;
        setGeneral(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const closeShowMore = () => {
    setShow(!show);
    document.body.style.overflow = 'unset';
  };

  const handleImageChange = (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        // ...image,
        // [e.target.name]: e.target.value,
        raw: e.target.files[0],
      });
    }
  };

  const popUp = () => {
    setModal(!modal);
  };
  const cancel = (e) => {
    // window.location.reload(false);
    // setImage({ preview: URL.createObjectURL(e.target.files[0]) });
    popUp();
    setProfile(null);
  };

  const refreshPage = () => {
    popUp();
    setTimeout('window.location.reload()', 9000);
  };

  const [
    { data, loading, error },
    //  refetch
  ] = useAxios({
    method: 'get',
    url: 'https://backend.rielcoin.com/userData',
    headers: {
      'Content-Type': 'application/json',
      token: accessTokenObj,
      // token: accessTokenObjs,
    },
  });

  if (loading) return 'Loading....';
  // <div id="outerContainer">
  //   <div id="container">
  //     <div class="item">
  //       <img src="https://www.kirupa.com/images/orange.png" />
  //     </div>
  //     <div class="circle" style={{ animationDelay: "0s" }}></div>
  //     <div class="circle" style={{ animationDelay: "1s" }}></div>
  //     <div class="circle" style={{ animationDelay: "2s" }}></div>
  //     <div class="circle" style={{ animationDelay: "3s" }}></div>
  //   </div>
  // </div>
  if (error) return window.location.replace('/login');
  if (data) {
    console.log(data);
    if (profile === null) {
      setProfile({ ...data });
    }
  }

  const submitName = (e) => {
    e.preventDefault();
    // console.log("hello");

    /*update name*/
    fetch('https://backend.rielcoin.com/updateName', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: accessTokenObj,
      },
      body: JSON.stringify({
        newName: profile.user_name,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        let a = data;
      });

    // phone_Number
    fetch('https://backend.rielcoin.com/updatePhone', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: accessTokenObj,
      },
      body: JSON.stringify({
        newPhone: profile.phone_number,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(res.string)
        let a = data;
      });

    //Profile picture

    const formData = new FormData();
    console.log([image, setImage][0].raw);
    formData.set('image', [image, setImage][0].raw);

    fetch('https://backend.rielcoin.com/uploadProfile', {
      method: 'POST',
      headers: {
        token: accessTokenObj,
      },
      body: formData,
    })
      .then((res) => res.text())
      .then((data) => console.log(data));
  };
  return (
    <React.Fragment>
      <Navbar />
      {/* {modalWallet ? <ModalMessage msg={modalWallet} /> : null} */}
      {/* {successMessage ? <SuccessMessage msg={successMessage} /> : null} */}

      {/* Modal Calculating score*/}
      {accessTokenObj && phone && phone_code_hash ? (
        <div>
          <div
            style={{ backgroundColor: 'rgba(0,0,0,0.4', overflow: 'visible' }}
            className={
              show
                ? ' fixed z-50 sm:pt-64 pt-24  top-0 left-0  w-full h-full overflow-auto'
                : 'hidden'
            }
          >
            <center>
              <div className="grid grid-cols-1 mb-2 overflow-hidden bg-white  mx-auto pb-12 w-4/5 md:w-4/12 lg:w-2/12  px-6 rounded-md">
                <div className="flex mt-4 justify-end">
                  <svg
                    onClick={closeShowMore}
                    className="text-right svg-icon h-8 w-8 cursor-pointer justify-end"
                    viewBox="0 0 20 20"
                  >
                    <path d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"></path>
                  </svg>
                </div>
                <h1 className="text-gray-800 font-bold mb-2">Your Score</h1>
                {/* <div>
    {history === ""
      ? console.log("ture")
      : history.score.map((res) => (
          <div className="grid grid-cols-1">
            <p className="mb-2 px-2 py-1 inline-block leading-none bg-teal-200 text-teal-800 rounded-full font-semibold uppercase tracking-wide text-xs">
              Score: {res}
            </p>
          </div>
        ))}
  </div> */}
                <div>
                  {calculating.slice(0, 10).map((res) => {
                    return (
                      <div className="w-4/6 grid grid-cols-1 mb-2">
                        <span className=" px-2 py-1 inline-block leading-none bg-teal-200 text-teal-800 rounded-full font-semibold uppercase tracking-wide text-xs">
                          Score : {res.score}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </center>
          </div>

          {/* modal Histroy Score */}
          <div
            style={{ backgroundColor: 'rgba(0,0,0,0.4', overflow: 'visible' }}
            className={
              historyShow
                ? ' fixed z-50 sm:pt-64 pt-24  top-0 left-0  w-full h-full overflow-auto'
                : 'hidden'
            }
          >
            <center>
              <div className="grid grid-cols-1 mb-2 overflow-hidden bg-white  mx-auto pb-12 w-4/5 md:w-4/12 lg:w-2/12  px-6 rounded-md">
                <div className="flex mt-4 justify-end">
                  <svg
                    onClick={closeHistory}
                    className="text-right svg-icon h-8 w-8 cursor-pointer justify-end"
                    viewBox="0 0 20 20"
                  >
                    <path d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"></path>
                  </svg>
                </div>
                <h1 className="text-gray-800 font-bold mb-2">Your Score</h1>
                {/* <div>
    {history === ""
      ? console.log("ture")
      : history.score.map((res) => (
          <div className="grid grid-cols-1">
            <p className="mb-2 px-2 py-1 inline-block leading-none bg-teal-200 text-teal-800 rounded-full font-semibold uppercase tracking-wide text-xs">
              Score: {res}
            </p>
          </div>
        ))}
  </div> */}
                <div>
                  {history.slice(0, 10).map((res) => {
                    return (
                      <div className="w-4/6 grid grid-cols-1 mb-2">
                        <span className=" px-2 py-1 inline-block leading-none bg-teal-200 text-teal-800 rounded-full font-semibold uppercase tracking-wide text-xs">
                          Score : {res.score}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </center>
          </div>

          {/* Modal Science score */}

          <div
            style={{ backgroundColor: 'rgba(0,0,0,0.4', overflow: 'visible' }}
            className={
              sciencShow
                ? ' fixed z-50 sm:pt-64 pt-24  top-0 left-0  w-full h-full overflow-auto'
                : 'hidden'
            }
          >
            <center>
              <div className="grid grid-cols-1 mb-2 overflow-hidden bg-white  mx-auto pb-12 w-4/5 md:w-4/12 lg:w-2/12  px-6 rounded-md">
                <div className="flex mt-4 justify-end">
                  <svg
                    onClick={closeScienc}
                    className="text-right svg-icon h-8 w-8 cursor-pointer justify-end"
                    viewBox="0 0 20 20"
                  >
                    <path d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"></path>
                  </svg>
                </div>
                <h1 className="text-gray-800 font-bold mb-2">Your Score</h1>
                {/* <div>
    {history === ""
      ? console.log("ture")
      : history.score.map((res) => (
          <div className="grid grid-cols-1">
            <p className="mb-2 px-2 py-1 inline-block leading-none bg-teal-200 text-teal-800 rounded-full font-semibold uppercase tracking-wide text-xs">
              Score: {res}
            </p>
          </div>
        ))}
  </div> */}
                <div>
                  {scienc.slice(0, 10).map((res) => {
                    return (
                      <div className="w-4/6 grid grid-cols-1 mb-2">
                        <span className=" px-2 py-1 inline-block leading-none bg-teal-200 text-teal-800 rounded-full font-semibold uppercase tracking-wide text-xs">
                          Score : {res.score}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </center>
          </div>
          {/* Modal General Knowledge score */}

          <div
            style={{ backgroundColor: 'rgba(0,0,0,0.4', overflow: 'visible' }}
            className={
              GeneralShow
                ? ' fixed z-50 sm:pt-64 pt-24  top-0 left-0  w-full h-full overflow-auto'
                : 'hidden'
            }
          >
            <center>
              <div className="grid grid-cols-1 mb-2 overflow-hidden bg-white  mx-auto pb-12 w-4/5 md:w-4/12 lg:w-2/12  px-6 rounded-md">
                <div className="flex mt-4 justify-end">
                  <svg
                    onClick={closeGeneral}
                    className="text-right svg-icon h-8 w-8 cursor-pointer justify-end"
                    viewBox="0 0 20 20"
                  >
                    <path d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"></path>
                  </svg>
                </div>
                <h1 className="text-gray-800 font-bold mb-2">Your Score</h1>
                {/* <div>
    {history === ""
      ? console.log("ture")
      : history.score.map((res) => (
          <div className="grid grid-cols-1">
            <p className="mb-2 px-2 py-1 inline-block leading-none bg-teal-200 text-teal-800 rounded-full font-semibold uppercase tracking-wide text-xs">
              Score: {res}
            </p>
          </div>
        ))}
  </div> */}
                <div>
                  {general.slice(0, 10).map((res) => {
                    return (
                      <div className="w-4/6 grid grid-cols-1 mb-2">
                        <span className=" px-2 py-1 inline-block leading-none bg-teal-200 text-teal-800 rounded-full font-semibold uppercase tracking-wide text-xs">
                          Score : {res.score}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </center>
          </div>
          <div
            style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
            className={
              modal
                ? 'fixed z-50 sm:pt-64 pt-24  top-0 left-0  w-full h-full overflow-auto'
                : 'hidden'
            }
          >
            <div className="bg-white  mx-auto pb-12 w-4/5 sm:w-3/6 px-6 rounded-md">
              <h1 className="py-5">Edit your Profile</h1>

              <form onSubmit={submitName}>
                <div>
                  <label htmlFor="upload-button">
                    {image.preview ? (
                      <img
                        style={{ marginTop: '-6px' }}
                        className=" md:-mt-20  sm:mx-auto h-24 w-24 -mt-16 md:h-32 md:w-32 rounded-full   "
                        src={image.preview}
                        // src={profile ? profile.user_profile : ""}
                        alt="dummy"
                        width="300"
                        height="300"
                      />
                    ) : (
                      <>
                        <img
                          style={{ marginTop: '-27px' }}
                          className=" md:-mt-20  sm:mx-auto h-24 w-24 -mt-16 md:h-32 md:w-32 rounded-full   "
                          src={profile ? profile.user_profile : ''}
                        />
                      </>
                    )}
                  </label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    id="upload-button"
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                  />
                </div>

                <label className="mb-6 text-black">Name</label>
                <input
                  className="rounded bg-gray-400 focus:outline-none py-1 px-1 block mb-2 w-full sm:w-full"
                  // type="text"
                  // name="name"change profile picture in react js
                  value={profile ? profile.user_name : ''}
                  // ref={register({ required: true, minLength: 5 })}
                  name="name"
                  type="text"
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      user_name: e.target.value,
                    })
                  }
                />
                <label className="mb-6 text-black">Phone</label>
                <input
                  className="rounded bg-gray-400 focus:outline-none py-1 px-1 block mb-2 w-full sm:w-full"
                  // type="text"
                  // name="name"change profile picture in react js
                  value={profile ? profile.phone_number : ''}
                  // ref={register({ required: true, minLength: 5 })}
                  name="phone"
                  type="number"
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      phone_number: e.target.value,
                    })
                  }
                />

                <input
                  onClick={refreshPage}
                  // onClick={popUp}
                  type="submit"
                  value="Submit"
                  className="mr-2 mt-5 cursor-pointer bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                />
                <input
                  onClick={cancel}
                  type="button"
                  value="Cancel"
                  className="mr-2 mt-5 cursor-pointer bg-red-700 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                />
              </form>
            </div>
          </div>
          <div className="  mx-auto  px-4 py-12  max-w-screen-lg sm:px-2">
            <div className=" pb-7/5 bg-black rounded-lg max-w-screen-lg w-full ">
              <img
                className="  inset-0 sm:h-auto object-cover rounded-lg  "
                src="/img/cover.jpg"
              />
            </div>
            <div className="px-4 -mt-12 sm:-mt-32  py-4 z-50  ">
              <div className="blur relative h-64 bg-white rounded-lg px-4 py-3 shadow-lg h-48 sm:h-auto">
                <img
                  className="border-solid border-2 border-gray-300 md:-mt-20  sm:mx-auto h-24 w-24 -mt-16 md:h-32 md:w-32 rounded-full   "
                  src={profile ? profile.user_profile : ''}
                />
                <div
                  // onClick={popUp}
                  className="mt-2 flex  text-xl font-bold text-blue-600 text-gray-600"
                >
                  <span className="ml-2 sm:mx-auto ">
                    {profile ? profile.user_name : ''}
                  </span>
                </div>
                <div className=" mt-16">
                  {/* <div className="mb-4 flex -mt-12 sm:justify-center  rounded-md ">
                <svg
                  className="fill-current text-gray-700 svg-icon h-8 w-8 text-justify"
                  viewBox="0 0 20 20"
                >
                  <path d="M17.388,4.751H2.613c-0.213,0-0.389,0.175-0.389,0.389v9.72c0,0.216,0.175,0.389,0.389,0.389h14.775c0.214,0,0.389-0.173,0.389-0.389v-9.72C17.776,4.926,17.602,4.751,17.388,4.751 M16.448,5.53L10,11.984L3.552,5.53H16.448zM3.002,6.081l3.921,3.925l-3.921,3.925V6.081z M3.56,14.471l3.914-3.916l2.253,2.253c0.153,0.153,0.395,0.153,0.548,0l2.253-2.253l3.913,3.916H3.56z M16.999,13.931l-3.921-3.925l3.921-3.925V13.931z"></path>
                </svg>
                <span className="text-gray-700 text-lg font-semibold">
                  {profile ? profile.user_email : ''}
                </span>
              </div> */}
                  <div className="flex mt-1 sm:justify-center rounded-md ">
                    <svg
                      className="text-gray-700 fill-current svg-icon h-8 w-8 text-justify"
                      viewBox="0 0 20 20"
                    >
                      <path d="M13.372,1.781H6.628c-0.696,0-1.265,0.569-1.265,1.265v13.91c0,0.695,0.569,1.265,1.265,1.265h6.744c0.695,0,1.265-0.569,1.265-1.265V3.045C14.637,2.35,14.067,1.781,13.372,1.781 M13.794,16.955c0,0.228-0.194,0.421-0.422,0.421H6.628c-0.228,0-0.421-0.193-0.421-0.421v-0.843h7.587V16.955z M13.794,15.269H6.207V4.731h7.587V15.269z M13.794,3.888H6.207V3.045c0-0.228,0.194-0.421,0.421-0.421h6.744c0.228,0,0.422,0.194,0.422,0.421V3.888z"></path>
                    </svg>
                    <span className="text-gray-700 text-lg font-semibold">
                      {profile ? profile.phone_number : ''}
                    </span>
                  </div>
                  <input
                    type="button"
                    value="Edit Profile"
                    onClick={popUp}
                    className="focus:outline-none float-right mt-4 sm:-mt-12 bg-no-repeat border-blue-500 border-2 px-3 py-2 bg-blue-400 rounded-full hover:bg-blue-200 hover:text-gray-600 text-white cursor-pointer"
                  />
                </div>
              </div>
            </div>
            <div>
              {/* {datas.map((data) => ( */}
              <div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Game */}
                  <div className="bg-gray-200 rounded-lg px-2 py-2 shadow-lg">
                    <center>
                      <h1 className="mb-2 font-bold text-lg">Your Game</h1>
                    </center>
                    {/* <div className="mx-auto  hover:-translate-y-1 max-w-sm bg-white hover:shadow-lg cursor-pointer rounded overflow-hidden">
          <img className="w-full" src="/img/quizbackground.png" />
          <div className=" py-4">
            <div className="font-bold text-xl mb-2 text-center">
              <h1>General Knowledge</h1>
            </div>
          </div>
          <div className=" px-2 mb-2">
            <div>
              {scoress.slice(0, 3).map((res) => {
                return (
                  <div className="grid grid-cols-1 mb-2">
                    <span className=" px-2 py-1 inline-block leading-none bg-teal-200 text-teal-800 rounded-full font-semibold uppercase tracking-wide text-xs">
                      Score : {res.score}
                    </span>
                  </div>
                );
              })}
            </div>
            <button
              onClick={() => {
                setShow(true);
                // setHistory(data);
                document.body.style.overflow = "hidden";
              }}
              className="focus:outline-none bg-blue-400 px-2 rounded-full mt-2 hover:bg-blue-200"
            >
              Show More
            </button>
          </div>
        </div> */}

                    {/* <div className="grid grid-cols-2 gap-2">
          {historyData.map((data) => {
            const { img, title, score } = data;
            return (
              <div className="transition duration-500 ease-in-out transform hover:-translate-y-1 max-w-sm bg-white hover:shadow-lg cursor-pointer rounded overflow-hidden">
                <img className="w-full" src={img} />
                <div className=" py-4">
                  <div className="font-bold text-xl mb-2 text-center">
                    <h1>{title}</h1>
                  </div>
                </div>
                <div className=" px-2 mb-2">
                  <div>
                    {score.slice(0, 3).map((res) => {
                      return (
                        <div className="grid grid-cols-1 mb-2">
                          <span className=" px-2 py-1 inline-block leading-none bg-teal-200 text-teal-800 rounded-full font-semibold uppercase tracking-wide text-xs">
                            Score : {res}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <button
                    onClick={() => {
                      setShow(true);
                      setHistory(data);
                      document.body.style.overflow = "hidden";
                    }}
                    className="focus:outline-none bg-blue-400 px-2 rounded-full mt-2 hover:bg-blue-200"
                  >
                    Show More
                  </button>
                </div>
              </div>
            );
          })}
        </div> */}

                    <div className="grid grid-cols-2 gap-2">
                      <div className="  hover:-translate-y-1 max-w-sm bg-white hover:shadow-lg cursor-pointer rounded overflow-hidden">
                        <img className="w-full" src="/img/quizbackground.png" />
                        <div className=" py-4">
                          <div className="font-bold text-xl mb-2 text-center">
                            <h1>Calculating</h1>
                          </div>
                        </div>
                        {calculating.length === 0 ? (
                          <div className="px-2">
                            <h1 className="mx-auto text-center">
                              Your didn't play this game
                            </h1>
                            <Link to="/calculate">
                              <button className="mb-2 focus:outline-none bg-green-500 px-2 rounded-full mt-2 hover:bg-green-300">
                                Play
                              </button>
                            </Link>
                          </div>
                        ) : (
                          <div className=" px-2 mb-2">
                            {calculating.length < 4 ? (
                              <div>
                                {calculating.map((res) => (
                                  <div className="grid grid-cols-1 mb-2">
                                    <span className=" px-2 py-1 inline-block leading-none bg-teal-200 text-teal-800 rounded-full font-semibold uppercase tracking-wide text-xs">
                                      Score : {res.score}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div>
                                <div>
                                  {calculating.slice(0, 3).map((res) => {
                                    return (
                                      <div className="grid grid-cols-1 mb-2">
                                        <span className=" px-2 py-1 inline-block leading-none bg-teal-200 text-teal-800 rounded-full font-semibold uppercase tracking-wide text-xs">
                                          Score : {res.score}
                                        </span>
                                      </div>
                                    );
                                  })}
                                </div>
                                <button
                                  onClick={() => {
                                    setShow(true);
                                    // setHistory(data);
                                    document.body.style.overflow = 'hidden';
                                  }}
                                  className="focus:outline-none bg-blue-400 px-2 rounded-full mt-2 hover:bg-blue-200"
                                >
                                  Show More
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="  hover:-translate-y-1 max-w-sm bg-white hover:shadow-lg cursor-pointer rounded overflow-hidden">
                        <img className="w-full" src="/img/quizbackground.png" />
                        <div className=" py-4">
                          <div className="font-bold text-xl mb-2 text-center">
                            <h1>Histroy</h1>
                          </div>
                        </div>
                        {history.length === 0 ? (
                          <div className="px-2">
                            <h1 className="mx-auto text-center">
                              Your didn't play this game
                            </h1>
                            <Link to="/history">
                              <button className="mb-2 focus:outline-none bg-green-500 px-2 rounded-full mt-2 hover:bg-green-300">
                                Play
                              </button>
                            </Link>
                          </div>
                        ) : (
                          <div className=" px-2 mb-2">
                            {history.length < 4 ? (
                              <div>
                                {history.map((res) => (
                                  <div className="grid grid-cols-1 mb-2">
                                    <span className=" px-2 py-1 inline-block leading-none bg-teal-200 text-teal-800 rounded-full font-semibold uppercase tracking-wide text-xs">
                                      Score : {res.score}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div>
                                <div>
                                  {history.slice(0, 3).map((res) => {
                                    return (
                                      <div className="grid grid-cols-1 mb-2">
                                        <span className=" px-2 py-1 inline-block leading-none bg-teal-200 text-teal-800 rounded-full font-semibold uppercase tracking-wide text-xs">
                                          Score : {res.score}
                                        </span>
                                      </div>
                                    );
                                  })}
                                </div>
                                <button
                                  onClick={handleShowHistory}
                                  // onClick={() => {
                                  //   setShow(true);
                                  //   // setHistory(data);
                                  //   document.body.style.overflow = "hidden";
                                  // }}
                                  className="focus:outline-none bg-blue-400 px-2 rounded-full mt-2 hover:bg-blue-200"
                                >
                                  Show More
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="  hover:-translate-y-1 max-w-sm bg-white hover:shadow-lg cursor-pointer rounded overflow-hidden">
                        <img className="w-full" src="/img/quizbackground.png" />
                        <div className=" py-4">
                          <div className="font-bold text-xl mb-2 text-center">
                            <h1>Science</h1>
                          </div>
                        </div>
                        {scienc.length === 0 ? (
                          <div className="px-2">
                            <h1 className="mx-auto text-center">
                              Your didn't play this game
                            </h1>
                            <Link to="/science">
                              <button className="mb-2 focus:outline-none bg-green-500 px-2 rounded-full mt-2 hover:bg-green-300">
                                Play
                              </button>
                            </Link>
                          </div>
                        ) : (
                          <div className=" px-2 mb-2">
                            {scienc.length < 4 ? (
                              <div>
                                {scienc.map((res) => (
                                  <div className="grid grid-cols-1 mb-2">
                                    <span className=" px-2 py-1 inline-block leading-none bg-teal-200 text-teal-800 rounded-full font-semibold uppercase tracking-wide text-xs">
                                      Score : {res.score}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div>
                                <div>
                                  {scienc.slice(0, 3).map((res) => {
                                    return (
                                      <div className="grid grid-cols-1 mb-2">
                                        <span className=" px-2 py-1 inline-block leading-none bg-teal-200 text-teal-800 rounded-full font-semibold uppercase tracking-wide text-xs">
                                          Score : {res.score}
                                        </span>
                                      </div>
                                    );
                                  })}
                                </div>
                                <button
                                  onClick={handleShowScienc}
                                  className="focus:outline-none bg-blue-400 px-2 rounded-full mt-2 hover:bg-blue-200"
                                >
                                  Show More
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="  hover:-translate-y-1 max-w-sm bg-white hover:shadow-lg cursor-pointer rounded overflow-hidden">
                        <img className="w-full" src="/img/quizbackground.png" />
                        <div className=" py-4">
                          <div className="font-bold text-xl mb-2 text-center">
                            <h1>General Knowledge</h1>
                          </div>
                        </div>
                        {general.length === 0 ? (
                          <div className="px-2">
                            <h1 className="mx-auto text-center">
                              Your didn't play this game
                            </h1>
                            <Link to="/calculate">
                              <button className="mb-2 focus:outline-none bg-green-500 px-2 rounded-full mt-2 hover:bg-green-300">
                                Play
                              </button>
                            </Link>
                          </div>
                        ) : (
                          <div className=" px-2 mb-2">
                            {general.length < 4 ? (
                              <div>
                                {general.map((res) => (
                                  <div className="grid grid-cols-1 mb-2">
                                    <span className=" px-2 py-1 inline-block leading-none bg-teal-200 text-teal-800 rounded-full font-semibold uppercase tracking-wide text-xs">
                                      Score : {res.score}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div>
                                <div>
                                  {general.slice(0, 3).map((res) => {
                                    return (
                                      <div className="grid grid-cols-1 mb-2">
                                        <span className=" px-2 py-1 inline-block leading-none bg-teal-200 text-teal-800 rounded-full font-semibold uppercase tracking-wide text-xs">
                                          Score : {res.score}
                                        </span>
                                      </div>
                                    );
                                  })}
                                </div>
                                <button
                                  onClick={handleSetGeneral}
                                  className="focus:outline-none bg-blue-400 px-2 rounded-full mt-2 hover:bg-blue-200"
                                >
                                  Show More
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Zeetomic */}
                  <div className="bg-gray-200 rounded-lg px-6 py-2 shadow-lg">
                    <center>
                      <h1 className="font-bold mb-2">WALLET</h1>
                    </center>
                    {wallet.email == 'default' ||
                    wallet.id == '' ||
                    wallet.wallet_id == 'default' ||
                    wallet.email == 'default' ? (
                      <form onSubmit={walletSubmit}>
                        <button
                          onClick={getWalletLoading}
                          className="focus:outline-none mb-12 w-full bg-green-500 cursor-pointer hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                          {loaading ? (
                            <img
                              className="justify-center mx-auto w-6 h-6"
                              src={three_dots}
                              alt="loading image"
                              // height="8"
                            />
                          ) : (
                            'Get Wallet'
                          )}
                        </button>
                      </form>
                    ) : (
                      <div>
                        <div
                          style={{ borderRadius: '30px' }}
                          className="mx-auto justify-center flex px-3 py-3 bg-gray-200 wallet-shadow rounded-lg h-56"
                        >
                          <div className="mt-12">
                            <svg
                              className="svg-icon w-24 h-24 fill-current text-gray-500"
                              viewBox="0 0 20 20"
                            >
                              <path
                                // fill="none"
                                d="M4.3,15.249H3.428c-0.241,0-0.436,0.195-0.436,0.436c0,0.241,0.195,0.437,0.436,0.437H4.3c0.241,0,0.436-0.195,0.436-0.437C4.736,15.444,4.541,15.249,4.3,15.249 M6.916,15.249H6.044c-0.241,0-0.436,0.195-0.436,0.436c0,0.241,0.195,0.437,0.436,0.437h0.872c0.241,0,0.436-0.195,0.436-0.437C7.352,15.444,7.157,15.249,6.916,15.249 M13.894,8.271h0.872c0.241,0,0.437-0.195,0.437-0.437c0-0.241-0.195-0.436-0.437-0.436h-0.872c-0.241,0-0.437,0.194-0.437,0.436C13.457,8.077,13.652,8.271,13.894,8.271 M4.3,7.399H3.428c-0.241,0-0.436,0.194-0.436,0.436c0,0.242,0.195,0.437,0.436,0.437H4.3c0.241,0,0.436-0.195,0.436-0.437C4.736,7.594,4.541,7.399,4.3,7.399 M15.638,11.324c-0.241,0-0.436,0.194-0.436,0.436s0.194,0.437,0.436,0.437s0.437-0.195,0.437-0.437S15.879,11.324,15.638,11.324 M14.766,15.249h-0.872c-0.241,0-0.437,0.195-0.437,0.436c0,0.241,0.195,0.437,0.437,0.437h0.872c0.241,0,0.437-0.195,0.437-0.437C15.202,15.444,15.007,15.249,14.766,15.249 M12.149,7.399h-0.872c-0.241,0-0.437,0.194-0.437,0.436c0,0.242,0.195,0.437,0.437,0.437h0.872c0.24,0,0.436-0.195,0.436-0.437C12.585,7.594,12.39,7.399,12.149,7.399 M17.818,9.144V5.655c0-0.939-0.745-1.7-1.676-1.737l-0.104-0.859L9.276,3.88L2.824,2.151l-0.471,1.76H2.119c-0.963,0-1.744,0.781-1.744,1.744v10.466c0,0.963,0.781,1.744,1.744,1.744h13.955c0.963,0,1.744-0.781,1.744-1.744v-1.744c0.963,0,1.744-0.781,1.744-1.745v-1.744C19.562,9.925,18.781,9.144,17.818,9.144 M16.946,5.655v0.242c-0.18-0.104-0.377-0.178-0.589-0.213L16.25,4.801C16.646,4.882,16.946,5.234,16.946,5.655 M15.277,4.029l0.184,1.507l-3.929-1.052L15.277,4.029z M3.44,3.219l9.09,2.436H2.788L3.44,3.219z M1.247,5.655c0-0.481,0.39-0.872,0.871-0.872l-0.24,0.896C1.65,5.711,1.438,5.786,1.247,5.897V5.655z M16.946,16.121c0,0.48-0.392,0.872-0.872,0.872H2.119c-0.482,0-0.872-0.392-0.872-0.872V7.399c0-0.481,0.39-0.872,0.872-0.872h13.955c0.48,0,0.872,0.391,0.872,0.872v1.744h-1.744c-0.964,0-1.745,0.781-1.745,1.744v1.744c0,0.964,0.781,1.745,1.745,1.745h1.744V16.121z M18.69,12.632c0,0.481-0.392,0.873-0.872,0.873h-2.616c-0.482,0-0.873-0.392-0.873-0.873v-1.744c0-0.481,0.391-0.872,0.873-0.872h2.616c0.48,0,0.872,0.391,0.872,0.872V12.632z M12.149,15.249h-0.872c-0.241,0-0.437,0.195-0.437,0.436c0,0.241,0.195,0.437,0.437,0.437h0.872c0.24,0,0.436-0.195,0.436-0.437C12.585,15.444,12.39,15.249,12.149,15.249 M9.533,15.249H8.661c-0.241,0-0.436,0.195-0.436,0.436c0,0.241,0.195,0.437,0.436,0.437h0.872c0.241,0,0.436-0.195,0.436-0.437C9.969,15.444,9.774,15.249,9.533,15.249 M6.916,7.399H6.044c-0.241,0-0.436,0.194-0.436,0.436c0,0.242,0.195,0.437,0.436,0.437h0.872c0.241,0,0.436-0.195,0.436-0.437C7.352,7.594,7.157,7.399,6.916,7.399 M9.533,7.399H8.661c-0.241,0-0.436,0.194-0.436,0.436c0,0.242,0.195,0.437,0.436,0.437h0.872c0.241,0,0.436-0.195,0.436-0.437C9.969,7.594,9.774,7.399,9.533,7.399"
                              ></path>
                            </svg>
                          </div>
                          <div className="mt-12 ml-6">
                            <span className="text-gray-600 text-xl">
                              Balance
                            </span>
                            <h1 className="text-4xl text-gray-800 font-extrabold">
                              4,238,72
                            </h1>
                          </div>
                        </div>
                        <div
                          // style={{ borderRadius: "30px" }}
                          className="mx-auto cursor-pointer justify-center flex px-3 py-3 bg-gray-200 wallet-shadow rounded-lg mt-12"
                        >
                          <div>
                            <svg
                              className="svg-icon w-10 h-10 fill-current text-gray-600"
                              viewBox="0 0 20 20"
                            >
                              <path d="M2.25,12.584c-0.713,0-1.292,0.578-1.292,1.291s0.579,1.291,1.292,1.291c0.713,0,1.292-0.578,1.292-1.291S2.963,12.584,2.25,12.584z M2.25,14.307c-0.238,0-0.43-0.193-0.43-0.432s0.192-0.432,0.43-0.432c0.238,0,0.431,0.193,0.431,0.432S2.488,14.307,2.25,14.307z M5.694,6.555H18.61c0.237,0,0.431-0.191,0.431-0.43s-0.193-0.431-0.431-0.431H5.694c-0.238,0-0.43,0.192-0.43,0.431S5.457,6.555,5.694,6.555z M2.25,8.708c-0.713,0-1.292,0.578-1.292,1.291c0,0.715,0.579,1.292,1.292,1.292c0.713,0,1.292-0.577,1.292-1.292C3.542,9.287,2.963,8.708,2.25,8.708z M2.25,10.43c-0.238,0-0.43-0.192-0.43-0.431c0-0.237,0.192-0.43,0.43-0.43c0.238,0,0.431,0.192,0.431,0.43C2.681,10.238,2.488,10.43,2.25,10.43z M18.61,9.57H5.694c-0.238,0-0.43,0.192-0.43,0.43c0,0.238,0.192,0.431,0.43,0.431H18.61c0.237,0,0.431-0.192,0.431-0.431C19.041,9.762,18.848,9.57,18.61,9.57z M18.61,13.443H5.694c-0.238,0-0.43,0.193-0.43,0.432s0.192,0.432,0.43,0.432H18.61c0.237,0,0.431-0.193,0.431-0.432S18.848,13.443,18.61,13.443z M2.25,4.833c-0.713,0-1.292,0.578-1.292,1.292c0,0.713,0.579,1.291,1.292,1.291c0.713,0,1.292-0.578,1.292-1.291C3.542,5.412,2.963,4.833,2.25,4.833z M2.25,6.555c-0.238,0-0.43-0.191-0.43-0.43s0.192-0.431,0.43-0.431c0.238,0,0.431,0.192,0.431,0.431S2.488,6.555,2.25,6.555z"></path>
                            </svg>
                          </div>
                          <div>
                            <h1 className="ml-6 text-gray-700 font-medium text-2xl">
                              Transaction
                            </h1>
                          </div>
                        </div>
                        <div
                          // style={{ borderRadius: "30px" }}
                          className="mx-auto cursor-pointer justify-center flex px-3 py-3 bg-gray-200 wallet-shadow rounded-lg mt-2"
                        >
                          <div>
                            <svg
                              className="svg-icon h-10 w-10 fill-current text-gray-600"
                              viewBox="0 0 20 20"
                            >
                              <path d="M13.889,11.611c-0.17,0.17-0.443,0.17-0.612,0l-3.189-3.187l-3.363,3.36c-0.171,0.171-0.441,0.171-0.612,0c-0.172-0.169-0.172-0.443,0-0.611l3.667-3.669c0.17-0.17,0.445-0.172,0.614,0l3.496,3.493C14.058,11.167,14.061,11.443,13.889,11.611 M18.25,10c0,4.558-3.693,8.25-8.25,8.25c-4.557,0-8.25-3.692-8.25-8.25c0-4.557,3.693-8.25,8.25-8.25C14.557,1.75,18.25,5.443,18.25,10 M17.383,10c0-4.07-3.312-7.382-7.383-7.382S2.618,5.93,2.618,10S5.93,17.381,10,17.381S17.383,14.07,17.383,10"></path>
                            </svg>
                          </div>
                          <div>
                            <Link to="/send">
                              <h1 className="ml-6 text-gray-700 font-medium text-2xl">
                                Send
                              </h1>
                            </Link>
                          </div>
                        </div>
                        <div
                          // style={{ borderRadius: "30px" }}
                          className="mx-auto cursor-pointer justify-center flex px-3 py-3 bg-gray-200 wallet-shadow rounded-lg mt-2"
                        >
                          <div>
                            <svg
                              className="svg-icon h-10 w-10 fill-current text-gray-600"
                              viewBox="0 0 20 20"
                            >
                              <path d="M13.962,8.885l-3.736,3.739c-0.086,0.086-0.201,0.13-0.314,0.13S9.686,12.71,9.6,12.624l-3.562-3.56C5.863,8.892,5.863,8.611,6.036,8.438c0.175-0.173,0.454-0.173,0.626,0l3.25,3.247l3.426-3.424c0.173-0.172,0.451-0.172,0.624,0C14.137,8.434,14.137,8.712,13.962,8.885 M18.406,10c0,4.644-3.763,8.406-8.406,8.406S1.594,14.644,1.594,10S5.356,1.594,10,1.594S18.406,5.356,18.406,10 M17.521,10c0-4.148-3.373-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.147,3.374,7.521,7.521,7.521C14.148,17.521,17.521,14.147,17.521,10"></path>
                            </svg>
                          </div>
                          <div>
                            <Link to="/recieve">
                              <h1 className="ml-6 text-gray-700 font-medium text-2xl">
                                Recieve
                              </h1>
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div
            style={{ backgroundColor: 'rgba(0,0,0,0.4', overflow: 'visible' }}
            className={
              show
                ? ' fixed z-50 sm:pt-64 pt-24  top-0 left-0  w-full h-full overflow-auto'
                : 'hidden'
            }
          >
            <center>
              <div className="grid grid-cols-1 mb-2 overflow-hidden bg-white  mx-auto pb-12 w-4/5 md:w-4/12 lg:w-2/12  px-6 rounded-md">
                <div className="flex mt-4 justify-end">
                  <svg
                    onClick={closeShowMore}
                    className="text-right svg-icon h-8 w-8 cursor-pointer justify-end"
                    viewBox="0 0 20 20"
                  >
                    <path d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"></path>
                  </svg>
                </div>
                <h1 className="text-gray-800 font-bold mb-2">Your Score</h1>
                {/* <div>
    {history === ""
      ? console.log("ture")
      : history.score.map((res) => (
          <div className="grid grid-cols-1">
            <p className="mb-2 px-2 py-1 inline-block leading-none bg-teal-200 text-teal-800 rounded-full font-semibold uppercase tracking-wide text-xs">
              Score: {res}
            </p>
          </div>
        ))}
  </div> */}
                <div>
                  {calculating.slice(0, 10).map((res) => {
                    return (
                      <div className="w-4/6 grid grid-cols-1 mb-2">
                        <span className=" px-2 py-1 inline-block leading-none bg-teal-200 text-teal-800 rounded-full font-semibold uppercase tracking-wide text-xs">
                          Score : {res.score}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </center>
          </div>

          {/* modal Histroy Score */}
          <div
            style={{ backgroundColor: 'rgba(0,0,0,0.4', overflow: 'visible' }}
            className={
              historyShow
                ? ' fixed z-50 sm:pt-64 pt-24  top-0 left-0  w-full h-full overflow-auto'
                : 'hidden'
            }
          >
            <center>
              <div className="grid grid-cols-1 mb-2 overflow-hidden bg-white  mx-auto pb-12 w-4/5 md:w-4/12 lg:w-2/12  px-6 rounded-md">
                <div className="flex mt-4 justify-end">
                  <svg
                    onClick={closeHistory}
                    className="text-right svg-icon h-8 w-8 cursor-pointer justify-end"
                    viewBox="0 0 20 20"
                  >
                    <path d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"></path>
                  </svg>
                </div>
                <h1 className="text-gray-800 font-bold mb-2">Your Score</h1>
                {/* <div>
    {history === ""
      ? console.log("ture")
      : history.score.map((res) => (
          <div className="grid grid-cols-1">
            <p className="mb-2 px-2 py-1 inline-block leading-none bg-teal-200 text-teal-800 rounded-full font-semibold uppercase tracking-wide text-xs">
              Score: {res}
            </p>
          </div>
        ))}
  </div> */}
                <div>
                  {history.slice(0, 10).map((res) => {
                    return (
                      <div className="w-4/6 grid grid-cols-1 mb-2">
                        <span className=" px-2 py-1 inline-block leading-none bg-teal-200 text-teal-800 rounded-full font-semibold uppercase tracking-wide text-xs">
                          Score : {res.score}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </center>
          </div>

          {/* Modal Science score */}

          <div
            style={{ backgroundColor: 'rgba(0,0,0,0.4', overflow: 'visible' }}
            className={
              sciencShow
                ? ' fixed z-50 sm:pt-64 pt-24  top-0 left-0  w-full h-full overflow-auto'
                : 'hidden'
            }
          >
            <center>
              <div className="grid grid-cols-1 mb-2 overflow-hidden bg-white  mx-auto pb-12 w-4/5 md:w-4/12 lg:w-2/12  px-6 rounded-md">
                <div className="flex mt-4 justify-end">
                  <svg
                    onClick={closeScienc}
                    className="text-right svg-icon h-8 w-8 cursor-pointer justify-end"
                    viewBox="0 0 20 20"
                  >
                    <path d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"></path>
                  </svg>
                </div>
                <h1 className="text-gray-800 font-bold mb-2">Your Score</h1>
                {/* <div>
    {history === ""
      ? console.log("ture")
      : history.score.map((res) => (
          <div className="grid grid-cols-1">
            <p className="mb-2 px-2 py-1 inline-block leading-none bg-teal-200 text-teal-800 rounded-full font-semibold uppercase tracking-wide text-xs">
              Score: {res}
            </p>
          </div>
        ))}
  </div> */}
                <div>
                  {scienc.slice(0, 10).map((res) => {
                    return (
                      <div className="w-4/6 grid grid-cols-1 mb-2">
                        <span className=" px-2 py-1 inline-block leading-none bg-teal-200 text-teal-800 rounded-full font-semibold uppercase tracking-wide text-xs">
                          Score : {res.score}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </center>
          </div>
          {/* Modal General Knowledge score */}

          <div
            style={{ backgroundColor: 'rgba(0,0,0,0.4', overflow: 'visible' }}
            className={
              GeneralShow
                ? ' fixed z-50 sm:pt-64 pt-24  top-0 left-0  w-full h-full overflow-auto'
                : 'hidden'
            }
          >
            <center>
              <div className="grid grid-cols-1 mb-2 overflow-hidden bg-white  mx-auto pb-12 w-4/5 md:w-4/12 lg:w-2/12  px-6 rounded-md">
                <div className="flex mt-4 justify-end">
                  <svg
                    onClick={closeGeneral}
                    className="text-right svg-icon h-8 w-8 cursor-pointer justify-end"
                    viewBox="0 0 20 20"
                  >
                    <path d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"></path>
                  </svg>
                </div>
                <h1 className="text-gray-800 font-bold mb-2">Your Score</h1>
                {/* <div>
    {history === ""
      ? console.log("ture")
      : history.score.map((res) => (
          <div className="grid grid-cols-1">
            <p className="mb-2 px-2 py-1 inline-block leading-none bg-teal-200 text-teal-800 rounded-full font-semibold uppercase tracking-wide text-xs">
              Score: {res}
            </p>
          </div>
        ))}
  </div> */}
                <div>
                  {general.slice(0, 10).map((res) => {
                    return (
                      <div className="w-4/6 grid grid-cols-1 mb-2">
                        <span className=" px-2 py-1 inline-block leading-none bg-teal-200 text-teal-800 rounded-full font-semibold uppercase tracking-wide text-xs">
                          Score : {res.score}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </center>
          </div>
          <div
            style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
            className={
              modal
                ? 'fixed z-50 sm:pt-64 pt-24  top-0 left-0  w-full h-full overflow-auto'
                : 'hidden'
            }
          >
            <div className="bg-white  mx-auto pb-12 w-4/5 sm:w-3/6 px-6 rounded-md">
              <h1 className="py-5">Edit your Profile</h1>

              <form onSubmit={submitName}>
                <div>
                  <label htmlFor="upload-button">
                    {image.preview ? (
                      <img
                        style={{ marginTop: '-6px' }}
                        className=" md:-mt-20  sm:mx-auto h-24 w-24 -mt-16 md:h-32 md:w-32 rounded-full   "
                        src={image.preview}
                        // src={profile ? profile.user_profile : ""}
                        alt="dummy"
                        width="300"
                        height="300"
                      />
                    ) : (
                      <>
                        <img
                          style={{ marginTop: '-27px' }}
                          className=" md:-mt-20  sm:mx-auto h-24 w-24 -mt-16 md:h-32 md:w-32 rounded-full   "
                          src={profile ? profile.user_profile : ''}
                        />
                      </>
                    )}
                  </label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    id="upload-button"
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                  />
                </div>

                <label className="mb-6 text-black">Name</label>
                <input
                  className="rounded bg-gray-400 focus:outline-none py-1 px-1 block mb-2 w-full sm:w-full"
                  // type="text"
                  // name="name"change profile picture in react js
                  value={profile ? profile.user_name : ''}
                  // ref={register({ required: true, minLength: 5 })}
                  name="name"
                  type="text"
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      user_name: e.target.value,
                    })
                  }
                />
                <label className="mb-6 text-black">Phone</label>
                <input
                  className="rounded bg-gray-400 focus:outline-none py-1 px-1 block mb-2 w-full sm:w-full"
                  // type="text"
                  // name="name"change profile picture in react js
                  value={profile ? profile.phone_number : ''}
                  // ref={register({ required: true, minLength: 5 })}
                  name="phone"
                  type="number"
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      phone_number: e.target.value,
                    })
                  }
                />

                <input
                  onClick={refreshPage}
                  // onClick={popUp}
                  type="submit"
                  value="Submit"
                  className="mr-2 mt-5 cursor-pointer bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                />
                <input
                  onClick={cancel}
                  type="button"
                  value="Cancel"
                  className="mr-2 mt-5 cursor-pointer bg-red-700 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                />
              </form>
            </div>
          </div>
          <div className="  mx-auto  px-4 py-12  max-w-screen-lg sm:px-2">
            <div className=" pb-7/5 bg-black rounded-lg max-w-screen-lg w-full ">
              <img
                className="  inset-0 sm:h-auto object-cover rounded-lg  "
                src="/img/cover.jpg"
              />
            </div>
            <div className="px-4 -mt-12 sm:-mt-32  py-4 z-50  ">
              <div className="blur relative h-64 bg-white rounded-lg px-4 py-3 shadow-lg h-48 sm:h-auto">
                <img
                  className="border-solid border-2 border-gray-300 md:-mt-20  sm:mx-auto h-24 w-24 -mt-16 md:h-32 md:w-32 rounded-full   "
                  src={profile ? profile.user_profile : ''}
                />
                <div
                  // onClick={popUp}
                  className="mt-2 flex  text-xl font-bold text-blue-600 text-gray-600"
                >
                  <span className="ml-2 sm:mx-auto ">
                    {profile ? profile.user_name : ''}
                  </span>
                </div>
                <div className=" mt-16">
                  <div className="mb-4 flex -mt-12 sm:justify-center  rounded-md ">
                    <svg
                      className="fill-current text-gray-700 svg-icon h-8 w-8 text-justify"
                      viewBox="0 0 20 20"
                    >
                      <path d="M17.388,4.751H2.613c-0.213,0-0.389,0.175-0.389,0.389v9.72c0,0.216,0.175,0.389,0.389,0.389h14.775c0.214,0,0.389-0.173,0.389-0.389v-9.72C17.776,4.926,17.602,4.751,17.388,4.751 M16.448,5.53L10,11.984L3.552,5.53H16.448zM3.002,6.081l3.921,3.925l-3.921,3.925V6.081z M3.56,14.471l3.914-3.916l2.253,2.253c0.153,0.153,0.395,0.153,0.548,0l2.253-2.253l3.913,3.916H3.56z M16.999,13.931l-3.921-3.925l3.921-3.925V13.931z"></path>
                    </svg>
                    <span className="text-gray-700 text-lg font-semibold">
                      {profile ? profile.user_email : ''}
                    </span>
                  </div>
                  <div className="flex mt-1 sm:justify-center rounded-md ">
                    <svg
                      className="text-gray-700 fill-current svg-icon h-8 w-8 text-justify"
                      viewBox="0 0 20 20"
                    >
                      <path d="M13.372,1.781H6.628c-0.696,0-1.265,0.569-1.265,1.265v13.91c0,0.695,0.569,1.265,1.265,1.265h6.744c0.695,0,1.265-0.569,1.265-1.265V3.045C14.637,2.35,14.067,1.781,13.372,1.781 M13.794,16.955c0,0.228-0.194,0.421-0.422,0.421H6.628c-0.228,0-0.421-0.193-0.421-0.421v-0.843h7.587V16.955z M13.794,15.269H6.207V4.731h7.587V15.269z M13.794,3.888H6.207V3.045c0-0.228,0.194-0.421,0.421-0.421h6.744c0.228,0,0.422,0.194,0.422,0.421V3.888z"></path>
                    </svg>
                    <span className="text-gray-700 text-lg font-semibold">
                      {profile ? profile.phone_number : ''}
                    </span>
                  </div>
                  <input
                    type="button"
                    value="Edit Profile"
                    onClick={popUp}
                    className="focus:outline-none float-right mt-4 sm:-mt-12 bg-no-repeat border-blue-500 border-2 px-3 py-2 bg-blue-400 rounded-full hover:bg-blue-200 hover:text-gray-600 text-white cursor-pointer"
                  />
                </div>
              </div>
            </div>
            <div>
              {/* {datas.map((data) => ( */}
              <div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Game */}
                  <div className="bg-gray-200 rounded-lg px-2 py-2 shadow-lg">
                    <center>
                      <h1 className="mb-2 font-bold text-lg">Your Game</h1>
                    </center>
                    {/* <div className="mx-auto  hover:-translate-y-1 max-w-sm bg-white hover:shadow-lg cursor-pointer rounded overflow-hidden">
          <img className="w-full" src="/img/quizbackground.png" />
          <div className=" py-4">
            <div className="font-bold text-xl mb-2 text-center">
              <h1>General Knowledge</h1>
            </div>
          </div>
          <div className=" px-2 mb-2">
            <div>
              {scoress.slice(0, 3).map((res) => {
                return (
                  <div className="grid grid-cols-1 mb-2">
                    <span className=" px-2 py-1 inline-block leading-none bg-teal-200 text-teal-800 rounded-full font-semibold uppercase tracking-wide text-xs">
                      Score : {res.score}
                    </span>
                  </div>
                );
              })}
            </div>
            <button
              onClick={() => {
                setShow(true);
                // setHistory(data);
                document.body.style.overflow = "hidden";
              }}
              className="focus:outline-none bg-blue-400 px-2 rounded-full mt-2 hover:bg-blue-200"
            >
              Show More
            </button>
          </div>
        </div> */}

                    {/* <div className="grid grid-cols-2 gap-2">
          {historyData.map((data) => {
            const { img, title, score } = data;
            return (
              <div className="transition duration-500 ease-in-out transform hover:-translate-y-1 max-w-sm bg-white hover:shadow-lg cursor-pointer rounded overflow-hidden">
                <img className="w-full" src={img} />
                <div className=" py-4">
                  <div className="font-bold text-xl mb-2 text-center">
                    <h1>{title}</h1>
                  </div>
                </div>
                <div className=" px-2 mb-2">
                  <div>
                    {score.slice(0, 3).map((res) => {
                      return (
                        <div className="grid grid-cols-1 mb-2">
                          <span className=" px-2 py-1 inline-block leading-none bg-teal-200 text-teal-800 rounded-full font-semibold uppercase tracking-wide text-xs">
                            Score : {res}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <button
                    onClick={() => {
                      setShow(true);
                      setHistory(data);
                      document.body.style.overflow = "hidden";
                    }}
                    className="focus:outline-none bg-blue-400 px-2 rounded-full mt-2 hover:bg-blue-200"
                  >
                    Show More
                  </button>
                </div>
              </div>
            );
          })}
        </div> */}

                    <div className="grid grid-cols-2 gap-2">
                      <div className="  hover:-translate-y-1 max-w-sm bg-white hover:shadow-lg cursor-pointer rounded overflow-hidden">
                        <img className="w-full" src="/img/quizbackground.png" />
                        <div className=" py-4">
                          <div className="font-bold text-xl mb-2 text-center">
                            <h1>Calculating</h1>
                          </div>
                        </div>
                        {calculating.length === 0 ? (
                          <div className="px-2">
                            <h1 className="mx-auto text-center">
                              Your didn't play this game
                            </h1>
                            <Link to="/calculate">
                              <button className="mb-2 focus:outline-none bg-green-500 px-2 rounded-full mt-2 hover:bg-green-300">
                                Play
                              </button>
                            </Link>
                          </div>
                        ) : (
                          <div className=" px-2 mb-2">
                            {calculating.length < 4 ? (
                              <div>
                                {calculating.map((res) => (
                                  <div className="grid grid-cols-1 mb-2">
                                    <span className=" px-2 py-1 inline-block leading-none bg-teal-200 text-teal-800 rounded-full font-semibold uppercase tracking-wide text-xs">
                                      Score : {res.score}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div>
                                <div>
                                  {calculating.slice(0, 3).map((res) => {
                                    return (
                                      <div className="grid grid-cols-1 mb-2">
                                        <span className=" px-2 py-1 inline-block leading-none bg-teal-200 text-teal-800 rounded-full font-semibold uppercase tracking-wide text-xs">
                                          Score : {res.score}
                                        </span>
                                      </div>
                                    );
                                  })}
                                </div>
                                <button
                                  onClick={() => {
                                    setShow(true);
                                    // setHistory(data);
                                    document.body.style.overflow = 'hidden';
                                  }}
                                  className="focus:outline-none bg-blue-400 px-2 rounded-full mt-2 hover:bg-blue-200"
                                >
                                  Show More
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="  hover:-translate-y-1 max-w-sm bg-white hover:shadow-lg cursor-pointer rounded overflow-hidden">
                        <img className="w-full" src="/img/quizbackground.png" />
                        <div className=" py-4">
                          <div className="font-bold text-xl mb-2 text-center">
                            <h1>Histroy</h1>
                          </div>
                        </div>
                        {history.length === 0 ? (
                          <div className="px-2">
                            <h1 className="mx-auto text-center">
                              Your didn't play this game
                            </h1>
                            <Link to="/history">
                              <button className="mb-2 focus:outline-none bg-green-500 px-2 rounded-full mt-2 hover:bg-green-300">
                                Play
                              </button>
                            </Link>
                          </div>
                        ) : (
                          <div className=" px-2 mb-2">
                            {history.length < 4 ? (
                              <div>
                                {history.map((res) => (
                                  <div className="grid grid-cols-1 mb-2">
                                    <span className=" px-2 py-1 inline-block leading-none bg-teal-200 text-teal-800 rounded-full font-semibold uppercase tracking-wide text-xs">
                                      Score : {res.score}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div>
                                <div>
                                  {history.slice(0, 3).map((res) => {
                                    return (
                                      <div className="grid grid-cols-1 mb-2">
                                        <span className=" px-2 py-1 inline-block leading-none bg-teal-200 text-teal-800 rounded-full font-semibold uppercase tracking-wide text-xs">
                                          Score : {res.score}
                                        </span>
                                      </div>
                                    );
                                  })}
                                </div>
                                <button
                                  onClick={handleShowHistory}
                                  // onClick={() => {
                                  //   setShow(true);
                                  //   // setHistory(data);
                                  //   document.body.style.overflow = "hidden";
                                  // }}
                                  className="focus:outline-none bg-blue-400 px-2 rounded-full mt-2 hover:bg-blue-200"
                                >
                                  Show More
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="  hover:-translate-y-1 max-w-sm bg-white hover:shadow-lg cursor-pointer rounded overflow-hidden">
                        <img className="w-full" src="/img/quizbackground.png" />
                        <div className=" py-4">
                          <div className="font-bold text-xl mb-2 text-center">
                            <h1>Science</h1>
                          </div>
                        </div>
                        {scienc.length === 0 ? (
                          <div className="px-2">
                            <h1 className="mx-auto text-center">
                              Your didn't play this game
                            </h1>
                            <Link to="/science">
                              <button className="mb-2 focus:outline-none bg-green-500 px-2 rounded-full mt-2 hover:bg-green-300">
                                Play
                              </button>
                            </Link>
                          </div>
                        ) : (
                          <div className=" px-2 mb-2">
                            {scienc.length < 4 ? (
                              <div>
                                {scienc.map((res) => (
                                  <div className="grid grid-cols-1 mb-2">
                                    <span className=" px-2 py-1 inline-block leading-none bg-teal-200 text-teal-800 rounded-full font-semibold uppercase tracking-wide text-xs">
                                      Score : {res.score}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div>
                                <div>
                                  {scienc.slice(0, 3).map((res) => {
                                    return (
                                      <div className="grid grid-cols-1 mb-2">
                                        <span className=" px-2 py-1 inline-block leading-none bg-teal-200 text-teal-800 rounded-full font-semibold uppercase tracking-wide text-xs">
                                          Score : {res.score}
                                        </span>
                                      </div>
                                    );
                                  })}
                                </div>
                                <button
                                  onClick={handleShowScienc}
                                  className="focus:outline-none bg-blue-400 px-2 rounded-full mt-2 hover:bg-blue-200"
                                >
                                  Show More
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="  hover:-translate-y-1 max-w-sm bg-white hover:shadow-lg cursor-pointer rounded overflow-hidden">
                        <img className="w-full" src="/img/quizbackground.png" />
                        <div className=" py-4">
                          <div className="font-bold text-xl mb-2 text-center">
                            <h1>General Knowledge</h1>
                          </div>
                        </div>
                        {general.length === 0 ? (
                          <div className="px-2">
                            <h1 className="mx-auto text-center">
                              Your didn't play this game
                            </h1>
                            <Link to="/calculate">
                              <button className="mb-2 focus:outline-none bg-green-500 px-2 rounded-full mt-2 hover:bg-green-300">
                                Play
                              </button>
                            </Link>
                          </div>
                        ) : (
                          <div className=" px-2 mb-2">
                            {general.length < 4 ? (
                              <div>
                                {general.map((res) => (
                                  <div className="grid grid-cols-1 mb-2">
                                    <span className=" px-2 py-1 inline-block leading-none bg-teal-200 text-teal-800 rounded-full font-semibold uppercase tracking-wide text-xs">
                                      Score : {res.score}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div>
                                <div>
                                  {general.slice(0, 3).map((res) => {
                                    return (
                                      <div className="grid grid-cols-1 mb-2">
                                        <span className=" px-2 py-1 inline-block leading-none bg-teal-200 text-teal-800 rounded-full font-semibold uppercase tracking-wide text-xs">
                                          Score : {res.score}
                                        </span>
                                      </div>
                                    );
                                  })}
                                </div>
                                <button
                                  onClick={handleSetGeneral}
                                  className="focus:outline-none bg-blue-400 px-2 rounded-full mt-2 hover:bg-blue-200"
                                >
                                  Show More
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Zeetomic */}
                  <div className="bg-gray-200 rounded-lg px-6 py-2 shadow-lg">
                    <center>
                      <h1 className="font-bold mb-2">WALLET</h1>
                    </center>
                    {wallet.email == 'default' ||
                    wallet.id == '' ||
                    wallet.wallet_id == 'default' ||
                    wallet.email == 'default' ? (
                      <form onSubmit={walletSubmit}>
                        <button
                          onClick={getWalletLoading}
                          className="focus:outline-none mb-12 w-full bg-green-500 cursor-pointer hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                          {loaading ? (
                            <img
                              className="justify-center mx-auto w-6 h-6"
                              src={three_dots}
                              alt="loading image"
                              // height="8"
                            />
                          ) : (
                            'Get Wallet'
                          )}
                        </button>
                      </form>
                    ) : (
                      <div>
                        <div
                          style={{ borderRadius: '30px' }}
                          className="mx-auto justify-center flex px-3 py-3 bg-gray-200 wallet-shadow rounded-lg h-56"
                        >
                          <div className="mt-12">
                            <svg
                              className="svg-icon w-24 h-24 fill-current text-gray-500"
                              viewBox="0 0 20 20"
                            >
                              <path
                                // fill="none"
                                d="M4.3,15.249H3.428c-0.241,0-0.436,0.195-0.436,0.436c0,0.241,0.195,0.437,0.436,0.437H4.3c0.241,0,0.436-0.195,0.436-0.437C4.736,15.444,4.541,15.249,4.3,15.249 M6.916,15.249H6.044c-0.241,0-0.436,0.195-0.436,0.436c0,0.241,0.195,0.437,0.436,0.437h0.872c0.241,0,0.436-0.195,0.436-0.437C7.352,15.444,7.157,15.249,6.916,15.249 M13.894,8.271h0.872c0.241,0,0.437-0.195,0.437-0.437c0-0.241-0.195-0.436-0.437-0.436h-0.872c-0.241,0-0.437,0.194-0.437,0.436C13.457,8.077,13.652,8.271,13.894,8.271 M4.3,7.399H3.428c-0.241,0-0.436,0.194-0.436,0.436c0,0.242,0.195,0.437,0.436,0.437H4.3c0.241,0,0.436-0.195,0.436-0.437C4.736,7.594,4.541,7.399,4.3,7.399 M15.638,11.324c-0.241,0-0.436,0.194-0.436,0.436s0.194,0.437,0.436,0.437s0.437-0.195,0.437-0.437S15.879,11.324,15.638,11.324 M14.766,15.249h-0.872c-0.241,0-0.437,0.195-0.437,0.436c0,0.241,0.195,0.437,0.437,0.437h0.872c0.241,0,0.437-0.195,0.437-0.437C15.202,15.444,15.007,15.249,14.766,15.249 M12.149,7.399h-0.872c-0.241,0-0.437,0.194-0.437,0.436c0,0.242,0.195,0.437,0.437,0.437h0.872c0.24,0,0.436-0.195,0.436-0.437C12.585,7.594,12.39,7.399,12.149,7.399 M17.818,9.144V5.655c0-0.939-0.745-1.7-1.676-1.737l-0.104-0.859L9.276,3.88L2.824,2.151l-0.471,1.76H2.119c-0.963,0-1.744,0.781-1.744,1.744v10.466c0,0.963,0.781,1.744,1.744,1.744h13.955c0.963,0,1.744-0.781,1.744-1.744v-1.744c0.963,0,1.744-0.781,1.744-1.745v-1.744C19.562,9.925,18.781,9.144,17.818,9.144 M16.946,5.655v0.242c-0.18-0.104-0.377-0.178-0.589-0.213L16.25,4.801C16.646,4.882,16.946,5.234,16.946,5.655 M15.277,4.029l0.184,1.507l-3.929-1.052L15.277,4.029z M3.44,3.219l9.09,2.436H2.788L3.44,3.219z M1.247,5.655c0-0.481,0.39-0.872,0.871-0.872l-0.24,0.896C1.65,5.711,1.438,5.786,1.247,5.897V5.655z M16.946,16.121c0,0.48-0.392,0.872-0.872,0.872H2.119c-0.482,0-0.872-0.392-0.872-0.872V7.399c0-0.481,0.39-0.872,0.872-0.872h13.955c0.48,0,0.872,0.391,0.872,0.872v1.744h-1.744c-0.964,0-1.745,0.781-1.745,1.744v1.744c0,0.964,0.781,1.745,1.745,1.745h1.744V16.121z M18.69,12.632c0,0.481-0.392,0.873-0.872,0.873h-2.616c-0.482,0-0.873-0.392-0.873-0.873v-1.744c0-0.481,0.391-0.872,0.873-0.872h2.616c0.48,0,0.872,0.391,0.872,0.872V12.632z M12.149,15.249h-0.872c-0.241,0-0.437,0.195-0.437,0.436c0,0.241,0.195,0.437,0.437,0.437h0.872c0.24,0,0.436-0.195,0.436-0.437C12.585,15.444,12.39,15.249,12.149,15.249 M9.533,15.249H8.661c-0.241,0-0.436,0.195-0.436,0.436c0,0.241,0.195,0.437,0.436,0.437h0.872c0.241,0,0.436-0.195,0.436-0.437C9.969,15.444,9.774,15.249,9.533,15.249 M6.916,7.399H6.044c-0.241,0-0.436,0.194-0.436,0.436c0,0.242,0.195,0.437,0.436,0.437h0.872c0.241,0,0.436-0.195,0.436-0.437C7.352,7.594,7.157,7.399,6.916,7.399 M9.533,7.399H8.661c-0.241,0-0.436,0.194-0.436,0.436c0,0.242,0.195,0.437,0.436,0.437h0.872c0.241,0,0.436-0.195,0.436-0.437C9.969,7.594,9.774,7.399,9.533,7.399"
                              ></path>
                            </svg>
                          </div>
                          <div className="mt-12 ml-6">
                            <span className="text-gray-600 text-xl">
                              Balance
                            </span>
                            <h1 className="text-4xl text-gray-800 font-extrabold">
                              4,238,72
                            </h1>
                          </div>
                        </div>
                        <div
                          // style={{ borderRadius: "30px" }}
                          className="mx-auto cursor-pointer justify-center flex px-3 py-3 bg-gray-200 wallet-shadow rounded-lg mt-12"
                        >
                          <div>
                            <svg
                              className="svg-icon w-10 h-10 fill-current text-gray-600"
                              viewBox="0 0 20 20"
                            >
                              <path d="M2.25,12.584c-0.713,0-1.292,0.578-1.292,1.291s0.579,1.291,1.292,1.291c0.713,0,1.292-0.578,1.292-1.291S2.963,12.584,2.25,12.584z M2.25,14.307c-0.238,0-0.43-0.193-0.43-0.432s0.192-0.432,0.43-0.432c0.238,0,0.431,0.193,0.431,0.432S2.488,14.307,2.25,14.307z M5.694,6.555H18.61c0.237,0,0.431-0.191,0.431-0.43s-0.193-0.431-0.431-0.431H5.694c-0.238,0-0.43,0.192-0.43,0.431S5.457,6.555,5.694,6.555z M2.25,8.708c-0.713,0-1.292,0.578-1.292,1.291c0,0.715,0.579,1.292,1.292,1.292c0.713,0,1.292-0.577,1.292-1.292C3.542,9.287,2.963,8.708,2.25,8.708z M2.25,10.43c-0.238,0-0.43-0.192-0.43-0.431c0-0.237,0.192-0.43,0.43-0.43c0.238,0,0.431,0.192,0.431,0.43C2.681,10.238,2.488,10.43,2.25,10.43z M18.61,9.57H5.694c-0.238,0-0.43,0.192-0.43,0.43c0,0.238,0.192,0.431,0.43,0.431H18.61c0.237,0,0.431-0.192,0.431-0.431C19.041,9.762,18.848,9.57,18.61,9.57z M18.61,13.443H5.694c-0.238,0-0.43,0.193-0.43,0.432s0.192,0.432,0.43,0.432H18.61c0.237,0,0.431-0.193,0.431-0.432S18.848,13.443,18.61,13.443z M2.25,4.833c-0.713,0-1.292,0.578-1.292,1.292c0,0.713,0.579,1.291,1.292,1.291c0.713,0,1.292-0.578,1.292-1.291C3.542,5.412,2.963,4.833,2.25,4.833z M2.25,6.555c-0.238,0-0.43-0.191-0.43-0.43s0.192-0.431,0.43-0.431c0.238,0,0.431,0.192,0.431,0.431S2.488,6.555,2.25,6.555z"></path>
                            </svg>
                          </div>
                          <div>
                            <h1 className="ml-6 text-gray-700 font-medium text-2xl">
                              Transaction
                            </h1>
                          </div>
                        </div>
                        <div
                          // style={{ borderRadius: "30px" }}
                          className="mx-auto cursor-pointer justify-center flex px-3 py-3 bg-gray-200 wallet-shadow rounded-lg mt-2"
                        >
                          <div>
                            <svg
                              className="svg-icon h-10 w-10 fill-current text-gray-600"
                              viewBox="0 0 20 20"
                            >
                              <path d="M13.889,11.611c-0.17,0.17-0.443,0.17-0.612,0l-3.189-3.187l-3.363,3.36c-0.171,0.171-0.441,0.171-0.612,0c-0.172-0.169-0.172-0.443,0-0.611l3.667-3.669c0.17-0.17,0.445-0.172,0.614,0l3.496,3.493C14.058,11.167,14.061,11.443,13.889,11.611 M18.25,10c0,4.558-3.693,8.25-8.25,8.25c-4.557,0-8.25-3.692-8.25-8.25c0-4.557,3.693-8.25,8.25-8.25C14.557,1.75,18.25,5.443,18.25,10 M17.383,10c0-4.07-3.312-7.382-7.383-7.382S2.618,5.93,2.618,10S5.93,17.381,10,17.381S17.383,14.07,17.383,10"></path>
                            </svg>
                          </div>
                          <div>
                            <Link to="/send">
                              <h1 className="ml-6 text-gray-700 font-medium text-2xl">
                                Send
                              </h1>
                            </Link>
                          </div>
                        </div>
                        <div
                          // style={{ borderRadius: "30px" }}
                          className="mx-auto cursor-pointer justify-center flex px-3 py-3 bg-gray-200 wallet-shadow rounded-lg mt-2"
                        >
                          <div>
                            <svg
                              className="svg-icon h-10 w-10 fill-current text-gray-600"
                              viewBox="0 0 20 20"
                            >
                              <path d="M13.962,8.885l-3.736,3.739c-0.086,0.086-0.201,0.13-0.314,0.13S9.686,12.71,9.6,12.624l-3.562-3.56C5.863,8.892,5.863,8.611,6.036,8.438c0.175-0.173,0.454-0.173,0.626,0l3.25,3.247l3.426-3.424c0.173-0.172,0.451-0.172,0.624,0C14.137,8.434,14.137,8.712,13.962,8.885 M18.406,10c0,4.644-3.763,8.406-8.406,8.406S1.594,14.644,1.594,10S5.356,1.594,10,1.594S18.406,5.356,18.406,10 M17.521,10c0-4.148-3.373-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.147,3.374,7.521,7.521,7.521C14.148,17.521,17.521,14.147,17.521,10"></path>
                            </svg>
                          </div>
                          <div>
                            <Link to="/recieve">
                              <h1 className="ml-6 text-gray-700 font-medium text-2xl">
                                Recieve
                              </h1>
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Profile;
