'use client';
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import "../../styles/navbar.css";

const darkRoutes = ["/blog","/contact-us",'/blog-inner'];

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/testimonials", label: "Testimonials" },
];

const Navbar = () => {
  const pathname = usePathname();
  const isDark = darkRoutes.some(
    (r) => pathname === r || pathname.startsWith(r + "/")
  );

  return (
    <nav className={`nav-container ${isDark ? " nav-dark" : ""}`}>
      {/* Logo */}
      <div className="logo">
        <Image
          src={isDark ? "/blogo.svg" : "/logo.svg"}
          alt="Amsha Advisory"
          height={75}
          width={47}
        />
      </div>

      {/* Desktop links */}
      <div className="nav-links">
        {links.map(({ href, label }) => (
          <Link key={href} href={href}>
            {label}
          </Link>
        ))}
        <Link href="/contact-us" id="contact-link">
          Contact Us
        </Link>
      </div>

      {/* Mobile hamburger */}
      <Sheet>
        <SheetTrigger className="nav-hamburger" aria-label="Open menu">
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect y="5" width="28" height="2.5" rx="1.25" fill="currentColor" />
            <rect y="13" width="28" height="2.5" rx="1.25" fill="currentColor" />
            <rect y="21" width="28" height="2.5" rx="1.25" fill="currentColor" />
          </svg>
        </SheetTrigger>

        <SheetContent side="right" className="nav-sheet">
          {/* Sheet logo */}
          <div className="nav-sheet-logo">
            <Image src="/blogo.svg" alt="Amsha Advisory" height={60} width={38} />
          </div>

          {/* Sheet links */}
          <nav className="nav-sheet-links">
            {links.map(({ href, label }) => (
              <SheetClose
                key={href}
                render={<Link href={href} className="nav-sheet-link" />}
              >
                {label}
              </SheetClose>
            ))}
            <SheetClose
              render={<Link href="/contact-us" className="nav-sheet-contact" />}
            >
              Contact Us
            </SheetClose>
          </nav>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default Navbar;
