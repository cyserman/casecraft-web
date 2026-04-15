import { useState } from "react";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";

export default function PhotoGallery({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 bg-slate-100 rounded-lg">
        <div className="text-slate-400 text-4xl mb-4">📷</div>
        <p className="text-slate-500">No photos available</p>
      </div>
    );
  }

  return (
    <div className="photo-gallery">
      <div className="relative bg-slate-100 rounded-lg overflow-hidden shadow-lg">
        <img
          src={images[currentIndex]}
          alt={`Gallery image ${currentIndex + 1}`}
          className="w-full h-96 object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
          <h3 className="text-xl font-bold mb-2">Professional Gallery</h3>
          <p className="text-slate-300">
            {currentIndex + 1} of {images.length} photos
          </p>
        </div>
        {images.length > 1 && (
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}
        {images.length > 1 && (
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 mt-4 justify-center">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-12 h-12 rounded-full overflow-hidden border-2 ${
                currentIndex === idx ? "border-yellow-500" : "border-slate-300"
              }`}
            >
              <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}