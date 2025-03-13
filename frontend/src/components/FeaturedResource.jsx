import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { home_bg } from "../utils/UseImages";

const articles = [
  {
    title: "IELTS Speaking Topics Part 1, 2, 3 [Latest 2025]",
    image: home_bg,
  },
  {
    title: "Resource 2",
    image: home_bg
  },
  {
    title: "Resource 3 ",
    image: home_bg,
  },
  {
    title: "Reource 4",
    image: home_bg,
  },
];

const FeaturedResource = () => {
  return (
    <div className="max-w-6xl mx-auto py-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold">
          <span className="text-green-400">|</span> Resources
        </h2>
        <button className="border px-4 py-2 rounded-ful bg-seagreen text-white" >
          View all resource
        </button>
      </div>

      <Swiper
        spaceBetween={20}
        slidesPerView={3}
        navigation
        modules={[Navigation]}
        className="w-full"
      >
        {articles.map((article, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{article.title}</h3>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FeaturedResource;
