import { Facebook, X, Pinterest, Instagram, TrendingUp, NewReleases, Email, Person } from "@mui/icons-material"
import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router";

const Sidebar = () => {
    const [categories, setCategories] = useState([]);
    const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);
    const [email, setEmail] = useState('');
    
    useEffect(() => {
        const getCategories = async() => {
            try {
                const res = await axios.get("/api/v1/categories");
                setCategories(res.data.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        }
        getCategories();
    }, [])
    
    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        // Handle newsletter signup
        console.log('Newsletter signup:', email);
        setEmail('');
        setIsNewsletterOpen(false);
    };

    const popularPosts = [
        { id: 1, title: "Getting Started with React Hooks", views: 1.2 },
        { id: 2, title: "Node.js Best Practices 2024", views: 0.8 },
        { id: 3, title: "CSS Grid vs Flexbox Guide", views: 0.6 }
    ];

    return (
        <div className="w-80 max-w-sm mx-auto lg:mx-0">
            <div className="sticky top-20 space-y-6">
                {/* About Section */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden animate-slide-up">
                    <div className="gradient-primary p-4 text-center">
                        <h3 className="font-secondary text-xl font-bold text-white mb-2">About Me</h3>
                    </div>
                    <div className="p-6">
                        <div className="relative mb-4 group">
                            <img 
                                className="w-24 h-24 mx-auto object-cover rounded-full border-4 border-blue-100 shadow-lg transition-transform duration-300 group-hover:scale-105" 
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                                alt="Author" 
                            />
                            <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-3 border-white"></div>
                        </div>
                        <div className="text-center mb-4">
                            <h4 className="font-secondary font-semibold text-gray-900 text-lg">John Doe</h4>
                            <p className="font-primary text-gray-500 text-sm">Full Stack Developer</p>
                        </div>
                        <p className="font-primary text-gray-600 text-sm leading-relaxed text-center">
                            Passionate about creating amazing web experiences and sharing knowledge with the developer community.
                        </p>
                        <div className="flex justify-center space-x-3 mt-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                                <Person className="w-3 h-3 mr-1" />
                                150 Posts
                            </span>
                        </div>
                    </div>
                </div>

                {/* Popular Posts */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden animate-slide-up" style={{animationDelay: '100ms'}}>
                    <div className="p-4 border-b border-gray-100">
                        <div className="flex items-center space-x-2">
                            <TrendingUp className="w-5 h-5 text-orange-500" />
                            <h3 className="font-secondary text-lg font-bold text-gray-900">Popular Posts</h3>
                        </div>
                    </div>
                    <div className="p-4">
                        <div className="space-y-3">
                            {popularPosts.map((post, index) => (
                                <div key={post.id} className="group cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                                    <div className="flex items-start space-x-3">
                                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                                            {index + 1}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-secondary font-medium text-gray-900 text-sm leading-tight group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                                                {post.title}
                                            </h4>
                                            <p className="font-primary text-xs text-gray-500 mt-1">
                                                {post.views}k views
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Categories */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden animate-slide-up" style={{animationDelay: '200ms'}}>
                    <div className="p-4 border-b border-gray-100">
                        <div className="flex items-center space-x-2">
                            <NewReleases className="w-5 h-5 text-green-500" />
                            <h3 className="font-secondary text-lg font-bold text-gray-900">Categories</h3>
                        </div>
                    </div>
                    <div className="p-4">
                        <div className="grid grid-cols-2 gap-2">
                            {categories.map(c => (
                                <NavLink 
                                    key={c.name._id} 
                                    to={`/?category=${c.name}`}
                                    className={({ isActive }) =>
                                        `block p-3 rounded-lg text-center transition-all duration-200 group ${
                                            isActive 
                                                ? 'bg-blue-500 text-white shadow-lg' 
                                                : 'bg-gray-50 text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:scale-105'
                                        }`
                                    }
                                >
                                    <span className="font-secondary text-sm font-medium">
                                        {c.name.charAt(0).toUpperCase() + c.name.slice(1).toLowerCase()}
                                    </span>
                                </NavLink>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Newsletter Signup */}
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl shadow-lg border border-purple-100 overflow-hidden animate-slide-up" style={{animationDelay: '300ms'}}>
                    <div className="p-6 text-center">
                        <Email className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                        <h3 className="font-secondary text-lg font-bold text-gray-900 mb-2">Stay Updated</h3>
                        <p className="font-primary text-sm text-gray-600 mb-4">
                            Get the latest posts delivered right to your inbox.
                        </p>
                        
                        {!isNewsletterOpen ? (
                            <button 
                                onClick={() => setIsNewsletterOpen(true)}
                                className="w-full btn-primary font-secondary text-sm py-3 animate-bounce-in"
                            >
                                Subscribe Now
                            </button>
                        ) : (
                            <form onSubmit={handleNewsletterSubmit} className="animate-slide-up">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3"
                                    required
                                />
                                <div className="flex space-x-2">
                                    <button 
                                        type="submit"
                                        className="flex-1 btn-primary font-secondary text-sm py-2"
                                    >
                                        Subscribe
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={() => setIsNewsletterOpen(false)}
                                        className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>

                {/* Social Media */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden animate-slide-up" style={{animationDelay: '400ms'}}>
                    <div className="p-4 border-b border-gray-100">
                        <h3 className="font-secondary text-lg font-bold text-gray-900 text-center">Connect With Us</h3>
                    </div>
                    <div className="p-6">
                        <div className="flex justify-center space-x-4">
                            <a 
                                href="#" 
                                className="group p-3 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-500 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg"
                                aria-label="Facebook"
                            >
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a 
                                href="#" 
                                className="group p-3 rounded-full bg-gray-50 text-gray-600 hover:bg-gray-900 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg"
                                aria-label="Twitter/X"
                            >
                                <X className="w-5 h-5" />
                            </a>
                            <a 
                                href="#" 
                                className="group p-3 rounded-full bg-red-50 text-red-600 hover:bg-red-500 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg"
                                aria-label="Pinterest"
                            >
                                <Pinterest className="w-5 h-5" />
                            </a>
                            <a 
                                href="#" 
                                className="group p-3 rounded-full bg-pink-50 text-pink-600 hover:bg-pink-500 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg"
                                aria-label="Instagram"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                        </div>
                        
                        {/* Social Stats */}
                        <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-gray-100">
                            <div className="text-center">
                                <div className="font-secondary font-bold text-xl text-gray-900">2.5K</div>
                                <div className="font-primary text-xs text-gray-500">Followers</div>
                            </div>
                            <div className="text-center">
                                <div className="font-secondary font-bold text-xl text-gray-900">1.8K</div>
                                <div className="font-primary text-xs text-gray-500">Subscribers</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
