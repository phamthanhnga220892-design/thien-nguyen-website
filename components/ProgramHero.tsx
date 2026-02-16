'use client';

import React, { useState, useEffect } from 'react';

// fallback to CSS if framer-motion is not available, but using simple CSS for now 
// actually I should check if I can use just CSS transitions for simplicity as requested

export default function ProgramHero({ images }: { images: string[] }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (images.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 5000); // Change every 5 seconds

        return () => clearInterval(interval);
    }, [images.length]);

    // If no images, show default background
    if (!images || images.length === 0) {
        return (
            <div className="relative py-24 md:py-32 overflow-hidden rounded-[3rem] mb-12 bg-gradient-to-br from-amber-50 to-orange-100">
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="inline-block px-4 py-1 rounded-full bg-amber-400 text-amber-950 text-xs font-bold uppercase tracking-widest mb-6 shadow-lg shadow-amber-200/50">
                        Phật Sự Thiện Nguyện
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 drop-shadow-sm font-display tracking-tight">
                        Chương Trình
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium">
                        Nơi lưu giữ những hành trình gieo mầm yêu thương của nhóm Tâm Nga và các quý mạnh thường quân.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative py-32 md:py-48 overflow-hidden rounded-[3rem] mb-12 group">
            {/* Background Slideshow */}
            {images.map((img, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    <img
                        src={img}
                        alt={`Slide ${index + 1}`}
                        className="w-full h-full object-cover"
                    />
                    {/* Dark Overlay for text readability */}
                    <div className="absolute inset-0 bg-black/40"></div>
                </div>
            ))}

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <span className="inline-block px-6 py-2 rounded-full bg-amber-400/90 backdrop-blur-md text-amber-950 text-xs font-bold uppercase tracking-widest mb-8 shadow-lg shadow-amber-200/20">
                    Phật Sự Thiện Nguyện
                </span>
                <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 drop-shadow-lg font-display tracking-tight">
                    Chương Trình
                </h1>
                <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed font-medium drop-shadow-md">
                    Nơi lưu giữ những hành trình gieo mầm yêu thương của nhóm Tâm Nga và các quý mạnh thường quân.
                </p>

                {/* Dots Navigation */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'w-8 bg-white' : 'bg-white/50 hover:bg-white/80'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
