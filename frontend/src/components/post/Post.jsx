import React from 'react'

const Post = () => {
  return (
    <div className=" w-[22vw] mt-3 mb-3 p-3 rounded-xl shadow-lg shadow-gray-400 ">
      <div>
        <img className='w-full h-55 mb-1 object-cover rounded-xl' src="https://cdn.pixabay.com/photo/2025/07/06/01/34/travel-9698815_1280.jpg" alt="" />
      </div>
      <div className='flex gap-3 py-1 px-1 italic text-[18px] text-gray-400'>
        <span className='rounded-xl bg-red-200 px-3 py-0.5 shadow-md shadow-green-300'>Travel</span>
        <span className='rounded-xl bg-red-200 px-3 py-0.5 shadow-md shadow-green-300'>Life</span>
      </div>
      <div className='flex flex-col gap-2 '>
        <p className='text-center text-3xl'>Lorem ipsum dolor sit.</p>
        <p className='text-end italic text-lg text-gray-400 px-2'>1 hour ago</p>
        <p className='manage-overflow'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto placeat corrupti perspiciatis inventore possimus minus aut magnam. Optio quod inventore omnis blanditiis maxime dolorem, voluptatem ut repellendus a laudantium. Corrupti!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto placeat corrupti perspiciatis inventore possimus minus aut magnam. Optio quod inventore omnis blanditiis maxime dolorem, voluptatem ut repellendus a laudantium. Corrupti!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto placeat corrupti perspiciatis inventore possimus minus aut magnam. Optio quod inventore omnis blanditiis maxime dolorem, voluptatem ut repellendus a laudantium. Corrupti!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto placeat corrupti perspiciatis inventore possimus minus aut magnam. Optio quod inventore omnis blanditiis maxime dolorem, voluptatem ut repellendus a laudantium. Corrupti!

        </p>
      </div>
    </div>
  )
}

export default Post
