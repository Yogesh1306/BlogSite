import Header from "../components/header/Header"
import Posts from "../components/posts/Posts"
import Sidebar from "../components/sidebar/Sidebar"
import { useEffect, useState } from "react"
import axios from 'axios'


const Home = () => {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get("/posts")
            setPosts(res.data)
        }
        fetchPosts()
    }, [])
    
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