import { Coffee } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#050505] pt-16 pb-8 border-t border-white/5 relative z-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-10 mb-12">
          
          {/* Brand */}
          <div className="text-center md:text-left">
            <Link href="/" className="inline-flex items-center gap-2 group mb-4">
              <img 
                src="https://yeybeegdfejcniqhwbbd.supabase.co/storage/v1/object/sign/CAFE%20MEHFILE/361632236_675768737751341_8344602149402290112_n-removebg-preview.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lMWU1Nzc2Ny1lYmM0LTQ0MzgtYTE5Ny1hZTcyMTIxNGEzZGQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJDQUZFIE1FSEZJTEUvMzYxNjMyMjM2XzY3NTc2ODczNzc1MTM0MV84MzQ0NjAyMTQ5NDAyMjkwMTEyX24tcmVtb3ZlYmctcHJldmlldy5wbmciLCJpYXQiOjE3NzYyNjg1MTEsImV4cCI6MTg2MjU4MjExMX0.7rXp08RRyGHWB2C6_DdLBc3i1IOhYokXv9qrHb3g_nE" 
                alt="Mehfil The Cafe Logo" 
                className="w-28 h-28 object-contain transition-transform group-hover:scale-110 duration-300"
              />
            </Link>
            <p className="text-gray-500 max-w-xs text-sm">
              Where coffee meets conversations. Jalgaon's premium digital storefront.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-12 text-center md:text-left">
            <div>
              <h4 className="text-white font-bold mb-4">Explore</h4>
              <ul className="space-y-2">
                <li><Link href="#home" className="text-gray-500 hover:text-brand-gold text-sm transition-colors">Home</Link></li>
                <li><Link href="#about" className="text-gray-500 hover:text-brand-gold text-sm transition-colors">About Us</Link></li>
                <li><Link href="#menu" className="text-gray-500 hover:text-brand-gold text-sm transition-colors">Menu</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><Link href="#contact" className="text-gray-500 hover:text-brand-gold text-sm transition-colors">Contact</Link></li>
                <li><Link href="#" className="text-gray-500 hover:text-brand-gold text-sm transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="text-gray-500 hover:text-brand-gold text-sm transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          {/* Socials */}
          <div className="text-center md:text-left">
            <h4 className="text-white font-bold mb-4">Follow Us</h4>
            <div className="flex gap-4 justify-center md:justify-start">
              <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-brand-gold hover:bg-brand-gold/10 transition-all duration-300 hover:-translate-y-1">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-brand-gold hover:bg-brand-gold/10 transition-all duration-300 hover:-translate-y-1">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-brand-gold hover:bg-brand-gold/10 transition-all duration-300 hover:-translate-y-1">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 text-center flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} Mehfil The Cafe. All rights reserved.
          </p>
          <p className="text-gray-600 text-sm">
            Designed and developed by <span className="text-brand-gold font-medium">skimmers</span> ❤️
          </p>
        </div>
      </div>
    </footer>
  );
}
