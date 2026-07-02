"use client";
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

const darkRoutes = [
  "/blogs",
  "/contact-us",
  "/blog-inner",
  "/services-inner",
  "/services-inner1",
  "/services/people-advisory",
  "/services/employee-training-development",
  "/about",
  "/services/upskilling-training",
  "/services/entrepreneurial-consulting",
  "/services/career-development",
  "/services/talent-assessment",
];

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/blogs", label: "Blogs" },
  { href: "/training", label: "Training" },
];

const serviceLinks = [
  { href: "/services/people-advisory", label: "People Advisory" },
  {
    href: "/services/employee-training-development",
    label: "Employee Training & Development",
  },
  {
    href: "/services/upskilling-training",
    label: "Upskilling & Training",
  },
  {
    href: "/services/entrepreneurial-consulting",
    label: "Entrepreneurial Consulting",
  },
  { href: "/services/career-development", label: "Career Development" },
];

const Navbar = () => {
  const pathname = usePathname();
  const isDark = darkRoutes.some(
    (r) => pathname === r || pathname.startsWith(r + "/"),
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
        {links.map(({ href, label }) =>
          href === "/services" ? (
            <div key={href} className="nav-item-dropdown">
              <Link href={href} className="lightning-effect">
                {label}
              </Link>
              <div className="nav-dropdown">
                {serviceLinks.map((service) => (
                  <Link
                    key={service.href}
                    href={service.href}
                    className="nav-dropdown-link"
                  >
                    {service.label}
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <Link key={href} href={href} className="lightning-effect">
              {label}
            </Link>
          ),
        )}
        <Link href="/contact-us" id="contact-link" className="btn-4">
          <span>Contact Us</span>
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
            <rect
              y="13"
              width="28"
              height="2.5"
              rx="1.25"
              fill="currentColor"
            />
            <rect
              y="21"
              width="28"
              height="2.5"
              rx="1.25"
              fill="currentColor"
            />
          </svg>
        </SheetTrigger>

        <SheetContent side="right" className="nav-sheet">
          {/* Sheet logo */}
          <div className="nav-sheet-logo">
            <Image
              src="/blogo.svg"
              alt="Amsha Advisory"
              height={60}
              width={38}
            />
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
