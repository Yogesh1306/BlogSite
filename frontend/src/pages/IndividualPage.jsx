import { useLocation } from "react-router"
import IndividualPost from "../components/individualPost/IndividualPost"
import Sidebar from "../components/sidebar/Sidebar"
import { useState, useEffect } from "react";
import axios from "axios";

const IndividualPage = () => {
  const location = useLocation();
  const postId = (location.pathname.split("/")[2]);
  const [post, setPost] = useState(null)

  useEffect(()=>{
    const fetchPost = async()=>{
      const res = await axios.get(`/api/v1/posts/${postId}`);
      setPost(res.data.data);
    }
    fetchPost()
  },[postId])
  return (
    <div className="flex">
        {post ? <IndividualPost post={post}/>: <div>Loading...</div>}
        <Sidebar/>
    </div>
  )
}

export default IndividualPage
