import { Facebook, X, Pinterest, Instagram } from "@mui/icons-material";
const Sidebar = () => {
    return (
        <div className="flex-3 flex flex-col items-center py-2 px-1">
            <div className="flex flex-col justify-center items-center gap-2 w-full p-2">
                <span className="border-y-2 border-gray-400 text-xl ">ABOUT ME</span>
                <img className="w-fit object-cover rounded-xl" src="https://images.pexels.com/photos/3292558/pexels-photo-3292558.jpeg" alt="" />
                <p className="text-wrap px-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, cupiditate! Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae fuga itaque eos sequi vero? Debiti</p>
            </div>
            <div className="mt-4 w-full flex flex-col justify-center items-center">
                <span className="border-y-2 border-gray-400 text-xl">CATEGORIES</span>
                <ul className="w-full grid grid-cols-2 gap-1 px-2 text-center mt-2">
                    <li className="cursor-pointer hover:bg-gray-200 rounded-md p-1 text-lg ">Life</li>
                    <li className="cursor-pointer hover:bg-gray-200 rounded-md p-1 text-lg ">Science</li>
                    <li className="cursor-pointer hover:bg-gray-200 rounded-md p-1 text-lg ">Technology</li>
                    <li className="cursor-pointer hover:bg-gray-200 rounded-md p-1 text-lg ">Travel</li>
                    <li className="cursor-pointer hover:bg-gray-200 rounded-md p-1 text-lg ">Cinema</li>
                    <li className="cursor-pointer hover:bg-gray-200 rounded-md p-1 text-lg ">Misc</li>
                </ul>
            </div>
            <div className="mt-4 w-full flex flex-col justify-center items-center">
                <span className="border-y-2 border-gray-400 text-xl">CONTACT US</span>
                <div className="flex-3 flex justify-center items-center gap-2 mt-2 w-full p-3">
                    <li className="cursor-pointer list-none"><Facebook /></li>
                    <li className="cursor-pointer list-none"><X /></li>
                    <li className="cursor-pointer list-none"><Pinterest /></li>
                    <li className="cursor-pointer list-none"><Instagram /></li>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
