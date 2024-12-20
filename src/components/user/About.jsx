import React from "react";

export default function About() {
  const aboutImages = [
    "/images/img1.jpg",
    "/images/img2.jpg",
    "/images/img3.jpg",
    "/images/img4.jpg",
    "/images/img5.jpg",
    "/images/img6.jpg",
    "/images/img7.jpg",
    "/images/img8.jpg",
    "/images/img9.jpg",
  ];

  return (
    <section className="mt-10 mb-5">
      <h2 className="text-2xl font-bold text-center mb-6">About Us</h2>
      <div className="grid grid-cols-3 gap-4 px-4">
        {aboutImages.map((src, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-md shadow-md overflow-hidden"
          >
            <img
              src={src}
              alt={`Image ${index + 1}`}
              className="w-full h-48 object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
