import { NavLink } from "react-router";


const Post = ({post}) => {
  return (
    <NavLink to={`/post/${post._id}`}>
    <div className=" w-[22vw] h-[60vh] mt-3 mb-3 p-3 rounded-xl shadow-lg shadow-gray-400 ">
      <div>
        {post.photo && 
        <img className='w-full h-55 mb-1 object-cover rounded-xl' src={post.photo} alt="" />}
      </div>
      <div className='flex gap-3 py-1 px-1 italic text-[18px] text-gray-400'>
        {post.category.map(c=>{
          return <span key={c._id} className='rounded-xl bg-red-200 px-3 py-0.5 shadow-md shadow-green-300'>{c.name}</span>
        })}
      </div>
      <div className='flex flex-col gap-2 '>
        <p className='text-center text-3xl'>{post.title}</p>
        <p className='text-end italic text-lg text-gray-400 px-2'>{new Date(post.createdAt).toDateString()}</p>
        <p className='manage-overflow'>
            {post.content}
        </p>
      </div>
    </div>
    </NavLink>
  )
}

export default Post
