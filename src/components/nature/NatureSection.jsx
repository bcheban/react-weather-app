import React, { useState, useEffect } from 'react';
import { fetchNatureImages } from '../../services/imageApi';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, EffectCoverflow } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

const GallerySkeleton = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-pulse flex space-x-4 w-full">
      <div className="bg-gray-300 rounded-lg h-48 w-1/4" />
      <div className="bg-gray-300 rounded-lg h-56 w-2/4" />
      <div className="bg-gray-300 rounded-lg h-48 w-1/4" />
    </div>
  </div>
);

const ErrorMessage = ({ message }) => (
  <div className="text-center py-10 px-4 bg-red-50 rounded-lg h-64 flex flex-col justify-center">
    <p className="text-red-600 font-semibold">Oops! Something went wrong.</p>
    <p className="text-gray-600 mt-2">{message}</p>
  </div>
);

const SectionWrapper = ({ children }) => (
  <section className="bg-white pt-8 pb-16 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-xl sm:text-2xl mb-12 font-bold text-black lg:font-medium lg:text-[20px]">Beautiful nature</h2>
      {children}
    </div>
  </section>
);

const NatureSection = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const fetchedImages = await fetchNatureImages();
        setImages(fetchedImages);
      } catch (err) {
        setError(err.message || 'Failed to load images.');
      } finally {
        setIsLoading(false);
      }
    };
    loadImages();
  }, []);

  if (isLoading) {
    return (
      <SectionWrapper>
        <GallerySkeleton />
      </SectionWrapper>
    );
  }

  if (error) {
    return (
      <SectionWrapper>
        <ErrorMessage message={error} />
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper>
      <Swiper
        modules={[Navigation, Pagination, A11y, EffectCoverflow]}
        effect="coverflow"
        grabCursor
        centeredSlides
        loop
        pagination={{ clickable: true }}
        navigation
        breakpoints={{
          320: {
            slidesPerView: 1.5,
            coverflowEffect: {
              rotate: 0,
              stretch: 0,
              depth: 150,
              modifier: 1.5,
              slideShadows: false,
            },
          },
          768: {
            slidesPerView: 2.5,
            coverflowEffect: {
              rotate: 25,
              stretch: 10,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            },
          },
          1280: {
            slidesPerView: 'auto',
            coverflowEffect: {
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            },
          },
        }}
        className="mySwiper"
      >
        {images.map(({ id, webformatURL, alt }) => (
          <SwiperSlide key={id} className="w-[80%] sm:w-[60%] lg:w-[60%] max-w-[600px]">
            <img
              src={webformatURL}
              alt={alt}
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </SectionWrapper>
  );
};

export default NatureSection;