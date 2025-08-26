import { NavLink } from 'react-router';

const Register = () => {
  return (
    <div className="flex justify-center items-center relative ">
            <div className="relative w-full">
                <img className="w-full h-[92.7vh] z-1 object-cover" src="src\assets\register_background.jpeg" alt="" />
                <div className="absolute top-0 z-2 w-full h-[92.7vh] bg-linear-to-r from-gray-500 to-white-100"></div>
            </div>
            <form className="absolute top-40 bg-transparent backdrop-blur-3xl shadow-gray-200 shadow-2xl rounded-xl p-3 z-3 flex flex-col justify-center items-center gap-4 w-[22vw]">
                <span className="text-4xl">Register</span>
                <div className="flex flex-col p-1 w-full gap-3">
                    <label className="text-xl" htmlFor="email">Username</label>
                    <input className="border-b border-b-gray-400 bg-white py-2 px-2 rounded-lg focus:outline-0" type="email" id='email' placeholder='Enter your username....' />
                </div>
                <div className="flex flex-col p-1 w-full gap-3">
                    <label className="text-xl" htmlFor="email">Email</label>
                    <input className="border-b border-b-gray-400 bg-white py-2 px-2 rounded-lg focus:outline-0" type="email" id='email' placeholder='Enter your email....' />
                </div>
                <div className="flex flex-col p-1 w-full gap-3">
                    <label className="text-xl" htmlFor="password">Password</label>
                    <input className="border-b border-b-gray-400 bg-white py-2 px-2 rounded-lg focus:outline-0" type="password" id='password' placeholder='Enter your password....' />
                </div>
                <div className=" w-full flex justify-center p-2 rounded-xl bg-teal-600">
                    <button className="text-white cursor-pointer">Register</button>
                </div>
            </form>
            <div className="absolute top-0 right-0 p-3 z-3">
                <NavLink to="/login">
                    <button onClick={() => { console.log("clicked") }} className=" py-2 px-4 rounded-xl bg-red-400 text-white cursor-pointer">Login</button>
                </NavLink>
            </div>
        </div>
  )
}

export default Register
