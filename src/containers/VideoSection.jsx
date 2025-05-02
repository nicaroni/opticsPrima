import React, { useRef, useEffect, useState } from 'react';

export default function VideoSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const videoRefs = useRef([]);

  const cloudinaryVideos = [
    "https://res.cloudinary.com/di2eg83ws/video/upload/v1744218833/riz1fxcsrq749gdq6xfg.mp4",
    "https://res.cloudinary.com/di2eg83ws/video/upload/v1744218830/bhlzydbhsvnk8wshfuqf.mp4",
    "https://res.cloudinary.com/di2eg83ws/video/upload/v1744218823/w7rkmyisteg7vaknwodn.mp4",
    "https://res.cloudinary.com/di2eg83ws/video/upload/v1744218815/zyj5kerxna7x86qcfnp6.mp4"
  ];

  const addVideoRef = (el) => {
    if (el && !videoRefs.current.includes(el)) {
      videoRefs.current.push(el);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setIsVisible(visible);

        if (visible) {
          videoRefs.current.forEach((video, index) => {
            if (video) {
              video.play().catch(err => {
                console.error(`Video ${index + 1} failed to play:`, err);
              });
            }
          });
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="videos"
      className="py-16 bg-gradient-to-br from-gray-50 to-gray-100"
    >
      <div className="container mx-auto px-4">
     

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cloudinaryVideos.map((videoUrl, index) => (
            <div
              key={index}
              className="relative rounded-xl overflow-hidden shadow-lg"
            >
              <video
                ref={addVideoRef}
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                style={{ aspectRatio: '16/9' }}
              >
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute bottom-4 left-4 text-white text-shadow-md">
                <h3 className="font-semibold text-lg">
                  {[
                    "",
                    "",
                    "",
                    ""
                  ][index]}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center text-gray-600 max-w-2xl mx-auto">
          <p>
            Заповядайте в нашата оптика за изработка на висококачествени очила, съобразени с вашите нужди.
          </p>
        </div>
      </div>
    </section>
  );
}
