import { Add } from '@mui/icons-material';
import { useState } from 'react';
import axios from 'axios';

const Write = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("title", title);
      data.append("content", content);
      data.append("category", ["travel", "life"]);
      data.append("photo", photo);
      console.log("data", data)
      const res = await axios.post("/api/v1/posts/", data, { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true });
      console.log(res.data);
      window.location.replace("/post/" + res.data.data._id);
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="flex flex-col gap-3">
      {photo &&
        <img className='w-[70vw] h-[40vh] rounded-lg ml-[200px] object-cover' src={URL.createObjectURL(photo)} alt="" />}
      <form className='flex flex-col gap-4 relative py-2 mr-10 ml-50' >
        <div className='flex justify-start items-center px-2 gap-3 w-full '>
          <label htmlFor="fileInput" className='w-[25px] h-[25px] rounded-full flex justify-center items-center border border-gray-300 cursor-pointer'>
            <Add />
          </label>
          <input type="file" id='fileInput' className='hidden' onChange={e=>setPhoto(e.target.files[0])} />
          <input type="text" placeholder='Title' className='w-[70vw] h-10 px-1 text-2xl focus:outline-0'  onChange={e=>setTitle(e.target.value)}/>
        </div>
        <div className='px-5'>
          <textarea name="" id="" placeholder='Tell your story...' className='w-[70vw] text-2xl h-[20vh] focus:outline-0'  onChange={e=>setContent(e.target.value)}/>
        </div>
        <button className='absolute top-[10%] right-[70px] border py-2 px-6 text-xl rounded-xl bg-teal-600 text-white cursor-pointer' onClick={handleSubmit}>Publish</button>
      </form>
    </div>
  )
}

export default Write
