import React, { useState, useEffect } from "react";
import publicResult from "./data/publicResult.json";
import Navbar from "../layouts/Navbar.js";
import axios from "axios";
import useAxios from "axios-hooks";

var accessTokenObj = localStorage.getItem("token");
function PublicResult() {
  const [scoress, setScore] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: "https://backend.satisyou.com/public-rank",
      headers: {
        "Content-type": "application/json",
        token: accessTokenObj,
      },
    })
      // .then((res) => res.json())
      .then((res) => {
        // const scoress = res.data;
        setScore(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  // const [
  //   { data, loading, error },
  //   //  refetch
  // ] = useAxios({
  //   method: "get",
  //   url: "https://backend.satisyou.com/public-rank",
  //   headers: {
  //     "Content-Type": "application/json",
  //     token: accessTokenObj,
  //     // token: accessTokenObjs,
  //   },
  // });

  // if (loading) return <p>Loading...</p>;
  // if (error) return window.location.replace("/login");
  // if (data) {
  //   console.log(data);
  //   if (scoress === []) {
  //     setScore({ ...data });
  //   }
  // }

  return (
    <React.Fragment>
      {/* {scoress.map((res) => {
        return <div>{res.email}</div>;
      })} */}

      <div>
        <Navbar />
        {/* {scoress.map((d) => (
          <div>{d.score}</div>
        ))}
        <center>
          <h1 className="font-bold text-xl" style={{ marginTop: "20px" }}>
            Hight Score
          </h1>
        </center> */}
        {/* <div className="mx-auto">
          {scoress.map((res) => (
            <div>
              {res.score}
              {res.playername}
            </div>
          ))}
        </div> */}
        <div className="grid lg:grid-cols-2 gap-2">
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
        </div>
      </div>
    </React.Fragment>
  );
}

export default PublicResult;
