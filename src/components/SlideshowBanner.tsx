
"use client"

import type React from "react"
import { useState, useEffect } from "react"
import ShopNowButton from "./ShopNowButton"

const bannerImages = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/coffee-2534919_1920.jpg-LQW7QEkicANuaJ89BGxyRWKmNsDpPq.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tea-6791234_1920.jpg-FPvI7c5iIXNXmKzL0UZqtxwLjMbTeF.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-katja-b-713703402-30705538.jpg-bLvtw6m4AzkWC4E9GddhYimwOfi31l.jpeg",
]

const SlideshowBanner: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [slideDirection, setSlideDirection] = useState("slide-left")

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideDirection("slide-left")
      setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Current Slide */}
      <div
        className={`absolute inset-0 bg-center bg-cover bg-no-repeat transition-transform duration-700 ${slideDirection}`}
        style={{
          backgroundImage: `url(${bannerImages[currentIndex]})`,
        }}
      />

      {/* Next Slide */}
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${bannerImages[(currentIndex + 1) % bannerImages.length]})`,
          zIndex: -1,
        }}
      />

      {/* Overlay for better text contrast */}
      <div className="absolute inset-0 bg-black bg-opacity-30" />

      {/* Text Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Find your Product</h1>
        <p className="text-lg md:text-2xl font-medium mb-6">100% pure &amp; Sustainable.</p>
        {/* <ShopNowButton scrollToId="target-section" /> */}
      </div>

      <style>{`
        .slide-left {
          animation: slideLeft 0.7s ease-in-out;
        }

        @keyframes slideLeft {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  )
}

export default SlideshowBanner