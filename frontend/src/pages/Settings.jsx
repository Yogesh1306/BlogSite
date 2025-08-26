import Sidebar from "../components/sidebar/Sidebar"
import { Person } from '@mui/icons-material';

const Settings = () => {
  return (
    <div className="flex">
      <div className="flex-10 mt-2 py-3 px-6 flex flex-col gap-8">
        <div className="flex justify-between text-red-500">
          <span className="text-4xl">Update your Account</span>
          <span>Delete Account</span>
        </div>
        <form className="flex flex-col gap-4" >
          <div className="flex flex-col gap-3">
            <label htmlFor="#" className="text-xl">Profile picture</label>
            <div className="flex items-center gap-3">
            <img className="w-20 h-20 rounded-3xl object-fit" src="https://cdn.pixabay.com/photo/2025/07/06/01/34/travel-9698815_1280.jpg" alt="" />
              <label htmlFor="fileInput" className="bg-red-400 rounded-full flex p-1 text-white cursor-pointer"><Person /></label>
              <input type="file" id="fileInput" className="hidden" />
            </div>
          </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="username" className="text-xl">Username</label>
              <input className="border-b-2 border-gray-200 py-3 focus:outline-0" type="text" id="username" placeholder="eg. John Doe" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-xl">Email</label>
              <input className="border-b-2 border-gray-200 py-3 focus:outline-0" type="email" id="email" placeholder="eg. johndoe@example.com" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="passwords" className="text-2xl">Password</label>
              <input className="border-b-2 border-gray-200 py-3 focus:outline-0" type="password" id="password" placeholder="" />
            </div>
            <div className="flex justify-center">
            <button className="bg-teal-500 text-white p-2 px-10 rounded-xl">Update</button>
            </div>
        </form>
      </div>
      <Sidebar />
    </div>
  )
}

export default Settings
