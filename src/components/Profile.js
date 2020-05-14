import React from "react";

const Profile = () => {
  return (
    <React.Fragment>
      <div className=" flex  items-center justify-center h-screen">
        <div className=" w-full max-w-screen-md">
          <div className="overflow-hidden bg-white shadow-md rounded  ">
            <img src="/img/cover.jpg" />
            <div className=" ">
              <img
                className="overflow-hidden -mt-12 md:ml-6 h-20 w-20 md:h-20 md:w-20 rounded-full mx-auto md:mx-0 "
                src="/img/01-shutterstock_476340928-Irina-Bg.jpg"
              />
            </div>
            <div className="flex justify-center mt-5 font-bold ">
              <div className="p-3 text-pink-500">
                <h1>250</h1>
                <span>Follwer</span>
              </div>
              <div className="p-3 text-pink-500 font-bold">
                <h1>250</h1>
                <span>Follwer</span>
              </div>
              <div className="p-3 text-pink-500 font-bold">
                <h1>250</h1>
                <span>Follwer</span>
              </div>
            </div>
            <div className="flex justify-center">
              <svg
                className="h-6 w-6 fill-current text-pink-500"
                viewBox="0 0 20 20"
              >
                <path d="M17.388,4.751H2.613c-0.213,0-0.389,0.175-0.389,0.389v9.72c0,0.216,0.175,0.389,0.389,0.389h14.775c0.214,0,0.389-0.173,0.389-0.389v-9.72C17.776,4.926,17.602,4.751,17.388,4.751 M16.448,5.53L10,11.984L3.552,5.53H16.448zM3.002,6.081l3.921,3.925l-3.921,3.925V6.081z M3.56,14.471l3.914-3.916l2.253,2.253c0.153,0.153,0.395,0.153,0.548,0l2.253-2.253l3.913,3.916H3.56z M16.999,13.931l-3.921-3.925l3.921-3.925V13.931z"></path>
              </svg>
              <h1>sarimsovanden@gmail.com</h1>
            </div>
            <div className="flex justify-center">
              <svg
                className="h-6 w-6 fill-current text-pink-500"
                viewBox="0 0 20 20"
              >
                <path d="M17.388,4.751H2.613c-0.213,0-0.389,0.175-0.389,0.389v9.72c0,0.216,0.175,0.389,0.389,0.389h14.775c0.214,0,0.389-0.173,0.389-0.389v-9.72C17.776,4.926,17.602,4.751,17.388,4.751 M16.448,5.53L10,11.984L3.552,5.53H16.448zM3.002,6.081l3.921,3.925l-3.921,3.925V6.081z M3.56,14.471l3.914-3.916l2.253,2.253c0.153,0.153,0.395,0.153,0.548,0l2.253-2.253l3.913,3.916H3.56z M16.999,13.931l-3.921-3.925l3.921-3.925V13.931z"></path>
              </svg>
              <h1>sarimsovanden@gmail.com</h1>
            </div>
            <div className="flex justify-center">
              <svg
                className="h-6 w-6 fill-current text-pink-500"
                viewBox="0 0 20 20"
              >
                <path d="M17.388,4.751H2.613c-0.213,0-0.389,0.175-0.389,0.389v9.72c0,0.216,0.175,0.389,0.389,0.389h14.775c0.214,0,0.389-0.173,0.389-0.389v-9.72C17.776,4.926,17.602,4.751,17.388,4.751 M16.448,5.53L10,11.984L3.552,5.53H16.448zM3.002,6.081l3.921,3.925l-3.921,3.925V6.081z M3.56,14.471l3.914-3.916l2.253,2.253c0.153,0.153,0.395,0.153,0.548,0l2.253-2.253l3.913,3.916H3.56z M16.999,13.931l-3.921-3.925l3.921-3.925V13.931z"></path>
              </svg>
              <h1>sarimsovanden@gmail.com</h1>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Profile;
