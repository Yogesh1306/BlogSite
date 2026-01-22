import { NavLink, useNavigate } from "react-router";
import { useContext, useRef, useState } from "react";
import { Context } from "../context/Context";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { Close, Visibility, VisibilityOff } from "@mui/icons-material";
import api from "../api/api";

const Login = () => {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    //lOGIN LOGIC
    try {
      const res = await api.post("/api/v1/users/Login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const userDetails = {
          username: result.user.displayName,
          email: result.user.email,
          profilePic: result.user.photoURL,
        };
        dispatch({ type: "LOGIN_START" });
        const res = await api.post("/api/v1/users/google", userDetails)
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.data });
        navigate("/");
      })
      .catch((error) => {
        dispatch({ type: "LOGIN_FAILURE" });
        console.log("error while logging with google: ", error);
      });
  };

  return (
    <>
      <div className="flex justify-center items-center relative min-h-screen ">
        <div className="relative w-full ">
          <img
            className="w-full h-[100vh] z-1 object-cover bg-no-repeat"
            src="src\assets\login_background.jpeg"
            alt=""
          />
          <div className="absolute top-0 z-2 w-full min-h-screen bg-linear-to-r from-gray-600 to-white-100"></div>
        </div>
        <div className="absolute top-30 bg-[rgba(255, 255, 255, 0.334)] shadow-teal-400 shadow-inner rounded-xl p-4 z-3 flex flex-col  gap-4 w-[25vw]">
          <div className="">
            <h1 className="text-2xl font-semibold text-white text-center">
              Sign in
            </h1>
            <p className="text-sm text-white/80 text-center mt-1">
              Welcome back
            </p>

            <form className="mt-6 space-y-8 w-full">
              <div className="relative">
                <input
                  type="text"
                  name="text"
                  id="text"
                  placeholder="you@example.com"
                  className="peer w-full px-2 py-2 rounded-lg bg-white/30 text-black placeholder-transparent outline-none focus:ring-2  focus:ring-blue-300 "
                  ref={userRef}
                />
                <label
                  htmlFor="text"
                  className="absolute -top-3.5 left-2 block text-white/70 mb-1 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown: text-base peer-focus:-top-3.5"
                >
                  Username or Email
                </label>
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="peer w-full px-2 py-2 rounded-lg bg-white/30 text-white placeholder-transparent outline-none focus:ring-2 focus:ring-white/50"
                  ref={passwordRef}
                />
                <label className="absolute -top-3.5 left-2 block  text-white mb-1 peer-placeholder-shown:top-2 peer-placeholder-shown: text-base peer-focus:-top-3.5">
                  Password
                </label>
                <div className="absolute top-2 right-2">
                  <button
                    type="button"
                    className=""
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </button>
                </div>
              </div>

              <button
                type="button"
                className="w-full mt-2 py-2 rounded-lg bg-white text-indigo-600 font-medium hover:bg-white/90 transition cursor-pointer"
                onClick={handleLogin}
                disabled={isFetching}
              >
                Sign in
              </button>
            </form>

            <div className="flex items-center gap-3 my-6">
              <div className="h-px flex-1 bg-white/40" />
              <span className="text-sm text-white/80">Or continue with</span>
              <div className="h-px flex-1 bg-white/40" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                className="flex items-center justify-center gap-2 py-2 rounded-lg bg-white/30 text-white hover:bg-white/40 transition cursor-pointer"
                onClick={signInWithGoogle}
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="w-5 h-5"
                />
                Google
              </button>

              <button
                type="button"
                className="flex items-center justify-center gap-2 py-2 rounded-lg bg-white/30 text-white hover:bg-white/40 transition cursor-pointer"
              >
                <img
                  src="https://www.svgrepo.com/show/512317/github-142.svg"
                  alt="GitHub"
                  className="w-5 h-5 invert"
                />
                GitHub
              </button>
            </div>
            <NavLink to={"/"}>
              <div className="absolute top-4 right-3 cursor-pointer">
                <Close className="text-white" />
              </div>
            </NavLink>
          </div>
        </div>
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
    </>
  );
};

export default Login;
