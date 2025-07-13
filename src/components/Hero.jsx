// import { Link } from "react-router-dom";

// const Hero = () => (
//   <section
//     className="h-screen flex flex-col justify-center items-center text-white text-center"
//     style={{
//       backgroundImage:
//         "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
//       backgroundSize: "cover",
//       backgroundPosition: "center",
//     }}
//   >
//     <h1 className="text-5xl font-bold mb-6">FLEX IN STYLE</h1>
//     <p className="text-xl mb-8">
//       Discover premium fashion that matches your unique personality
//     </p>
//     <Link
//       to="/products"
//       className="bg-blue-500 hover:bg-blue-600 text-white px-10 py-3 rounded-full font-semibold transition-all"
//     >
//       SHOP NOW
//     </Link>
//   </section>
// );

// export default Hero;

import { Link } from "react-router-dom";
import { ShoppingBag, Star, Users, Truck } from "lucide-react";

const Hero = () => (
  <section className="relative min-h-screen overflow-hidden">
    {/* Background with overlay */}
    <div
      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
      }}
    />
    <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70" />

    {/* Content */}
    <div className="relative z-10 flex flex-col justify-center items-center min-h-screen px-4 text-center text-white">
      {/* Main Hero Content */}
      <div className="max-w-4xl mx-auto animate-fade-in">
        <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
          FLEX IN STYLE
        </h1>
        <p className="text-xl md:text-2xl mb-4 text-gray-200 font-light">
          Discover premium fashion that matches your unique personality
        </p>
        <p className="text-lg mb-12 text-gray-300 max-w-2xl mx-auto">
          From trendy sunglasses to stylish hoodies, comfortable shoes to luxury
          watches - elevate your wardrobe with our curated collection of
          must-have accessories.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link
            to="/products"
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-10 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <ShoppingBag className="inline-block w-5 h-5 mr-2" />
            SHOP NOW
          </Link>
          <Link
            to="/products"
            className="border-2 border-white/30 hover:border-white text-white hover:bg-white hover:text-black px-10 py-4 rounded-full font-semibold transition-all duration-300 backdrop-blur-sm"
          >
            VIEW COLLECTIONS
          </Link>
        </div>
      </div>

      {/* Product Categories Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16 animate-fade-in">
        <div className="group cursor-pointer">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
            <div className="text-3xl mb-3">🕶️</div>
            <h3 className="font-semibold text-lg mb-2">Sunglasses</h3>
            <p className="text-sm text-gray-300">Premium UV Protection</p>
          </div>
        </div>

        <div className="group cursor-pointer">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
            <div className="text-3xl mb-3">👟</div>
            <h3 className="font-semibold text-lg mb-2">Shoes</h3>
            <p className="text-sm text-gray-300">Comfort & Style</p>
          </div>
        </div>

        <div className="group cursor-pointer">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
            <div className="text-3xl mb-3">👕</div>
            <h3 className="font-semibold text-lg mb-2">Hoodies</h3>
            <p className="text-sm text-gray-300">Cozy & Trendy</p>
          </div>
        </div>

        <div className="group cursor-pointer">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
            <div className="text-3xl mb-3">⌚</div>
            <h3 className="font-semibold text-lg mb-2">Watches</h3>
            <p className="text-sm text-gray-300">Luxury Timepieces</p>
          </div>
        </div>
      </div>

      {/* Social Proof & Features */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-300 animate-fade-in">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4" />
          <span>50K+ Happy Customers</span>
        </div>
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-yellow-400" />
          <span>4.9/5 Rating</span>
        </div>
        <div className="flex items-center gap-2">
          <Truck className="w-4 h-4" />
          <span>Free Shipping Over $100</span>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
