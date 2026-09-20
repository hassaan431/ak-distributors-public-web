import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-emerald-950 text-slate-300 py-12 text-center mt-auto border-t-4 border-emerald-800">
      <div className="container mx-auto px-4 flex flex-col items-center gap-6">
        <Link href="/" className="inline-flex flex-col items-center opacity-90 hover:opacity-100 transition-opacity">
          <Image src="/logo.png" alt="AK Distributors Logo" width={60} height={60} className="object-contain mb-3 drop-shadow-md" />
          <span className="font-playfair text-2xl font-bold text-white">AK Distributors</span>
        </Link>
        <div className="space-y-2">
          <p className="font-semibold text-white">Premium Wholesale Distribution</p>
          <p className="text-sm">Providing the best quality products for your business across California.</p>
        </div>
        <p className="text-sm mt-4 text-emerald-700/60">&copy; 2026 AK Distributors. All rights reserved.</p>
      </div>
    </footer>
  );
}
