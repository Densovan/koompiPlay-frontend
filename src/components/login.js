import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, Redirect } from "react-router-dom";
// import ParticlesBg from "particles-bg";
import jwt from "jsonwebtoken";
import three_dots from "../assets/bars.svg";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import Message from "../components/Message/Message";
import Facebook from "../components/SocialLogin/FacbookLogin";
// import successMessage from "../components/Message/SuccessMessage";
import SuccessMessage from "../components/Message/SuccessMessage";
import { PostData } from "../components/Services/PostData";

const Login = () => {
  const { register, handleSubmit, errors } = useForm();
  const [message, setMessage] = useState("");
  const [successMessage, setSucessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [face, setFace] = useState({
    redirectToReferrer: false,
  });
  const onSubmit = (data) => {
    fetch(" http://localhost:8000/login", {
      method: "POST",
      // headers: {
      //   Accept: "application/json, text/plain, */*",
      //   "Content-type": "application/json",
      // },

      body: JSON.stringify({
        // user_name: data.Username,
        user_email: data.Email,
        user_password: data.Password,
      }),
    })
      // setMessage("File Upload")
      .then((res) => res.json())
      .then((data) => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 3000);
        localStorage.setItem("token", data.string);
        console.log("data", data.string);

        const decodeToken = jwt.decode(data.string);
        console.log(decodeToken);
        if (decodeToken) {
          setSucessMessage("Successfull");
          setTimeout(() => {
            setSucessMessage();
          }, 3000);
          window.location.replace("/");
        } else {
          setMessage("login failed");
          setTimeout(() => {
            setMessage();
          }, 3000);
        }
        // if (!data) {
        //   console.log(data);
        //   alert(data);
        // } else {
        //   window.location.replace("/start");
        //   console.log(data)
        // }
      })
      .catch((err) => {
        alert(err);
        // console.log(err.res.data);
      });
  };
  const signup = (res, type) => {
    let postData;
    if (type === "facebook" && res.email) {
      postData = {
        name: res.name,
        provider: type,
        email: res.email,
        provider_id: res.id,
        token: res.accessToken,
        provider_pic: res.picture.data.url,
      };
    }
    if (type === "google" && res.w3) {
      postData = {
        name: res.w3.ig,
        provider: type,
        email: res.w3.U3,
        provider_id: res.El,
        token: res.Zi.access_token,
        provider_pic: res.w3.Paa,
      };
    }

    if (postData) {
      PostData("singup", postData).then((result) => {
        let responeJson = result;
        if (responeJson.userData) {
          sessionStorage.setItem("userData", JSON.stringify(responeJson));
          setFace({ redirectToReferrer: true });
        }
      });
    }
  };

  //Signup with google
  const responseGoogle = (response) => {
    console.log(response);
    signup(response, "google");
    // console.log(response.profileObj);
  };

  //Signup with Facebook
  const responseFacebook = (response) => {
    console.log(response);
    console.log("facebook console");
    signup(response, "facebook");
  };
  const componentClicked = () => {
    console.log("clicked");
  };
  if (face.redirectToReferrer || sessionStorage.getItem("userData")) {
    return <Redirect to={"/profile"} />;
  }

  return (
    <React.Fragment>
      {message ? <Message msg={message} /> : null}
      {successMessage ? <SuccessMessage msg={successMessage} /> : null}
      <div className="flex  items-center justify-center h-screen ">
        {/* <ParticlesBg type="ball" bg={true} /> */}
        <div className="w-full max-w-md">
          <form
            // style={{ backgroundColor: "rgb(250, 255, 255, 0.625)" }}
            className="blur bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="text-gray-900 font-medium flex text-3xl  items-center justify-center mb-10">
              Login
            </h1>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                ref={register({ required: true, minLength: 1 })}
                name="Email"
                type="email"
              />
              {errors.Username && (
                <p className="text-red-500 text-xs italic">
                  First Name required
                </p>
              )}
            </div>
            <div className="mb-3">
              <label className="block text-gray-700 text-sm font-bold  mb-2">
                Password
              </label>
              <input
                className=" appearance-none border  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                ref={register({ required: true, minLength: 8 })}
                name="Password"
                type="password"
              />
              {errors.Password && (
                <p className="text-red-500 text-xs italic">Password required</p>
              )}
            </div>
            {/* <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign In
            </button>
            <span
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Forgot Password?
            </span>
          </div> */}
            <span
              className="mb-4 cursor-pointer inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Forgot Password?
            </span>
            <button
              type="submit"
              className="focus:outline-none mb-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {loading ? (
                <img
                  className="justify-center mx-auto w-6 h-6"
                  src={three_dots}
                  alt="loading image"
                  // height="8"
                />
              ) : (
                "Sign In"
              )}
            </button>
            <p className="text-center text-gray-600 mb-2">Login With</p>
            <div className="flex justify-center">
              <FacebookLogin
                textButton=""
                cssClass="bg-blue-600 w-8 h-8 rounded-full focus:outline-none"
                appId="1095052497541475"
                // autoLoad={true}
                fields="name,email,picture"
                icon="fa-facebook"
                callback={responseFacebook}
                onClick={componentClicked}
              />
              <div className="pl-2">
                <GoogleLogin
                  className="pl-12"
                  render={(renderProps) => (
                    <button
                      className=" bg-red-600 w-8 h-8 rounded-full focus:outline-none "
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      {/* <svg
                        className="svg-icon w-8 h-8 pl-2"
                        viewBox="0 0 20 20"
                      >
                        <path d="M8.937,10.603c-0.383-0.284-0.741-0.706-0.754-0.837c0-0.223,0-0.326,0.526-0.758c0.684-0.56,1.062-1.297,1.062-2.076c0-0.672-0.188-1.273-0.512-1.71h0.286l1.58-1.196h-4.28c-1.717,0-3.222,1.348-3.222,2.885c0,1.587,1.162,2.794,2.726,2.858c-0.024,0.113-0.037,0.225-0.037,0.334c0,0.229,0.052,0.448,0.157,0.659c-1.938,0.013-3.569,1.309-3.569,2.84c0,1.375,1.571,2.373,3.735,2.373c2.338,0,3.599-1.463,3.599-2.84C10.233,11.99,9.882,11.303,8.937,10.603 M5.443,6.864C5.371,6.291,5.491,5.761,5.766,5.444c0.167-0.192,0.383-0.293,0.623-0.293l0,0h0.028c0.717,0.022,1.405,0.871,1.532,1.89c0.073,0.583-0.052,1.127-0.333,1.451c-0.167,0.192-0.378,0.293-0.64,0.292h0C6.273,8.765,5.571,7.883,5.443,6.864 M6.628,14.786c-1.066,0-1.902-0.687-1.902-1.562c0-0.803,0.978-1.508,2.093-1.508l0,0l0,0h0.029c0.241,0.003,0.474,0.04,0.695,0.109l0.221,0.158c0.567,0.405,0.866,0.634,0.956,1.003c0.022,0.097,0.033,0.194,0.033,0.291C8.752,14.278,8.038,14.786,6.628,14.786 M14.85,4.765h-1.493v2.242h-2.249v1.495h2.249v2.233h1.493V8.502h2.252V7.007H14.85V4.765z"></path>
                      </svg> */}
                      <img src="https://img.icons8.com/color/34/000000/google-plus--v1.png" />
                    </button>
                  )}
                  clientId="1001069899717-m5ivlhe573nv3hlkupraml1g385s5kd3.apps.googleusercontent.com"
                  buttonText="Google"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={"single_host_origin"}
                ></GoogleLogin>
              </div>
            </div>

            <p className="text-center text-gray-600 mb-4">
              Don't hava an account yet?
            </p>
            {/* <span className="text-blue-500">
            <Link to="/register">register now</Link>
          </span> */}
            <Link to="/register">
              <button
                type="submit"
                className="focus:outline-none mb-6 w-full border text-blue-700 hover:bg-gray-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Create account
              </button>
            </Link>

            <p className="text-center text-gray-600 ">Terms and conditions</p>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
