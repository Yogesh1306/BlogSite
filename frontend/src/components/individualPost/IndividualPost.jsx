import {Edit, Delete} from '@mui/icons-material';

const IndividualPost = ({post}) => {
  console.log(post)
  return (
    <div className="flex-10 p-3 px-4 flex flex-col gap-3">
      <div className=''>
        {post.photo && 
        <img className='w-full h-[50vh] object-cover rounded-lg' src={post.photo} alt="" />}
      </div>
      <h1 className='flex justify-between items-center text-4xl ml-[400px]'>
        {post.title}
        <div className='flex justify-center items-center gap-1'>
            <Edit className='text-green-500 cursor-pointer'/>
            <Delete className='text-red-500 cursor-pointer'/>
        </div>
      </h1>
      <div className='flex justify-between text-xl text-yellow-500'>
        <span>Author: <b>{post.author.username}</b></span>
        <span>{new Date(post.createdAt).toDateString()}</span>
      </div>
      <p className="first-letter:font-bold first-letter:text-4xl first-letter:ml-10 text-lg mt-2 ">
        {post.content}
      </p>
    </div>
  )
}

export default IndividualPost
