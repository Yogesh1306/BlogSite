import { Add } from '@mui/icons-material';

const Write = () => {
  return (
    <div className="flex flex-col gap-3">
      <img className='w-[70vw] h-[40vh] rounded-lg ml-[200px] object-cover' src="https://cdn.pixabay.com/photo/2025/07/06/01/34/travel-9698815_1280.jpg" alt="" />
      <form className='flex flex-col gap-4 relative py-2 mr-10 ml-50' >
        <div className='flex justify-start items-center px-2 gap-3 w-full '>
          <label htmlFor="fileInput" className='w-[25px] h-[25px] rounded-full flex justify-center items-center border border-gray-300 cursor-pointer'>
            <Add />
          </label>
          <input type="file" id='fileInput' className='hidden' />
          <input type="text" placeholder='Title' className='w-[70vw] h-10 px-1 text-2xl focus:outline-0' />
        </div>
        <div className='px-5'>
          <textarea name="" id="" placeholder='Tell your story...' className='w-[70vw] text-2xl h-[20vh] focus:outline-0' />
        </div>
        <button className='absolute top-[10%] right-[70px] border py-2 px-6 text-xl rounded-xl bg-teal-600 text-white cursor-pointer'>Publish</button>
      </form>
    </div>
  )
}

export default Write
