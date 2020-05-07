import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpne] = useState(false);
  const toggle = () => {
    setOpne(!open);
  };
  return (
    <div>
      <header className="sm:items-center bg-gray-900 sm:flex sm:items-center sm:justify-between">
        <div className="flex justify-between bg-gray-900 px-4 py-3">
          <div>
            <img className="h-8 w-auto" src="/img/Koompi-White.png" />
          </div>
          <div className="flex">
            <button
              onClick={toggle}
              className="px-2 focus:outline-none hover:text-white focus:text-white sm:hidden "
            >
              <svg
                className="h-6 w-6 fill-current text-gray-500 "
                viewBox="0 0 24 24"
              >
                {open ? (
                  <path d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z" />
                ) : (
                  <path d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
                )}
              </svg>
            </button>
          </div>
        </div>
        <div className={open ? "block sm:hidden" : "hidden sm:block"}>
          <nav className="sm:flex sm:items-center sm:px-4 ">
            <div className="px-2 pt-2 pb-5 border-b border-gray-800 sm:flex sm:border-b-0 sm:py-0">
              <Link
                to="/start"
                className="sm:px-2 sm:text-sm  block px-3 py-1 rounded font-semibold text-white hover:bg-gray-800"
                href="#"
              >
                Play
              </Link>
              <Link
                to="/logout"
                className="sm:px-2 mt-3 sm:text-sm sm:mt-0 block px-3 py-1 rounded font-semibold text-white hover:bg-gray-800"
                href="#"
              >
                Logout
              </Link>
            </div>
            {/* <div className="px-5 py-5 sm:py-0 sm:px-0 sm:py-0 sm:ml-4 ">
              <div className="flex items-center">
                <img
                  className="sm:h-8 sm:w-8 h-10 w-10 object-cover rounded-full border-2 border-gray-600"
                  src="/image/photo_2019-08-04_14-04-12.jpg"
                ></img>
                <span className="sm:hidden ml-2 font-semibold text-gray-200">
                  Sovan Den
                </span>
              </div>
              <div className="mt-5 sm:hidden">
                <a className=" block text-gray-400 hover:text-white" href="#">
                  Account setting
                </a>
                <a
                  className="mt-3 block text-gray-400 hover:text-white"
                  href="#"
                >
                  Support
                </a>
                <a
                  className="mt-3 block text-gray-400 hover:text-white"
                  href="#"
                >
                  Sign out
                </a>
              </div>
            </div> */}
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
