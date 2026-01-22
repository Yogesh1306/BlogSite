import Header from "../components/header/Header"
import Posts from "../components/posts/Posts"
import Sidebar from "../components/sidebar/Sidebar"
import { useEffect, useState } from "react"
import api from "../api/api"
import { useLocation } from "react-router"


const Home = () => {
    const [posts, setPosts] = useState([])
    const {search} = useLocation();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await api.get("/api/v1/posts" + search)
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
        <div className='flex flex-col w-full min-h-screen bg-gray-50'>
            <Header />
            <main className="flex-1">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                        {/* Posts Section */}
                        <div className="lg:col-span-8">
                            <Posts posts={posts}/>
                        </div>
                        
                        {/* Sidebar */}
                        <div className="lg:col-span-4 mt-8 lg:mt-0">
                            <Sidebar posts={posts}/>
                        </div>
                    </div>
                </div>
            </main>
            
            {/* Enhanced Footer */}
            <footer className='bg-gray-900 text-white mt-16'>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* About */}
                        <div>
                            <h3 className="font-secondary text-xl font-bold text-white mb-4">React & Node Blog</h3>
                            <p className="font-primary text-gray-400 text-sm leading-relaxed">
                                Your go-to destination for web development insights, tutorials, and the latest trends in React and Node.js.
                            </p>
                        </div>
                        
                        {/* Quick Links */}
                        <div>
                            <h4 className="font-secondary text-lg font-semibold text-white mb-4">Quick Links</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="font-primary text-gray-400 hover:text-white transition-colors duration-200 text-sm">About Us</a></li>
                                <li><a href="#" className="font-primary text-gray-400 hover:text-white transition-colors duration-200 text-sm">Contact</a></li>
                                <li><a href="#" className="font-primary text-gray-400 hover:text-white transition-colors duration-200 text-sm">Privacy Policy</a></li>
                                <li><a href="#" className="font-primary text-gray-400 hover:text-white transition-colors duration-200 text-sm">Terms of Service</a></li>
                            </ul>
                        </div>
                        
                        {/* Newsletter */}
                        <div>
                            <h4 className="font-secondary text-lg font-semibold text-white mb-4">Stay Connected</h4>
                            <p className="font-primary text-gray-400 text-sm mb-4">
                                Subscribe to our newsletter for the latest updates.
                            </p>
                            <div className="flex">
                                <input 
                                    type="email" 
                                    placeholder="Your email" 
                                    className="flex-1 px-4 py-2 text-sm bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-r-lg hover:bg-blue-700 transition-colors duration-200">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center">
                        <p className="font-primary text-gray-400 text-sm">
                            © 2024 React & Node Blog. All rights reserved. Made with ❤️ for developers.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Home