import Image from "next/image";
import { Target, HeartHandshake, Box, Truck, ShieldCheck } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-transparent">
      {/* Hero Section */}
      <section className="relative py-28 flex items-center justify-center text-center px-4 overflow-hidden">
        <Image src="/images/family_business_bg.png" alt="Family Business" fill className="object-cover opacity-30" priority />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-emerald-950/80 via-emerald-900/60 to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-playfair font-bold text-white mb-6 tracking-tight drop-shadow-sm">
            Our Story
          </h1>
          <p className="text-xl text-emerald-100/90 max-w-2xl mx-auto leading-relaxed">
            From humble beginnings to a leading wholesale distributor, we are committed to delivering quality products and unmatched reliability to our partners.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto space-y-16">
          
          {/* Intro Card */}
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-white/40 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-playfair font-bold text-gray-900">Built on Reliability & Excellence</h2>
                <div className="h-1 w-20 bg-emerald-600 rounded-full"></div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  In the distribution business for over 2 decades, we have worked with the top FMCGs of Pakistan, and are now bringing our expertise to the US market. Founded on the principles of integrity and customer success, AK Distributors has grown to become a trusted name in the wholesale industry.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Our state-of-the-art warehouses and optimized logistics network ensure that your orders are processed swiftly and delivered on time. We understand the unique needs of supermarkets, grocers, and foodservice providers.
                </p>
              </div>
              <div className="relative h-[360px] md:h-[400px] rounded-2xl overflow-hidden shadow-xl">
                <Image src="/images/hero_bg.png" alt="Warehouse Operations" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 to-transparent flex items-end p-8">
                  <div className="text-white">
                    <div className="font-bold text-2xl mb-1">State-of-the-Art Logistics</div>
                    <div className="text-white/80">Ensuring swift and secure delivery</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/95 backdrop-blur-md p-10 rounded-3xl shadow-xl border border-white/40 relative overflow-hidden group hover:shadow-2xl transition-all">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Target className="w-32 h-32 text-emerald-600" />
              </div>
              <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Good desi products qualities to be available Door to door.
              </p>
            </div>
            
            <div className="bg-white/95 backdrop-blur-md p-10 rounded-3xl shadow-xl border border-white/40 relative overflow-hidden group hover:shadow-2xl transition-all">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <HeartHandshake className="w-32 h-32 text-emerald-700" />
              </div>
              <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mb-6">
                <HeartHandshake className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Expand business in big market like USA, establishing ourselves as the premier distributor for authentic products.
              </p>
            </div>
          </div>

          {/* Core Values Bento Grid */}
          <div className="space-y-10">
            <div className="text-center">
              <h2 className="text-3xl font-playfair font-bold text-white mb-4 drop-shadow-sm">Why Partner With Us?</h2>
              <p className="text-lg text-emerald-100/90 max-w-2xl mx-auto">The AK Distributors advantage</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Box,
                  color: "text-emerald-700",
                  bg: "bg-emerald-100",
                  title: "Extensive Catalog",
                  desc: "Access to a diverse range of top-tier products, from staples to specialty imported brands."
                },
                {
                  icon: Truck,
                  color: "text-emerald-700",
                  bg: "bg-emerald-100",
                  title: "Reliable Delivery",
                  desc: "Next-day dispatch across our primary service areas to keep your business running smoothly."
                },
                {
                  icon: ShieldCheck,
                  color: "text-emerald-700",
                  bg: "bg-emerald-100",
                  title: "Quality Assurance",
                  desc: "Strict quality control measures for every item, ensuring only the best reaches your shelves."
                }
              ].map((feature, i) => (
                <div key={i} className="bg-white/95 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/40 hover:border-emerald-300 hover:shadow-2xl transition-all">
                  <div className={`w-12 h-12 ${feature.bg} ${feature.color} rounded-xl flex items-center justify-center mb-6`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h4>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
