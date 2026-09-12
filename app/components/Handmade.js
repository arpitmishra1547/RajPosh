"use client"
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Handmade = () => {
  const videoRef = useRef(null);
  const overlayRef = useRef(null);
  const textRef = useRef(null);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const containerRef = useRef(null);
  const boxRefs = useRef([]);

  const boxes = [
    {
      image: "/women.webp",
      label: "WOMEN WEAR",
    },
    {
      image: "/jwellery.webp",
      label: "JEWELLERY",
    },
    {
      image: "/kids.webp",
      label: "KIDS WEAR",
    },
  ];

  useEffect(() => {
    const video = videoRef.current;
    const overlay = overlayRef.current;
    const text = textRef.current;
    const section = sectionRef.current;
    const titleEl = titleRef.current;

    if (!video || !overlay || !text) return;

    // Hero Video Animations
    gsap.to([video, overlay], {
      opacity: 0,
      scrollTrigger: {
        trigger: video,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    gsap.to(text, {
      scale: 1.5,
      opacity: 0,
      scrollTrigger: {
        trigger: video,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    if (section && titleEl) {
      // Pin the section while scrolling
      gsap.to(section, {
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=150%",
          pin: true,
          pinSpacing: true,
          scrub: 1,
        },
      });

      // Animate title: slide from right, then to left and disappear
      gsap.fromTo(
        titleEl,
        {
          x: "100vw",
          opacity: 0,
        },
        {
          x: "-100vw",
          opacity: 1,
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=150%",
            scrub: 1,
            onUpdate: (self) => {
              if (self.progress < 0.3) {
                gsap.set(titleEl, { opacity: self.progress / 0.3 });
              } else if (self.progress > 0.7) {
                gsap.set(titleEl, { opacity: 1 - (self.progress - 0.7) / 0.3 });
              } else {
                gsap.set(titleEl, { opacity: 1 });
              }
            },
          },
        }
      );
    }

    // Box Animations
    boxRefs.current.forEach((box) => {
      if (!box) return;

      gsap.fromTo(
        box,
        {
          y: 200,
          opacity: 0,
          scale: 0.8,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          scrollTrigger: {
            trigger: box,
            start: "top 85%",
            end: "top 50%",
            scrub: 1,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="bg-background">
      {/* Hero Video Section */}
      <div className="relative h-screen overflow-hidden">
        <div
          ref={videoRef}
          className="absolute inset-0 bg-gradient-to-b from-white via-white to-white"
        >
          <div className="absolute inset-0 opacity-20">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 3}s`,
                }}
              />
            ))}
          </div>
        </div>

        <div
          ref={overlayRef}
          className="absolute inset-0 bg-white/60 backdrop-blur-sm"
        />

        <div
          ref={textRef}
          className="absolute inset-0 flex items-center justify-center z-10"
        >
          <div className="text-center px-8">
            <h1 className="text-7xl md:text-9xl font-bold text-scroll-text mb-6">
              Handmade for you
            </h1>
            <p className="text-2xl md:text-3xl text-scroll-text-muted">
              Experience the Magic
            </p>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10">
          <div className="w-6 h-10 border-2 border-scroll-text-muted rounded-full flex justify-center p-2">
            <div className="w-1 h-3 bg-scroll-text-muted rounded-full animate-bounce" />
          </div>
        </div>
      </div>

      {/* Scroll Section */}
      {/* <div
        ref={sectionRef}
        className="min-h-screen flex items-center justify-center relative"
      >
        <h2
          ref={titleRef}
          className="text-6xl md:text-9xl font-bold text-scroll-text whitespace-nowrap"
        >
          Handmade For You
        </h2>
      </div> */}
      

      {/* Box Section */}
      <div ref={containerRef} className="min-h-screen py-32 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          {boxes.map((box, index) => (
            <div
              key={index}
              ref={(el) => (boxRefs.current[index] = el)}
              className="relative h-[400px] rounded-2xl overflow-hidden group cursor-pointer"
            >
              {/* Background Image */}
              <img
                src={box.image}
                alt={box.label}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />
              
              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center pb-6">
                <div className="bg-white px-8 py-3 rounded-full">
                  <p className="text-lg font-bold text-black tracking-wider">{box.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Final Section */}
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center px-8">
          <h2 className="text-6xl md:text-8xl font-bold text-scroll-text mb-8">
            Ready to Build?
          </h2>
          <p className="text-2xl text-scroll-text-muted mb-12">
            Start creating your own scroll-driven experiences
          </p>
          <button className="px-12 py-4 bg-primary text-primary-foreground rounded-full text-xl font-semibold hover:scale-105 transition-transform duration-300">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};
