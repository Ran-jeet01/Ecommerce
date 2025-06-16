import { Link } from "react-router-dom";

const Hero = () => (
  <section
    className="h-screen flex flex-col justify-center items-center text-white text-center"
    style={{
      backgroundImage:
        "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    <h1 className="text-5xl font-bold mb-6">FLEX IN STYLE</h1>
    <p className="text-xl mb-8">
      Discover premium fashion that matches your unique personality
    </p>
    <Link
      to="/products"
      className="bg-blue-500 hover:bg-blue-600 text-white px-10 py-3 rounded-full font-semibold transition-all"
    >
      SHOP NOW
    </Link>
  </section>
);

export default Hero;
