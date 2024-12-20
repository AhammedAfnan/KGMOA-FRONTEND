import Navbar from "../../components/user/Navbar";
import ContactComponent from "../../components/user/Contact";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import About from "../../components/user/About";

export default function Home() {
  const bannerImages = [
    "/images/banner1.jpg",
    "/images/banner2.jpg",
    "/images/banner3.jpg",
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex flex-col flex-grow mt-5">
        {/* Banner Section */}
        <div className="flex mb-5">
          <div className="flex-3 w-3/4 bg-gray-100 h-auto flex items-center justify-center rounded-md overflow-hidden">
            <Swiper
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="w-full h-full"
            >
              {bannerImages.map((src, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={src}
                    alt={`Banner ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Other Content Section */}
          <div className="flex-1 w-1/4 h-auto bg-gray-200 ml-5 rounded-md">
            <h3 className="text-md font-medium text-center mt-4">
              Other Content
            </h3>
            {/* Add other content here */}
          </div>
        </div>
        <About />
      </main>
      <ContactComponent />
    </div>
  );
}
