import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, Redirect } from "react-router-dom";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
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

firebase.initializeApp({
  apiKey: "AIzaSyCs-PhYAG1ZEYuF9Hbhinn7Iwh9ZhwrNJ4",
  authDomain: "koompiplay-a02eb.firebaseapp.com",
});

const Login = () => {
  const { register, handleSubmit, errors } = useForm();
  const [message, setMessage] = useState("");
  const [successMessage, setSucessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [face, setFace] = useState({
    redirectToReferrer: false,
  });
  // const [state, setState] = useState({
  //   isSingedIn: false,
  // });
  // const uiConfig = {
  //   signInFlow: "popup",
  //   autoUpgradeAnonymousUsers: true,
  //   signInSuccessUrl: "/",
  //   signInOptions: [
  //     firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  //     firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  //     // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
  //     // firebase.auth.GithubAuthProvider.PROVIDER_ID,
  //     // firebase.auth.EmailAuthProvider.PROVIDER_ID,
  //   ],
  //   callbacks: {
  //     signInSuccess: () => false,
  //     signInSuccess: function (authResult, redirectUrl) {
  //       return true;
  //     },
  //     signInFailure: function (error) {
  //       if (error.code != "firebaseui/anonymous-upgrade-merge-conflict") {
  //         return Promise.resolve();
  //       }
  //     },
  //   },
  // };
  // useEffect(() => {
  //   firebase.auth().onAuthStateChanged((user) => {
  //     setState({ isSingedIn: !!user });
  //     // window.location.replace("/start");
  //     console.log("user", user);
  //     console.log(uiConfig.signInOptions);
  //     // console.log(user.providerData[0].providerId);

  //     if (user.providerData[0].providerId == "google.com") {
  //       let user_external_id = user.uid;
  //       let user_name = user.displayName;
  //       let user_gender = "default";
  //       let user_email = user.email;
  //       let user_profile = user.photoURL;
  //       let login_type = "google";

  //       fetch("http://localhost:8000/all_register", {
  //         method: "POST",
  //         header: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           user_external_id: user_external_id,
  //           user_name: user_name,
  //           user_gender: user_gender,
  //           user_email: user_email,
  //           user_profile: user_profile,
  //           login_type: login_type,
  //         }),
  //       })
  //         .then((res) => res.json())
  //         .then((data) => {
  //           console.log(data.string);
  //         });
  //     } else if (user.providerData[0].providerId == "facebook.com") {
  //       let user_external_id = user.uid;
  //       let user_name = user.displayName;
  //       let user_gender = "default";
  //       let user_email = user.email;
  //       let user_profile = user.photoURL;
  //       let login_type = "facebook";

  //       fetch("http://localhost:8000/all_register", {
  //         method: "POST",
  //         header: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           user_external_id: user_external_id,
  //           user_name: user_name,
  //           user_gender: user_gender,
  //           user_email: user_email,
  //           user_profile: user_profile,
  //           login_type: login_type,
  //         }),
  //       })
  //         .then((res) => res.json())
  //         .then((data) => {
  //           console.log(data.string);
  //         });
  //     }
  //   });
  // }, []);
  const onSubmit = (data) => {
    fetch("http://52.221.199.235:9000/all_login", {
      method: "POST",
      // headers: {
      //   Accept: "application/json, text/plain, */*",
      //   "Content-type": "application/json",
      // },
      // user_external_id: user_external_id,
      // user_name: user_name,
      // user_gender: user_gender,
      // user_email: user_email,
      // user_profile: user_profile,
      // login_type: login_type,

      body: JSON.stringify({
        // user_name: "defualt",
        // user_email: data.Email,
        // user_password: data.Password,
        // phone_number: "defualt",
        // user_profile: "defualt",
        // user_gender: "defualt",
        // login_type: data.login_type,

        user_external_id: "default",
        user_name: "default",
        user_gender: "default",
        user_email: data.Email,
        user_password: data.Password,
        user_profile: "default",
        login_type: "local"
      }),
    })
      // setMessage("File Upload")
      .then((res) => res.json())
      .then((data) => {
        // setLoading(true);
        // setTimeout(() => {
        //   setLoading(false);
        // }, 3000);

        console.log("local login response data: " + data);
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
        // } else {register
        //   window.location.replace("/start");
        //   console.log(data)
        // }
      })
      .catch((err) => {
        alert(err);
        // console.log(err.res.data);
      });
  };
 

  //Signup with google
  const responseGoogle = (response) => {
    // console.log("response: " + response);
    console.log(response);
    // console.log(response.)
    let user = response.profileObj;
    // console.log("google login")
    // let user = response;

    // console.log("user external id: " + user.googleId);
    // console.log("user name: " + user.name);
    // console.log("user gender: " + "default");
    // console.log("user email: " + user.email);
    // console.log("user profile: " + user.imageUrl);
    // console.log("login type: " + "google");

    let user_external_id = user.googleId;
    let user_name = user.name;
    let user_gender = "default";
    let user_email = user.email;
    let user_profile = user.imageUrl;
    let login_type = "google";

    // fetch("http://localhost:8000/all_login", {
    fetch("http://52.221.199.235:9000/all_login", {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_external_id: user_external_id,
        user_name: user_name,
        user_gender: user_gender,
        user_email: user_email,
        user_profile: user_profile,
        login_type: login_type,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.string);
        localStorage.setItem("token", data.string);
      });
    
    // console.log(response.profileObj);
  };

  //Signup with Facebook
  const responseFacebook = (response) => {
    console.log(response);
    console.log("facebook login");
   
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
                appId="305985790418743"
                // appId="2703165819793398"
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
                      <img src="https://img.icons8.com/color/34/000000/google-plus--v1.png" />
                    </button>
                  )}
                  clientId="1001069899717-m5ivlhe573nv3hlkupraml1g385s5kd3.apps.googleusercontent.com"
                  // clientId="1001069899717-m5ivlhe573nv3hlkupraml1g385s5kd3.apps.googleusercontent.com"
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
            {/* <div>
              {state.isSingedIn ? (
                // window.location.replace("/")
                // <h1>heke</h1>
                <button onClick={() => firebase.auth().signOut()}>
                  Sign out!
                </button>
              ) : (
                <StyledFirebaseAuth
                  uiConfig={uiConfig}
                  firebaseAuth={firebase.auth()}
                />
              )}
            </div> */}
            {/* <StyledFirebaseAuth
              uiConfig={uiConfig}
              firebaseAuth={firebase.auth()}
            /> */}

            <p className="text-center text-gray-600 ">Terms and conditions</p>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
