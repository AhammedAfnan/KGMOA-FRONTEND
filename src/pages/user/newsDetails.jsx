import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../services/config";

export default function NewsDetails() {
  const { id } = useParams(); // Get the news index from the URL
  const [news, setNews] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/get-news`);
        const data = await response.json();

        if (response.ok) {
          setNews(data.news[id]); // Use the index to get the specific news item
        } else {
          console.error("Failed to fetch news");
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, [id]);

  if (!news) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-lg text-gray-600">Loading news...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5 md:px-20">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{news.title}</h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          {news.description}
        </p>
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-200"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
