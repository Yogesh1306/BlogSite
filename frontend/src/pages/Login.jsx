import { NavLink } from "react-router";
import { useContext, useRef } from "react";
import axios from "axios";
import { Context } from "../context/Context";

const Login = () => {
  const userRef = useRef();
  const passwordRef = useRef();
  const {dispatch, isFetching} = useContext(Context);


  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({type: "LOGIN_START"});
    //lOGIN LOGIC
    try {
        const res = await axios.post("/api/v1/users/Login", {
            username: userRef.current.value,
            password: passwordRef.current.value
        })
        dispatch({type: "LOGIN_SUCCESS", payload: res.data.data});
    } catch (error) {
        console.log(error);
        dispatch({type: "LOGIN_FAILURE"});
    }
  };

  return (
    <div className="flex justify-center items-center relative ">
      <div className="relative w-full">
        <img
          className="w-full h-[92.7vh] z-1 "
          src="src\assets\login_background.jpeg"
          alt=""
        />
        <div className="absolute top-0 z-2 w-full h-[92.7vh] bg-linear-to-r from-gray-600 to-white-100"></div>
      </div>
      <form
        className="absolute top-50 bg-[rgba(255, 255, 255, 0.334)] shadow-teal-400 shadow-inner rounded-xl p-3 z-3 flex flex-col justify-center items-center gap-4 w-[20vw]"
        onSubmit={handleLogin}
      >
        <span className="text-3xl text-white">Login</span>
        <div className="flex flex-col p-1 w-full gap-3">
          <label className="text-xl text-white" htmlFor="username">
            Username
          </label>
          <input
            className="border-b border-b-gray-400 bg-white py-2 px-2 rounded-lg focus:outline-0"
            type="text"
            id="username"
            placeholder="Enter your username...."
            ref={userRef}
          />
        </div>
        <div className="flex flex-col p-1 w-full gap-3">
          <label className="text-xl text-white" htmlFor="password">
            Password
          </label>
          <input
            className="border-b border-b-gray-400 bg-white py-2 px-2 rounded-lg focus:outline-0"
            type="password"
            id="password"
            placeholder="Enter your password...."
            ref={passwordRef}
          />
        </div>
        <div className="w-full">
          <button className="w-full p-2 rounded-xl bg-teal-500 text-white cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed" type="submit" disabled={isFetching}>
            Login
          </button>
        </div>
      </form>
      <div className="absolute top-0 right-0 p-3 z-3">
        <NavLink to="/register">
          <button
            onClick={() => {
              console.log("clicked");
            }}
            className=" py-2 px-4 rounded-xl bg-teal-600 text-white cursor-pointer"
          >
            Register
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default Login;
