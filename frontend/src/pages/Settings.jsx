import { useContext, useEffect, useState } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import { Person, PhotoCamera, Visibility, VisibilityOff } from '@mui/icons-material';
import { Context } from "../context/Context";
import axios from "axios";


const Settings = () => {
  const publicPath = "http://localhost:3000/";
  const [profileImage, setProfileImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("")

  const { user, dispatch } = useContext(Context);

  useEffect(() => {
    setProfileImage(user.data.profilePic || "");
    setUsername(user.data.username);
    setEmail(user.data.email)
    console.log("user in settings", user)
  }, [user])


  // Handle image file selection and preview
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setImagePreview(file);

  };

  // Handle form username changes
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  // Handle form password changes
  const handlePasswordChange = (e) => {
    setnewPassword(e.target.value);
  };

  // Handle form submission
  const handleUpdate = async (e) => {
    e.preventDefault();
    dispatch({type: "UPDATE_START"})
    // Add your form submission logic here
    try {
      if (imagePreview) {
        const data = new FormData();
        data.append("profilePic", imagePreview);
        const res = await axios.put("/api/v1/users/updateProfilePic", data, { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true });
        dispatch({type: "UPDATE_SUCCESS", payload: res.data})
        console.log(res.data);
        console.log("User after profile pic update:", user);
      }
      if (username !== user.username) {
        const res = await axios.put("/api/v1/users/updateUsername", { username }, { withCredentials: true });
        console.log(res.data);
      }
      if(oldPassword !== "" && newPassword !== ""){
        const res = await axios.put("/api/v1/users/updatePassword", {oldPassword, newPassword}, {withCredentials: true});
        console.log(res.data);
      }
    } catch (error) {
      console.log("Error updating profile: ", error)
    }
  };
  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1 max-w-4xl mx-auto p-6">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Account Settings</h1>
              <p className="text-gray-600">Manage your profile information and preferences</p>
            </div>
            <button className="text-red-500 hover:text-red-700 transition-colors duration-200 px-4 py-2 border border-red-500 rounded-lg cursor-pointer hover:bg-red-50">
              Delete Account
            </button>
          </div>
        </div>

        {/* Main Form */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <form onSubmit={handleUpdate} className="space-y-6">

            {/* Profile Picture Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">Profile Picture</h3>
              <div className="flex items-center space-x-6">
                {/* Current/Preview Image */}
                <div className="relative group w-24 h-24">
                  {imagePreview || profileImage ? (<img
                    className="w-24 h-24 rounded-full object-cover border-4 border-gray-200 shadow-md transition-all duration-200 group-hover:border-gray-300 "
                    src={imagePreview ? URL.createObjectURL(imagePreview) : publicPath+profileImage}
                    alt="Profile"
                  />) : (
                    <div className="absolute inset-0 bg-gray-200  bg-opacity-0 group-hover:bg-opacity-20 rounded-full transition-all duration-200 flex items-center justify-center">
                      <PhotoCamera className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </div>
                  )}

                </div>

                {/* Upload Controls */}
                <div className="flex flex-col space-y-3">
                  <label
                    htmlFor="fileInput"
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-2 rounded-lg cursor-pointer transition-all duration-200 flex items-center space-x-2 shadow-md hover:shadow-lg"
                  >
                    <PhotoCamera className="w-5 h-5" />
                    <span>Choose Photo</span>
                  </label>
                  <input
                    type="file"
                    id="fileInput"
                    className="hidden"
                    accept="image/*"
                    onChange={
                      handleImageChange}
                  />
                  {imagePreview && (
                    <button
                      type="button"
                      onClick={() => setImagePreview(null)}
                      className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200"
                    >
                      Remove preview
                    </button>
                  )}
                </div>
              </div>
              {imagePreview && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-700">✓ New profile picture selected. Click "Update Profile" to save changes.</p>
                </div>
              )}
            </div>

            {/* Form Fields */}
            <div className="grid md:grid-cols-2 gap-6">

              {/* Username Field */}
              <div className="space-y-2">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={handleUsernameChange}
                  placeholder="Enter your username"
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700">
                Current Password
              </label>
              <div className="relative">
                <input
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  type={showPassword ? "text" : "password"}
                  id="oldPassword"
                  name="password"
                  value={oldPassword}
                  onChange={(e)=>setOldPassword(e.target.value)}
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <div className="relative">
                <input
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={newPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </button>
              </div>
              <p className="text-xs text-gray-500">Leave blank to keep current password</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
              <button
                type="submit"
                className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white py-3 px-8 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg font-medium"
              >
                Update Profile
              </button>
              <button
                type="button"
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 px-8 rounded-lg transition-all duration-200 font-medium"
                onClick={() => {
                  setPassword("");
                  setImagePreview(null);
                }}
              >
                Reset Changes
              </button>
            </div>
          </form>
        </div>

        {/* Additional Settings Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Account Preferences</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-800">Email Notifications</h4>
                <p className="text-sm text-gray-600">Receive updates about your posts and comments</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-800">Public Profile</h4>
                <p className="text-sm text-gray-600">Allow others to view your profile</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* <Sidebar /> */}
    </div>
  )
}

export default Settings