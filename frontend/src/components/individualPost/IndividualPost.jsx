import {Edit, Delete} from '@mui/icons-material';

const IndividualPost = () => {
  return (
    <div className="flex-10 p-3 px-4 flex flex-col gap-3">
      <div className=''>
        <img className='w-full h-[50vh] object-cover rounded-lg' src="https://cdn.pixabay.com/photo/2025/07/06/01/34/travel-9698815_1280.jpg" alt="" />
      </div>
      <h1 className='flex justify-between items-center text-4xl ml-[400px]'>
        Lorem ipsum dolor sit amet.
        <div className='flex justify-center items-center gap-1'>
            <Edit className='text-green-500 cursor-pointer'/>
            <Delete className='text-red-500 cursor-pointer'/>
        </div>
      </h1>
      <div className='flex justify-between text-xl text-yellow-500'>
        <span>Author: <b>Yogesh</b></span>
        <span>1 hour ago</span>
      </div>
      <p className="first-letter:font-bold first-letter:text-4xl first-letter:ml-10 text-lg mt-2 ">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio quia dolores, eius qui aspernatur unde eos aperiam dolore, libero sit placeat voluptatum consequuntur fugiat. Ipsa omnis illum maxime unde, provident cumque enim eligendi nemo tenetur consequuntur et asperiores dolor quidem at, quisquam non fugit quibusdam quasi nisi sequi sed totam id vitae? Minima repellendus unde iure, possimus consequuntur doloribus recusandae architecto aliquid officia, voluptas illum dolores porro esse voluptatem dolor, vero molestias. Cumque repellat tempora saepe dolores, repellendus adipisci deserunt numquam fugiat quos iure. Aspernatur adipisci, numquam cum quod quo totam facere! Molestiae vero atque consequatur minus doloribus, corporis rem.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio quia dolores, eius qui aspernatur unde eos aperiam dolore, libero sit placeat voluptatum consequuntur fugiat. Ipsa omnis illum maxime unde, provident cumque enim eligendi nemo tenetur consequuntur et asperiores dolor quidem at, quisquam non fugit quibusdam quasi nisi sequi sed totam id vitae? Minima repellendus unde iure, possimus consequuntur doloribus recusandae architecto aliquid officia, voluptas illum dolores porro esse voluptatem dolor, vero molestias. Cumque repellat tempora saepe dolores, repellendus adipisci deserunt numquam fugiat quos iure. Aspernatur adipisci, numquam cum quod quo totam facere! Molestiae vero atque consequatur minus doloribus, corporis rem.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio quia dolores, eius qui aspernatur unde eos aperiam dolore, libero sit placeat voluptatum consequuntur fugiat. Ipsa omnis illum maxime unde, provident cumque enim eligendi nemo tenetur consequuntur et asperiores dolor quidem at, quisquam non fugit quibusdam quasi nisi sequi sed totam id vitae? Minima repellendus unde iure, possimus consequuntur doloribus recusandae architecto aliquid officia, voluptas illum dolores porro esse voluptatem dolor, vero molestias. Cumque repellat tempora saepe dolores, repellendus adipisci deserunt numquam fugiat quos iure. Aspernatur adipisci, numquam cum quod quo totam facere! Molestiae vero atque consequatur minus doloribus, corporis rem.
      </p>
    </div>
  )
}

export default IndividualPost
