import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  Star,
  Users,
  Truck,
  Heart,
  Shield,
  Award,
  ArrowRight,
  Clock,
  RefreshCw,
} from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
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
              From trendy sunglasses to stylish hoodies, comfortable shoes to
              luxury watches - elevate your wardrobe with our curated collection
              of must-have accessories.
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
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trending Now
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the most popular items loved by our community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Product 1 */}
            <div className="group cursor-pointer transform hover:scale-105 transition-all duration-300">
              <div className="bg-gray-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl">
                {/* <div className="h-80 bg-gradient-to-br from-blue-400 to-purple-500 relative overflow-hidden"> */}
                <div
                  className="h-80 relative overflow-hidden bg-cover bg-center"
                  style={{
                    backgroundImage: "url('/img4.jpg')",
                  }}
                >
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    -30%
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <Heart className="w-6 h-6 text-white opacity-70 hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Designer Sunglasses
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Premium polarized lenses with UV400 protection
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-gray-900">
                        $89
                      </span>
                      <span className="text-lg text-gray-500 line-through">
                        $127
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">4.8</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Product 2 */}
            <div className="group cursor-pointer transform hover:scale-105 transition-all duration-300">
              <div className="bg-gray-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl">
                <div
                  className="h-80 relative overflow-hidden bg-cover bg-center"
                  style={{
                    backgroundImage: "url('/img2.jpg')",
                  }}
                >
                  {" "}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                  <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    New
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <Heart className="w-6 h-6 text-white opacity-70 hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Athletic Sneakers
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Lightweight running shoes with advanced cushioning
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-gray-900">
                        $156
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">4.9</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Product 3 */}
            <div className="group cursor-pointer transform hover:scale-105 transition-all duration-300">
              <div className="bg-gray-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl">
                <div
                  className="h-80 relative overflow-hidden bg-cover bg-center"
                  style={{
                    backgroundImage: "url('/img3.jpg')",
                  }}
                >
                  {" "}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                  <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Bestseller
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <Heart className="w-6 h-6 text-white opacity-70 hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Luxury Watch
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Swiss movement with sapphire crystal glass
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-gray-900">
                        $299
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">5.0</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => navigate("/products")}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
            >
              View All Products
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Time2Flex?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're committed to providing you with the best shopping experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-blue-100 group-hover:bg-blue-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors duration-300">
                <Shield className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Authentic Products
              </h3>
              <p className="text-gray-600">
                All our products are 100% authentic and come with manufacturer
                warranties
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-green-100 group-hover:bg-green-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors duration-300">
                <Truck className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Fast Delivery
              </h3>
              <p className="text-gray-600">
                Free shipping on orders over $100 with express delivery options
                available
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-purple-100 group-hover:bg-purple-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors duration-300">
                <RefreshCw className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Easy Returns
              </h3>
              <p className="text-gray-600">
                30-day return policy with hassle-free exchanges and full refunds
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-yellow-100 group-hover:bg-yellow-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors duration-300">
                <Award className="w-10 h-10 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Premium Quality
              </h3>
              <p className="text-gray-600">
                Carefully curated products from top brands with quality
                guarantee
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Stay In The Loop
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and be the first to know about new
            arrivals, exclusive deals, and fashion trends
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full text-gray-900 placeholder-white outline outline-2 outline-amber-500"
            />
            <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105">
              Subscribe
            </button>
          </div>

          <p className="text-blue-200 text-sm mt-4">
            No spam, unsubscribe at any time
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Time2Flex</h3>
              <p className="text-gray-400 mb-4">
                Your destination for premium fashion and accessories. Flex in
                style with our curated collection.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors">
                  <span className="text-sm">f</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors">
                  <span className="text-sm">t</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors">
                  <span className="text-sm">i</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Products
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Shipping Info
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Returns
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Size Guide
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-gray-400">
                <p>📧 hello@time2flex.com</p>
                <p>📞 9876543210</p>
                <p>📍 Thapathali,Kathmandu</p>
                <div className="flex items-center gap-2 mt-4">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">Mon-Fri: 9AM-6PM EST</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Hero;
