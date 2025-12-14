import React from "react";

// EXACT reel order → image order (1.jpg = first reel, etc.)
const instaLinks = [
  "https://www.instagram.com/reel/DRPcqNnkyrO", // singing vendor
  "https://www.instagram.com/reel/DQ10GdNkxa6", // overview
  "https://www.instagram.com/reel/DRKOuj9CGQY", // temple
  "https://www.instagram.com/p/C0r13xfyc7W",   // kadlekai photos
  "https://www.instagram.com/bhelpuri_praveen",
  "https://www.instagram.com/reel/DRAB6DBkvY6", // history
  "https://www.instagram.com/reel/DRXHj3nCJS5", // plastic-free
  "https://www.instagram.com/mr.kadalekayi/",
  "https://www.instagram.com/p/DRJv5Lnk7tq/?img_index=5",
  "https://www.instagram.com/reel/DRWjYW9jEKn", // dolls
  "https://www.instagram.com/p/C1ETIfRhTfC/",  // idols
  "https://www.instagram.com/p/C0rp5lZSRRy/",  // sugarcane
  "https://www.instagram.com/p/C0zRbKlh2m2/",
  "https://www.instagram.com/p/C0zQDKFBgLd/",  // cotton candy
  "https://www.instagram.com/p/C0uEfPFMT3G/",  // kadlekai chat
  "https://www.instagram.com/p/C00Y1yThA0n/",  // flowers
  "https://www.instagram.com/p/DC90Kmeosi2/",  // aesthetic table guy
  "https://www.instagram.com/reel/DRPWyvjkUv0/", // mehndi
  "https://www.instagram.com/p/DRaWhHYkzjg/",  // faces
  "https://www.instagram.com/p/DQ1oZIZiQ9g/",  // paper bag making
];

// Images: public/1.jpg → public/20.jpg
const thumbnails = [
  "/1.2.jpeg",
  "/2.jpg",
  "/3.jpg",
  "/4.JPG",
  "/5.jpg",
  "/6.jpg",
  "/7.jpg",
  "/8.jpg",
  "/9.jpg",
  "/10.jpg",
  "/11.jpg",
  "/12.jpg",
  "/13.jpg",
  "/14.jpg",
  "/15.JPG",
  "/16.jpg",
  "/17.jpg",
  "/18.jpg",
  "/19.jpg",
  "/20.png",
];

const Gallery = () => {
  return (
    <section id="gallery" className="bg-black py-16 px-4">
      <h2 className="text-center text-4xl md:text-5xl font-extrabold text-orange-500 mb-12">
        Gallery
      </h2>

      <div
        className="
          grid
          grid-cols-2
          md:grid-cols-4
          auto-rows-[180px]
          gap-4
          max-w-7xl
          mx-auto
        "
      >
        {thumbnails.map((src, index) => (
          <a
            key={index}
            href={instaLinks[index]}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              relative overflow-hidden rounded-2xl group
              ${index % 7 === 0 ? "md:col-span-2 md:row-span-2" : ""}
              ${index % 5 === 0 ? "row-span-2" : ""}
            `}
          >
            <img
              src={src}
              alt={`Kadlekai Parishe ${index + 1}`}
              className="
                w-full h-full object-cover
                transition-transform duration-700
                group-hover:scale-110
              "
            />

            {/* Instagram hover overlay */}
            <div
              className="
                absolute inset-0
                bg-black/40 opacity-0
                group-hover:opacity-100
                transition-opacity duration-500
                flex items-center justify-center
              "
            >
              <i className="fa-brands fa-instagram text-white text-4xl"></i>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
