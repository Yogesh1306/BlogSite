import { Edit, Delete } from "@mui/icons-material";
import { NavLink } from "react-router";
import { Context } from "../../context/Context";
import axios from "axios";
import { useState, useEffect, useContext  } from "react";

const IndividualPost = ({ post }) => {
  const publicPath = "http://localhost:3000/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    setTitle(post.title);
    setContent(post.content);
  }, [post])

  const handleDelete = async () => {
    await axios.delete(`/api/v1/posts/${post._id}`, { credentials: true });
    window.location.replace("/");
  };
  const handleUpdate = async () => {
    try {
      await axios.put(`/api/v1/posts/${post._id}`, { credentials: true, title, content })
      setUpdateMode(false);
    } catch (error) {
      console.log("Error while updating the post:", error);
    }
  };
  return (
    <div className="flex-10 p-3 px-4 flex flex-col gap-3">
      <div className="">
        {post.photo && (
          <img
            className="w-full h-[50vh] object-cover rounded-lg"
            src={publicPath + post.photo}
            alt=""
          />
        )}
      </div>
      {updateMode ? (
        <input
          className="border-b-1 focus:outline-0 text-center h-15 text-3xl"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      ) : (
        <h1 className="flex justify-between items-center text-4xl ml-[400px]">
          {title}
          {post.author.username === user?.userData.username && (
            <div className="flex justify-center items-center gap-1">
              <button onClick={() => setUpdateMode(true)}>
                <Edit className="text-green-500 cursor-pointer" />
              </button>
              <button onClick={handleDelete}>
                <Delete className="text-red-500 cursor-pointer" />
              </button>
            </div>
          )}
        </h1>
      )}
      <div className="flex justify-between text-xl text-yellow-500">
        <span>
          Author:
          <NavLink to={`/?user=${post.author.username}`}>
            <b> {post.author.username}</b>
          </NavLink>
        </span>
        <span>{new Date(post.createdAt).toDateString()}</span>
      </div>
      {updateMode ? (
        <>
          <textarea rows={10} className="cursor-auto border-b-1 p-2 text-lg  outline-0" value={content} onChange={(e) => setContent(e.target.value)} />
          <div className="flex justify-end items-center">
            <button className='border py-2 px-6 text-xl rounded-xl bg-teal-600 text-white cursor-pointer' onClick={handleUpdate}>Update</button>
          </div>
        </>
      ) : (
        <p className="first-letter:font-bold first-letter:text-4xl first-letter:ml-5 text-lg mt-2 ">
          {content}
        </p>
      )}
    </div>
  );
};

export default IndividualPost;
