import { Edit, Delete } from '@mui/icons-material';
import { useContext } from 'react';
import { NavLink } from 'react-router';
import { Context } from '../../context/Context';
import axios from 'axios';
import { useState } from 'react';

const IndividualPost = ({ post }) => {
  console.log(post)
  const publicPath = "http://localhost:3000/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [updateMode, setUpdateMode] = useState(false)

  const handleDelete = async () => {
    await axios.delete(`/api/v1/posts/${post._id}`, { credentials: true });
    window.location.replace("/")
  }
  return (
    <div className="flex-10 p-3 px-4 flex flex-col gap-3">
      <div className=''>
        {post.photo &&
          <img className='w-full h-[50vh] object-cover rounded-lg' src={publicPath + post.photo} alt="" />}
      </div>
      {updateMode ? <input className='border-2 text-center h-15 text-3xl' value={post.title}/> : 
      <h1 className='flex justify-between items-center text-4xl ml-[400px]'>
        {post.title}
        {post.author.username === user?.username &&
          <div className='flex justify-center items-center gap-1'>
            <button onClick={() => setUpdateMode(true)}>
              <Edit className='text-green-500 cursor-pointer' />
            </button>
            <button onClick={handleDelete}>
              <Delete className='text-red-500 cursor-pointer' />
            </button>
          </div>
        }
      </h1>}
      <div className='flex justify-between text-xl text-yellow-500'>
        <span>Author:
          <NavLink to={`/?user=${post.author.username}`}>
            <b> {post.author.username}</b>
          </NavLink>
        </span>
        <span>{new Date(post.createdAt).toDateString()}</span>
      </div>
      <p className="first-letter:font-bold first-letter:text-4xl first-letter:ml-5 text-lg mt-2 ">
        {post.content}
      </p>
    </div>
  )
}

export default IndividualPost
