import Post from "../post/Post"

const Posts = ({posts}) => {
  return (
    <div className="flex-10 flex justify-around flex-wrap gap-2 m-5 overflow-auto h-[85vh] ">
      {posts.map(p=>{
       return <Post/>
      })}

    </div>
  )
}

export default Posts
