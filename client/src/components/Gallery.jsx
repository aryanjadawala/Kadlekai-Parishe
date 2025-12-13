import React from "react";
import "./gallery.css";

export default function Gallery() {
  const instaLinks = [
    "https://www.instagram.com/reel/DRPcqNnkyrO",
    "https://www.instagram.com/reel/DQ10GdNkxa6",
    "https://www.instagram.com/reel/DRKOuj9CGQY",
    "https://www.instagram.com/p/C0r13xfyc7W",
    "https://www.instagram.com/bhelpuri_praveen",
    "https://www.instagram.com/reel/DRAB6DBkvY6",
    "https://www.instagram.com/reel/DRXHj3nCJS5",
    "https://www.instagram.com/mr.kadalekayi/",
    "https://www.instagram.com/p/DRJv5Lnk7tq/?img_index=5",
    "https://www.instagram.com/reel/DRWjYW9jEKn",
    "https://www.instagram.com/p/C1ETIfRhTfC/",
    "https://www.instagram.com/p/C0rp5lZSRRy/",
    "https://www.instagram.com/p/C0zRbKlh2m2/",
    "https://www.instagram.com/p/C0zQDKFBgLd/",
    "https://www.instagram.com/p/C0uEfPFMT3G/",
    "https://www.instagram.com/p/C00Y1yThA0n/",
    "https://www.instagram.com/p/DC90Kmeosi2/",
    "https://www.instagram.com/reel/DRPWyvjkUv0/",
    "https://www.instagram.com/p/DRaWhHYkzjg/",
    "https://www.instagram.com/p/DQ1oZIZiQ9g/"
  ];

  return (
    <section id="gallery" className="min-h-screen bg-white py-20 px-6">
      <h1 className="text-5xl font-extrabold text-center text-black mb-10">
        Gallery
      </h1>

      <p className="text-center text-gray-700 max-w-2xl mx-auto mb-14">
        A colourful collection of visuals from Kadlekai Parishe. Click any panel to view the Instagram reel.
      </p>

      {/* Comic grid */}
      <div className="comic-grid">
        {instaLinks.map((link, index) => (
          <a
            key={index}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={`comic-item comic-shape-${index + 1}`}
          >
            <div className="thumb-placeholder">
              <span>Image {index + 1}</span>
            </div>

            <div className="comic-overlay">
              <i className="fa-brands fa-instagram text-white text-3xl"></i>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
