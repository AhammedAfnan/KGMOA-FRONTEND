import { useEffect, useState } from "react";
import Navbar from "../../components/user/Navbar";
import ContactComponent from "../../components/user/Contact";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import About from "../../components/user/About";
import { API_BASE_URL } from "../../services/config";
import { Link } from "react-router-dom";

export default function Home() {
  const bannerImages = [
    "/images/banner1.jpg",
    "/images/banner2.jpg",
    "/images/banner3.jpg",
  ];

  const [newsTitles, setNewsTitles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/get-news`);
        const data = await response.json();

        if (response.ok && Array.isArray(data.news)) {
          setNewsTitles(data.news.map((news) => news.title));
        } else {
          console.error("Unexpected response format:", data);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
        setError("Failed to load news. Please try again later.");
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex flex-col flex-grow">
        {/* Banner Section */}
        <div className="flex flex-col md:flex-row mb-5 space-y-5 md:space-y-0">
          {/* Banner */}
          <div className="flex-3 w-full md:w-3/4 bg-gray-100 h-60 md:h-auto flex items-center justify-center overflow-hidden shadow-md">
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

          {/* News Section */}
          <div className="flex-1 w-full md:w-1/4 bg-white p-6 shadow-lg h-fit">
            <h3 className="text-xl font-bold text-center text-gray-800 mb-6">
              📰 Headlines
            </h3>
            {error ? (
              <p className="text-sm text-red-600 text-center font-medium">
                {error}
              </p>
            ) : (
              <ul className="list-none space-y-4">
                {newsTitles.length > 0 ? (
                  newsTitles.map((title, index) => (
                    <li key={index} className="text-sm">
                      <Link
                        to={`/news/${index}`}
                        className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                      >
                        {title}
                      </Link>
                    </li>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 text-center italic">
                    No news available
                  </p>
                )}
              </ul>
            )}
          </div>
        </div>

        {/* About Section */}
        <section id="about">
          <About />
        </section>
      </main>
      {/* Contact Section */}
      <section id="contact">
        <ContactComponent />
      </section>
    </div>
  );
}
