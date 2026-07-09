"use client";
import { useState } from "react";
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
  // "/services-inner",
  // "/services-inner1",
  // "/services/people-advisory",
  // "/services/employee-training-development",
  // "/about",
  // "/services/upskilling-training",
  // "/services/entrepreneurial-consulting",
  // "/services/career-development",
  // "/services/talent-assessment",
];

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/blogs", label: "Blogs" },
];
const serviceLinks = [
  { href: "/services/people-advisory", label: "People Advisory" },
  {
    href: "/services/employee-training-development",
    label: "Employee Training & Development",
    children: [{ href: "/training", label: "Training Programme" }],
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
  { href: "/services/talent-assessment", label: "Talent Assessment" },
];

const Navbar = () => {
  const pathname = usePathname();
  const isDark = darkRoutes.some(
    (r) => pathname === r || pathname.startsWith(r + "/"),
  );
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  // The dropdown is normally hover-driven (CSS :hover/:focus-within), but
  // clicking a link inside it triggers a client-side route change without
  // the mouse ever leaving — so hover alone would leave it visually open
  // after navigating. Suppress it explicitly on click until the mouse
  // re-enters the item.
  const [dropdownForceClosed, setDropdownForceClosed] = useState(false);

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
            <div
              key={href}
              className={`nav-item-dropdown${dropdownForceClosed ? " is-force-closed" : ""}`}
              onMouseEnter={() => setDropdownForceClosed(false)}
            >
              <Link
                href={href}
                className="lightning-effect"
                onClick={() => setDropdownForceClosed(true)}
              >
                {label}
              </Link>
            <div className="nav-dropdown">
  {serviceLinks.map((service) =>
    service.children ? (
      <div key={service.href} className="nav-dropdown-parent">
        <Link
          href={service.href}
          className="nav-dropdown-link nav-dropdown-link-parent"
          onClick={() => setDropdownForceClosed(true)}
        >
          <span>{service.label}</span>
          <span className="nav-mini-plus">+</span>
        </Link>

        <div className="nav-sub-dropdown-bottom">
          {service.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className="nav-sub-dropdown-link"
              onClick={() => setDropdownForceClosed(true)}
            >
              {child.label}
            </Link>
          ))}
        </div>
      </div>
    ) : (
      <Link
        key={service.href}
        href={service.href}
        className="nav-dropdown-link"
        onClick={() => setDropdownForceClosed(true)}
      >
        {service.label}
      </Link>
    ),
  )}
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
            {links.map(({ href, label }) =>
              href === "/services" ? (
                <div key={href} className="nav-sheet-services">
                  <div className="nav-sheet-services-row">
                    <SheetClose
                      render={<Link href={href} className="nav-sheet-link" />}
                    >
                      {label}
                    </SheetClose>
                    <button
                      type="button"
                      className={`nav-sheet-services-toggle${mobileServicesOpen ? " is-open" : ""}`}
                      aria-label="Toggle services list"
                      aria-expanded={mobileServicesOpen}
                      onClick={() => setMobileServicesOpen((prev) => !prev)}
                    >
                      <svg width="14" height="9" viewBox="0 0 14 9" fill="none">
                        <path
                          d="M1 1.5L7 7.5L13 1.5"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>

                  {mobileServicesOpen && (
                    <div className="nav-sheet-services-list">
                      {serviceLinks.map((service) => (
                        <div
                          key={service.href}
                          className="nav-sheet-service-item"
                        >
                          <SheetClose
                            render={
                              <Link
                                href={service.href}
                                className="nav-sheet-sublink"
                              />
                            }
                          >
                            {service.label}
                          </SheetClose>

                          {service.children?.map((child) => (
                            <SheetClose
                              key={child.href}
                              render={
                                <Link
                                  href={child.href}
                                  className="nav-sheet-subchild"
                                />
                              }
                            >
                              + {child.label}
                            </SheetClose>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <SheetClose
                  key={href}
                  render={<Link href={href} className="nav-sheet-link" />}
                >
                  {label}
                </SheetClose>
              ),
            )}
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
