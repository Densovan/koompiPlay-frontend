import React, { useState, useEffect } from 'react';
import publicResult from './data/publicResult.json';
import Navbar from '../layouts/Navbar.js';
import axios from 'axios';
import useAxios from 'axios-hooks';

var accessTokenObj = localStorage.getItem('token');
function PublicResult() {
  // const [scoress, setScore] = useState([]);
  const [general, setGeneral] = useState([]);
  const [history, setHistory] = useState([]);
  const [science, setScience] = useState([]);
  const [calculating, setCalculating] = useState([]);
  const [rank, setRank] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  useEffect(() => {
    axios({
      method: 'GET',
      url: 'https://backend.rielcoin.com/general-top',
      headers: {
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

  // History rest api
  useEffect(() => {
    axios({
      method: 'GET',
      url: 'https://backend.rielcoin.com/history-top',
      headers: {
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
  //Science rest api
  useEffect(() => {
    axios({
      method: 'GET',
      url: 'https://backend.rielcoin.com/science-top',
      headers: {
        'Content-type': 'application/json',
        token: accessTokenObj,
      },
    })
      // .then((res) => res.json())
      .then((res) => {
        // const scoress = res.data;
        setScience(res.data);
        console.log('Science', res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //Calculating res api
  useEffect(() => {
    axios({
      method: 'GET',
      url: 'https://backend.rielcoin.com/calculating-top',
      headers: {
        'Content-type': 'application/json',
        token: accessTokenObj,
      },
    })
      // .then((res) => res.json())
      .then((res) => {
        // const scoress = res.data;
        setCalculating(res.data);
        console.log('Calculating', res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <React.Fragment>
      <div
      // style={{
      //   backgroundColor: "#cbd5e0",
      //   height: "100vh",
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      //   backgroundRepeat: "cover",
      // }}
      >
        <Navbar />
        <center>
          <h1 className="text-4xl font-bold mt-6 text-gray-800">
            Rank Score Board
          </h1>
        </center>
        {/* <div className="grid lg:grid-cols-2 gap-2">
          {publicResult.map((res) => {
            const { title, score } = res;
            return (
              <React.Fragment>
                <div className="container bg-gray-800 rounded-lg px-4 py-4 mt-16">
                  <h1 className="text-center font-bold text-white mb-5">
                    {title}
                  </h1>
                  <div className="grid grid-cols-3">
                    <div className="text-xl text-white px-2">Rank</div>
                    <div className="text-xl text-white ">Name</div>
                    <div className="text-xl text-white ">Score</div>
                  </div>
                  <div>
                    {score.slice(0, 10).map((ress, index) => {
                      return (
                        <div className="grid grid-cols-3 ">
                          <div className="bg-gray-400 py-3 rounded-l-lg mb-3 px-2">
                            <h1 className="text-xl">{index + 1}</h1>
                          </div>
                          <div className="bg-gray-400 py-3 mb-3">
                            <h1 className="text-xl">{ress.name}</h1>
                          </div>
                          <div className="bg-gray-400 py-3 rounded-r-lg mb-3">
                            <h1 className="text-xl">{ress.scores}</h1>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div> */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 rounded-full px-4 py-4 mt-16">
          <div className="container shadow-lg bg-gray-800 rounded-lg px-4 py-4">
            <h1 className="text-center text-3xl  font-bold text-white mb-5">
              General Knowledge
            </h1>
            <div className="grid grid-cols-3">
              <div className="text-xl text-white px-2">Rank</div>
              <div className="text-xl text-white ">Name</div>
              <div className="text-xl text-white ">Score</div>
            </div>
            <div>
              {general.slice(0, 10).map((ress, index) => {
                return (
                  <div className="grid grid-cols-3 rounded-full mb-2 ">
                    <div className="bg-gray-400  py-1 rounded-l-full  px-6">
                      <h1 className="text-xl">{index + 1}</h1>
                    </div>
                    <div className=" bg-gray-400 py-1 ">
                      <h1 className="text-xl">{ress.playername}</h1>
                    </div>
                    <div className="bg-gray-400 py-1 rounded-r-full ">
                      <h1 className="text-xl">{ress.score}</h1>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="container shadow-lg bg-gray-800 rounded-lg px-4 py-4">
            <h1 className="text-center  text-3xl font-bold text-white mb-5">
              World History
            </h1>
            <div className="grid grid-cols-3">
              <div className="text-xl text-white px-2">Rank</div>
              <div className="text-xl text-white ">Name</div>
              <div className="text-xl text-white ">Score</div>
            </div>
            <div>
              {history.slice(0, 10).map((ress, index) => {
                return (
                  <div className="grid grid-cols-3 rounded-full mb-2 ">
                    <div className="bg-gray-400 py-1 rounded-l-full  px-6">
                      <h1 className="text-xl">{index + 1}</h1>
                    </div>
                    <div className="bg-gray-400 py-1">
                      <h1 className="text-xl">{ress.playername}</h1>
                    </div>
                    <div className="bg-gray-400 py-1 rounded-r-full">
                      <h1 className="text-xl">{ress.score}</h1>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="container shadow-lg bg-gray-800 rounded-lg px-4 py-4">
            <h1 className="text-center  text-3xl font-bold text-white mb-5">
              Science
            </h1>
            <div className="grid grid-cols-3">
              <div className="text-xl text-white px-2">Rank</div>
              <div className="text-xl text-white ">Name</div>
              <div className="text-xl text-white ">Score</div>
            </div>
            <div>
              {science.slice(0, 10).map((ress, index) => {
                return (
                  <div className="grid grid-cols-3 rounded-full mb-2 ">
                    <div className="bg-gray-400 py-1 rounded-l-full  px-6">
                      <h1 className="text-xl">{index + 1}</h1>
                    </div>
                    <div className="bg-gray-400 py-1">
                      <h1 className="text-xl">{ress.playername}</h1>
                    </div>
                    <div className="bg-gray-400 py-1 rounded-r-full">
                      <h1 className="text-xl">{ress.score}</h1>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="container shadow-lg bg-gray-800 rounded-lg px-4 py-4">
            <h1 className="text-center  text-3xl font-bold text-white mb-5">
              Calculating
            </h1>
            <div className="grid grid-cols-3">
              <div className="text-xl text-white px-2">Rank</div>
              <div className="text-xl text-white ">Name</div>
              <div className="text-xl text-white ">Score</div>
            </div>
            <div>
              {calculating.slice(0, 10).map((ress, index) => {
                return (
                  <div className="grid grid-cols-3 rounded-full mb-2 ">
                    <div className="bg-gray-400 py-1 rounded-l-full  px-6">
                      <h1 className="text-xl">{index + 1}</h1>
                    </div>
                    <div className="bg-gray-400 py-1">
                      <h1 className="text-xl">{ress.playername}</h1>
                    </div>
                    <div className="bg-gray-400 py-1 rounded-r-full">
                      <h1 className="text-xl">{ress.score}</h1>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default PublicResult;
