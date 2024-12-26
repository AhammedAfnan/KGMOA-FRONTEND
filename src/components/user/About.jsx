import React from "react";

export default function About() {
  const aboutImages = [
    { src: "/images/img1.jpg", caption: "Secretary KGMOA Vijayapura" },
    { src: "/images/img3.jpg", caption: "Souvenir committee heads" },
    { src: "/images/img2.jpg", caption: "Scientific committee heads" },
    { src: "/images/img4.jpg", caption: "Banquet committee heads" },
    { src: "/images/img5.jpg", caption: "Transport committee heads" },
    { src: "/images/img6.jpg", caption: "Registration committee heads" },
    { src: "/images/img8.jpg", caption: "Chief Patrons of KGMOA" },
    { src: "/images/img9.jpg", caption: "Co ordination committee" },
    { src: "/images/img10.jpg", caption: "Executive committee KGMOA" },
  ];

  return (
    <section className="mt-10 mb-5">
      <h2 className="text-2xl font-extrabold text-center mb-6">About Us</h2>
      <div className="grid grid-cols-3 gap-4 px-4">
        {aboutImages.map((item, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-md shadow-md overflow-hidden"
          >
            <img
              src={item.src}
              alt={item.caption}
              className="w-full h-80 object-cover"
            />
            <div className="p-2 bg-white text-center">
              <p className="font-bold text-gray-700">{item.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
