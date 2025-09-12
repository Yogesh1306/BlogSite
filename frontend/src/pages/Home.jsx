import Header from "../components/header/Header"
import Posts from "../components/posts/Posts"
import Sidebar from "../components/sidebar/Sidebar"
import { useEffect, useState } from "react"
import axios from 'axios'
import { useLocation } from "react-router"


const Home = () => {
    const [posts, setPosts] = useState([])
    const {search} = useLocation();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get("/api/v1/posts" + search)
                setPosts(res.data.data[0])
            } catch (error) {
                if(error.response && error.response.status === 404){
                    console.log(error.response.data.message)
                }else{
                    console.log("An unexpected error occurred. Please try again later.")
                }
            }
        }
        fetchPosts()
    }, [search])


    return (
        <div className='flex flex-col w-full min-h-screen '>
            <Header />
            <main className=" flex justify-around">
              <Posts posts={posts}/>
                <Sidebar/>
            </main>
            <footer className=' bg-green-200'></footer>
        </div>
    )
}

export default Home