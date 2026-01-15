import React from "react";

function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white">
      <div className="max-w-6xl mx-auto px-6 py-24 text-center">

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Build Faster. <br className="hidden md:block" />
          Scale Smarter.
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-lg text-white/90 max-w-2xl mx-auto">
          A modern platform to build, deploy, and scale web applications
          with clean design and reliable performance.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex justify-center gap-4">
          <button className="px-7 py-3 rounded-md bg-white text-blue-700 font-medium hover:bg-gray-100 transition">
            Get Started
          </button>

          <button className="px-7 py-3 rounded-md border border-white/50 hover:bg-white/10 transition">
            Learn More
          </button>
        </div>

      </div>
    </section>
  );
}

export default HeroSection;
