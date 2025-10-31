import React, { useState, useEffect } from 'react';

const banners = [
  {
    id: 1,
    image: 'https://picsum.photos/1200/500?random=1',
  },
  {
    id: 2,
    image: 'https://picsum.photos/1200/500?random=2',
  },
  {
    id: 3,
    image: 'https://picsum.photos/1200/500?random=3',
  },
  {
    id: 4,
    image: 'https://picsum.photos/1200/500?random=4',
  },
  {
    id: 5,
    image: 'https://picsum.photos/1200/500?random=5',
  },
];

const HeroSection: React.FC = () => {
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative bg-gray-900 text-white overflow-hidden">
      <div className="relative h-64 md:h-96 w-full">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentBanner ? 'opacity-100' : 'opacity-0'}`}
          >
            <img src={banner.image} alt={`Banner ${banner.id}`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-50">
              {/* Text content removed from banners */}
            </div>
          </div>
        ))}
      </div>
      
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBanner(index)}
              className={`w-3 h-3 rounded-full transition-colors ${index === currentBanner ? 'bg-white' : 'bg-white/50 hover:bg-white'}`}
            />
          ))}
      </div>

      <div className="bg-yellow-400 text-blue-900 py-3 overflow-hidden">
        <div className="animate-scroll-text whitespace-nowrap">
            <span className="font-bold text-lg mx-8">
                Post your enquiry and get up to 10% commission on deal value
            </span>
            <span className="font-bold text-lg mx-8">
                Post your enquiry and get up to 10% commission on deal value
            </span>
            <span className="font-bold text-lg mx-8">
                Post your enquiry and get up to 10% commission on deal value
            </span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;