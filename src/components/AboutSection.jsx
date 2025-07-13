import { Card, CardContent } from "@/components/ui/card";
import { Shield, Truck, Award, Users } from "lucide-react";

const AboutSection = () => {
  const features = [
    {
      icon: Shield,
      title: "Quality Guarantee",
      description:
        "All our products come with a 2-year warranty and quality assurance",
    },
    {
      icon: Truck,
      title: "Fast Shipping",
      description:
        "Free shipping on orders over $100 with express delivery options",
    },
    {
      icon: Award,
      title: "Premium Brands",
      description:
        "Curated collection from the world's most trusted fashion brands",
    },
    {
      icon: Users,
      title: "Customer Support",
      description:
        "24/7 customer support to help you with any questions or concerns",
    },
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">Why Choose FlexStyle?</h2>
            <p className="text-lg text-gray-600 mb-8">
              We're passionate about bringing you the latest in fashion and
              style. Our carefully curated collection features premium quality
              items that help you express your unique personality and stay ahead
              of the trends.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <feature.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=400&fit=crop"
                alt="Fashion store"
                className="rounded-lg shadow-lg"
              />
              <img
                src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=300&h=400&fit=crop"
                alt="Shopping experience"
                className="rounded-lg shadow-lg mt-8"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-xl">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">50K+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
