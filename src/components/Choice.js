import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Navbar from '../layouts/Navbar';

const TITTLE = 'Koompi Play | Options';

const Choice = () => (
  <React.Fragment>
    <Helmet>
      <title>{TITTLE}</title>
    </Helmet>
    <React.Fragment>
      <Navbar />
      <form
        id="choice-bg"
        className=" container  pb-5 mx-auto h-auto relative z-1"
      >
        <h4 className="lg:mt-5 text-center text-6xl font-medium py-5">
          Enjoying!
        </h4>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-8 lg:gap-2 ">
          <div className="background-which-choice max-w-sm rounded shadow-lg">
            <div className="background-history"></div>
            <div className="px-4 ">
              <h1 className="font-bold text-center text-3xl">History</h1>
              <Link to="/science">
                <button
                  type="button"
                  id="option-start"
                  className="flex mx-auto mt-10 text-white font-bold  rounded-full h-16 w-16 items-center justify-center"
                >
                  Start
                </button>
              </Link>
              <div className="px-6  mt-8 mb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                  3k Player
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                  5 Question
                </span>
              </div>
            </div>
          </div>
          <div className="background-which-choice max-w-sm rounded h-full shadow-lg">
            <div className="background-general"></div>
            {/* <img
              className="w-full h-full px-4 py-4 bg-green-100"
              src="/img/General knowledge.png"
              alt="Sunset in the mountains"
            /> */}
            <div className="px-6 py-4">
              <div
                style={{ marginTop: '-22px' }}
                className="font-bold  mb-2 text-center text-3xl"
              >
                General knowledge
              </div>
              <Link to="/general">
                <button
                  type="button"
                  id="option-start"
                  className="flex mx-auto mt-12 text-white font-bold  rounded-full h-16 w-16 items-center justify-center"
                >
                  Start
                </button>
              </Link>
            </div>
            <div className="px-6 py-4">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                3k Player
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                5 Question
              </span>
            </div>
          </div>
          <div className="background-which-choice max-w-sm rounded shadow-lg">
            <div className="science-image"></div>
            <div className="px-4 ">
              <h1 className="font-bold text-center text-3xl">Science</h1>
              <Link to="/science">
                <button
                  type="button"
                  id="option-start"
                  className="flex mx-auto mt-10 text-white font-bold  rounded-full h-16 w-16 items-center justify-center"
                >
                  Start
                </button>
              </Link>
              <div className="px-6  mt-8 mb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                  3k Player
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                  5 Question
                </span>
              </div>
            </div>
          </div>
          <div className="background-which-choice max-w-sm rounded shadow-lg">
            <div className="background-calculating"></div>
            <div className="px-4 ">
              <h1 className="font-bold text-center text-3xl">Calculating</h1>
              <Link to="/calculate">
                <button
                  type="button"
                  id="option-start"
                  className="flex mx-auto mt-10 text-white font-bold  rounded-full h-16 w-16 items-center justify-center"
                >
                  Start
                </button>
              </Link>
              <div className="px-6  mt-8 mb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                  3k Player
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                  5 Question
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* <div
          style={{ width: '90%', marginLeft: 'auto', marginRight: 'auto' }}
          className="sm:flex "
        >
          <div className="hover:shadow-lg max-w-sm mx-auto w-full lg:max-w-full lg:flex md:mt-4">
            <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden">
              <img className="w-full h-full" src="/img/coming.jpg" />
            </div>
            <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
              <div className="mb-8">
                <p className="text-sm text-gray-600 flex items-center">
                  <svg
                    className="fill-current text-gray-500 w-3 h-3 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                  </svg>
                  New Game
                </p>
                <div className="text-gray-900 font-bold text-xl mb-2">
                  Comming soon...
                </div>
                <p className="text-gray-700 text-base">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Voluptatibus quia, nulla! Maiores et perferendis eaque,
                  exercitationem praesentium nihil.
                </p>
              </div>
              <div className="flex items-center">
                <img
                  className="w-10 h-10 rounded-full mr-4"
                  src="/img/card1.jpeg"
                  alt="Avatar of Jonathan Reinink"
                />
                <div className="text-sm">
                  <p className="text-gray-900 leading-none">KoompiPlay teams</p>
                  <p className="text-gray-600">Aug 18</p>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </form>
    </React.Fragment>
    {/* <div className="lg:-mt-64 z-32">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#0099ff"
          fill-opacity="1"
          d="M0,64L80,80C160,96,320,128,480,170.7C640,213,800,267,960,261.3C1120,256,1280,192,1360,160L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
        ></path>
        <h1>hello</h1>
      </svg>
    </div> */}
  </React.Fragment>
);

export default Choice;
