import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-secondary text-muted-foreground py-12 text-center mt-auto border-t border-border">
      <div className="container mx-auto px-4 flex flex-col items-center gap-6">
        <Link href="/" className="inline-flex flex-col items-center opacity-80 hover:opacity-100 transition-opacity">
          <Image src="/logo.png" alt="AK Distributors Logo" width={48} height={48} className="object-contain mb-3 grayscale mix-blend-multiply" />
          <span className="font-semibold text-lg tracking-tight text-foreground">AK Distributors</span>
        </Link>
        <div className="space-y-1">
          <p className="font-medium text-foreground text-sm">Premium Wholesale Distribution</p>
          <p className="text-xs">Providing the best quality products for your business across California.</p>
        </div>
        <p className="text-[11px] mt-4">&copy; 2026 AK Distributors. All rights reserved.</p>
      </div>
    </footer>
  );
}
