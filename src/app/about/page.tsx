import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-playfair font-bold text-slate-900 mb-4">About Us</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          AK Distributors is a leading wholesale distribution company, committed to delivering quality products to our partners.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-8 md:p-12 border shadow-sm prose prose-slate max-w-none prose-lg">
        <p>
          Founded on the principles of reliability and excellence, AK Distributors has grown to become a trusted name in the wholesale industry. We specialize in sourcing and distributing a wide range of premium products, with a particular focus on high-quality Desi brands and essential ingredients.
        </p>
        <p>
          Our state-of-the-art warehouses and optimized logistics network ensure that your orders are processed swiftly and delivered on time. We understand the unique needs of supermarkets, grocers, and foodservice providers, and we are dedicated to helping your business thrive.
        </p>
        <h2>Our Mission</h2>
        <p>
          To provide unparalleled service and premium products at competitive wholesale prices, fostering long-term partnerships with our clients through trust and consistency.
        </p>
        <h2>Why Partner With Us?</h2>
        <ul>
          <li><strong>Extensive Catalog:</strong> Access to a diverse range of top-tier products.</li>
          <li><strong>Reliable Delivery:</strong> Next-day dispatch across our primary service areas.</li>
          <li><strong>Quality Assurance:</strong> Strict quality control measures for every item.</li>
          <li><strong>Dedicated Support:</strong> Our team is always ready to assist you.</li>
        </ul>
      </div>
    </div>
  );
}
