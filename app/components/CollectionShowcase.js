"use client" // Needs to be a client component for GSAP and hooks

import { useEffect, useRef } from "react"
import Image from "next/image"
import gsap from "gsap"
import ScrollTrigger from "gsap/dist/ScrollTrigger"

// Register the GSAP plugin
gsap.registerPlugin(ScrollTrigger)

// 1. Data from your index.js file is now inside this component
const collectionItems = [
  {
    id: "1",
    name: "Poshak",
    image: "/traditional-rajasthani-poshak-ethnic-wear.jpg",
    description: "Traditional Rajasthani ethnic wear with intricate designs",
  },
  {
    id: "2",
    name: "Saree",
    image: "/beautiful-silk-saree-traditional-indian.jpg",
    description: "Elegant silk sarees in vibrant colors and patterns",
  },
  {
    id: "3",
    name: "Odhni",
    image: "/traditional-odhni-dupatta-indian-fashion.jpg",
    description: "Traditional odhni with authentic embroidery",
  },
  {
    id: "4",
    name: "Bridal",
    image: "/indian-bridal-wedding-lehenga-dress.jpg",
    description: "Stunning bridal wear for your special day",
  },
  {
    id: "5",
    name: "Jewellery",
    image: "/gold-indian-jewelry-ornaments-traditional.jpg",
    description: "Premium Indian gold jewelry and ornaments",
  },
  {
    id: "6",
    name: "All Collections",
    image: "/collection-of-indian-ethnic-fashion-clothes.jpg",
    description: "Explore our complete range of ethnic fashion",
  },
]

// 2. The component logic from your CollectionShowcase.js file
export default function EthnicShowcase() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const descRef = useRef(null)
  const cardsRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "top 20%",
          scrub: 1,
        },
        opacity: 0,
        y: 50,
        duration: 1,
      })

      gsap.from(descRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "top 10%",
          scrub: 1,
        },
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.2,
      })

      const cards = cardsRef.current?.querySelectorAll("[data-collection-card]")
      if (cards) {
        gsap.from(cards, {
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top center+=100",
            end: "top center-100",
            scrub: 1,
          },
          opacity: 0,
          y: 60,
          scale: 0.9,
          stagger: 0.15,
          duration: 1,
          ease: "power3.out",
        })
      }
    })

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  // 3. The JSX, with styles updated to match our LV project (bg-white, text-black, etc.)
  return (
    <section ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-20 text-center space-y-6">
          <div className="inline-block">
            <div className="h-1 w-20 bg-black mb-6 mx-auto"></div>
            <h2 ref={titleRef} className="text-5xl sm:text-6xl lg:text-7xl font-bold text-black">
              <span className="block">Our</span>
              <span className="text-black">Collections</span>
            </h2>
            <div className="h-1 w-20 bg-black mt-6 mx-auto"></div>
          </div>

          <p ref={descRef} className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Discover the perfect blend of tradition and elegance. Each collection celebrates the timeless beauty of
            Indian ethnic wear, crafted with passion and precision.
          </p>
        </div>

        {/* Collections Grid - we now use the 'collectionItems' from this file */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {collectionItems.map((item) => (
            <div key={item.id} data-collection-card className="group cursor-pointer">
              {/* Premium Card Container */}
              <div className="relative">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gray-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Image Container */}
                <div className="relative h-80 sm:h-96 mb-6 overflow-hidden rounded-sm bg-gray-100 border-2 border-gray-100">
                  <Image
                    src={item.image || "/placeholder.svg?height=400&width=300&query=collection"}
                    alt={item.name}
                    fill
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>
                </div>

                {/* Content Section */}
                <div className="space-y-3 pb-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl sm:text-3xl font-semibold text-black group-hover:text-black transition-colors duration-300">
                      {item.name}
                    </h3>
                    <div className="w-8 h-0.5 bg-black group-hover:w-12 transition-all duration-300"></div>
                  </div>
                  {item.description && <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}