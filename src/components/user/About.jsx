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
    "/images/img10.jpg",
    "/images/img11.jpg",
    "/images/img12.jpg",
    "/images/img14.jpg",
    "/images/img15.jpg",
    "/images/img16.jpg",
    "/images/img17.jpg",
    "/images/img18.jpg",
  ];

  return (
    <section className="mt-10 mb-5">
      <h2 className="text-2xl font-extrabold text-center mb-6">About Us</h2>
      <div className="grid grid-cols-3 gap-4 px-4">
        {aboutImages.map((src, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-md shadow-md overflow-hidden"
          >
            <img
              src={src}
              alt={`Image ${index + 1}`}
              className="w-full h-80 object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
