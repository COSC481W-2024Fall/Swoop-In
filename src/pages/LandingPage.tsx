import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate} from 'react-router-dom';
import {auth} from '../firebase-config';
import Footer from '../componets/Footer';

interface CarouselItem {
  id: number;
  src: string;
  alt: string;
}

const LandingPage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { id } = useParams<{ id: string }>();
  const user_uid = id ?? ""; 


  const navigate = useNavigate();

  useEffect(() => {
    const checkUserAuthorization = async () => {
      const currentUser = auth.currentUser;

      if (!currentUser) {
        navigate('/');
        return;
      }

      if (currentUser.uid !== user_uid) {
        navigate(`/LandingPage/${currentUser.uid}`, { replace: true });
      }
    };

    checkUserAuthorization();
  }, [user_uid, navigate]);


  const carouselItems: CarouselItem[] = [
    { id: 1, src: '/placeholder.svg?height=300&width=400', alt: 'Carousel Item 1' },
    { id: 2, src: '/placeholder.svg?height=300&width=400', alt: 'Carousel Item 2' },
    { id: 3, src: '/placeholder.svg?height=300&width=400', alt: 'Carousel Item 3' },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-white py-4 relative">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Swoop In</h1>
          
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        <div className="w-full max-w-md relative">
          <div className="border-4 border-primary rounded-lg overflow-hidden">
            <div className="relative" style={{ width: '400px', height: '300px' }}>
              {carouselItems.map((item, index) => (
                <div
                  key={item.id}
                  className={`absolute top-0 left-0 w-full h-full transition-opacity duration-300 ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <button
              onClick={prevSlide}
              className="bg-primary text-white px-4 py-2 rounded-full"
            >
              Prev
            </button>
            <button
              onClick={nextSlide}
              className="bg-primary text-white px-4 py-2 rounded-full"
            >
              Next
            </button>
          </div>

          <div className="bg-white shadow-md rounded-lg mt-4 p-4">
            <h2 className="text-xl font-semibold mb-2">John Doe</h2>
            <p className="text-sm text-gray-600">
              This is a test bio :D I like long walks on the beach
            </p>
          </div>

          <div className="flex justify-center mt-4 space-x-4">
            <button className="bg-primary text-white px-4 py-2 rounded-lg flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
              Like
            </button>
            <button className="bg-primary text-white px-4 py-2 rounded-lg flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path></svg>
              Dislike
            </button>
          </div>
        </div>
      </main>

      <Footer user_uid={user_uid} />
    </div>
  );
};

export default LandingPage;