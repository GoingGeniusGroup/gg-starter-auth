"use client"
import React,{useState} from 'react'
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageProps{
    images:string[]
}
const ImageGallery = ({images}:ImageProps) => {
     const [currentIndex, setCurrentIndex] = useState(0);
      const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      };
      const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      };
  return (
    <div>
          <div className="relative h-full w-full">
              <div className="relative h-full w-full overflow-hidden">
            
                <img
                 src={images[currentIndex]}
                  alt={`Category image ${currentIndex + 1}`}
                  className="h-full w-full object-contain rounded-md"
                />
              </div>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-slate-800 p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-slate-700"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-slate-800 p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-slate-700"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full ${currentIndex === index ? "bg-white" : "bg-white/50"}`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
             
            </div>
            <div className="flex mt-2 gap-4">
              {images.map((url, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-20 h-20 rounded-md overflow-hidden ${
                    currentIndex === index ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <img src={url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
    </div>
  )
}

export default ImageGallery