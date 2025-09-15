import { useState, useEffect } from 'react';

const Header = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const heroSlides = [
    {
      image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      title: "Welcome to Our Blog",
      subtitle: "Discover amazing stories and insights",
      description: "Join our community of writers and readers exploring the world of technology, creativity, and innovation."
    },
    {
      image: "https://images.unsplash.com/photo-1486312338219-ce68e2c6b7d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80", 
      title: "Share Your Story",
      subtitle: "Express your thoughts with the world",
      description: "Create compelling content that resonates with readers and builds lasting connections."
    },
    {
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      title: "Join Our Community", 
      subtitle: "Connect with like-minded creators",
      description: "Be part of a growing community of passionate writers, developers, and creative thinkers."
    }
  ];

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  return (
    <div className="relative h-[90vh] overflow-hidden">
      {/* Hero Slider */}
      <div className="relative w-full h-full">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div 
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
              
              {/* Hero Content */}
              <div className={`absolute inset-0 flex items-center justify-start pl-8 md:pl-16 lg:pl-24 ${
                index === currentSlide && isLoaded ? 'animate-fade-in' : 'opacity-0'
              }`}>
                <div className="max-w-2xl text-white">
                  {/* Main Brand Title */}
                  <div className="mb-8">
                    <h1 className="font-secondary text-2xl md:text-3xl lg:text-4xl font-light mb-2 tracking-wide opacity-90">
                      React & Node
                    </h1>
                    <div className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-primary font-bold mb-4 text-gradient leading-tight">
                      Blog
                    </div>
                  </div>
                  
                  {/* Slide-specific Content */}
                  <div className={`transition-all duration-700 delay-300 ${
                    index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  }`}>
                    <h2 className="font-secondary text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 leading-tight">
                      {slide.title}
                    </h2>
                    <p className="font-accent text-xl md:text-2xl mb-6 opacity-90 font-light">
                      {slide.subtitle}
                    </p>
                    <p className="font-primary text-lg md:text-xl mb-8 opacity-80 leading-relaxed max-w-lg">
                      {slide.description}
                    </p>
                    
                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button className="btn-primary font-secondary text-lg px-8 py-4">
                        Start Reading
                      </button>
                      <button className="btn-outline font-secondary text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-gray-900">
                        Join Community
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Slider Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white scale-125 shadow-lg' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 animate-bounce">
        <div className="flex flex-col items-center text-white/80">
          <span className="font-accent text-sm mb-2">Scroll</span>
          <div className="w-px h-8 bg-white/50"></div>
          <div className="w-2 h-2 bg-white/80 rounded-full mt-2"></div>
        </div>
      </div>
    </div>
  )
}

export default Header
