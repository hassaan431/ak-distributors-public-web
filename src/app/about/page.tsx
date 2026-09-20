import Image from "next/image";
import { CheckCircle2, Target, HeartHandshake, Box, Truck, ShieldCheck, MapPin } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative py-32 flex items-center justify-center text-center px-4 overflow-hidden bg-slate-900">
        <Image src="/images/family_business_bg.png" alt="Family Business" fill className="object-cover opacity-60" priority />
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-900/80 to-emerald-900/60" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-sm font-semibold mb-6 backdrop-blur-md">
            <MapPin className="w-4 h-4" />
            Based in Northern California
          </div>
          <h1 className="text-5xl md:text-6xl font-playfair font-bold text-white mb-6 tracking-tight">Our Story</h1>
          <p className="text-xl text-emerald-50/80 max-w-2xl mx-auto leading-relaxed">
            From humble beginnings to a leading wholesale distributor, we are committed to delivering quality products and unmatched reliability to our partners.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto space-y-24">
          
          {/* Intro Grid */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-playfair font-bold text-slate-900">Built on Reliability & Excellence</h2>
              <div className="h-1 w-20 bg-emerald-500 rounded-full"></div>
              <p className="text-lg text-slate-600 leading-relaxed">
                Founded on the principles of integrity and customer success, AK Distributors has grown to become a trusted name in the wholesale industry. We specialize in sourcing and distributing a wide range of premium products, with a particular focus on high-quality Desi brands and essential ingredients.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Our state-of-the-art warehouses and optimized logistics network ensure that your orders are processed swiftly and delivered on time. We understand the unique needs of supermarkets, grocers, and foodservice providers.
              </p>
            </div>
            <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl">
              <Image src="/images/hero_bg.png" alt="Warehouse Operations" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent flex items-end p-8">
                <div className="text-white">
                  <div className="font-bold text-2xl mb-1">State-of-the-Art Logistics</div>
                  <div className="text-white/80">Ensuring swift and secure delivery</div>
                </div>
              </div>
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Target className="w-32 h-32 text-emerald-600" />
              </div>
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h3>
              <p className="text-slate-600 text-lg leading-relaxed">
                To provide unparalleled service and premium products at competitive wholesale prices, fostering long-term partnerships with our clients through trust, transparency, and absolute consistency.
              </p>
            </div>
            
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <HeartHandshake className="w-32 h-32 text-blue-600" />
              </div>
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <HeartHandshake className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Promise</h3>
              <p className="text-slate-600 text-lg leading-relaxed">
                Your success is our success. We pledge to be more than just a supplier; we aim to be a dedicated partner who works tirelessly to keep your shelves stocked and your customers satisfied.
              </p>
            </div>
          </div>

          {/* Core Values Bento Grid */}
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="text-3xl font-playfair font-bold text-slate-900 mb-4">Why Partner With Us?</h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto">The AK Distributors advantage</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Box,
                  color: "text-purple-600",
                  bg: "bg-purple-100",
                  title: "Extensive Catalog",
                  desc: "Access to a diverse range of top-tier products, from staples to specialty imported brands."
                },
                {
                  icon: Truck,
                  color: "text-emerald-600",
                  bg: "bg-emerald-100",
                  title: "Reliable Delivery",
                  desc: "Next-day dispatch across our primary service areas to keep your business running smoothly."
                },
                {
                  icon: ShieldCheck,
                  color: "text-blue-600",
                  bg: "bg-blue-100",
                  title: "Quality Assurance",
                  desc: "Strict quality control measures for every item, ensuring only the best reaches your shelves."
                }
              ].map((feature, i) => (
                <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:border-emerald-200 hover:shadow-md transition-all">
                  <div className={`w-12 h-12 ${feature.bg} ${feature.color} rounded-xl flex items-center justify-center mb-6`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h4>
                  <p className="text-slate-600">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
