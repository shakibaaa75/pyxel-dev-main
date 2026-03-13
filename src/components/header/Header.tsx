import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Button, { ArrowRightIcon, MenuIcon, CloseIcon } from "./../button";

interface NavLink {
  name: string;
  href: string;
}

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const location = useLocation();

  const navLinks: NavLink[] = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Blogs", href: "/blogs" },
    { name: "Faq", href: "/faq" },
    { name: "Contact Us", href: "/contact" },
  ];

  // Check if link is active based on current pathname
  const isActive = (href: string) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(href);
  };

  return (
    <header className="bg-black text-white sticky top-0 z-50 w-full">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img
                src="images/Layer 2.png"
                alt="PYXEL DEVELOPMENT"
                className="h-10 w-auto sm:h-12"
              />
            </Link>
          </div>

          {/* Desktop Navigation - Hidden below 1120px */}
          <nav className="hidden xl:flex items-center gap-8 xl:gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`relative text-base font-medium transition-all duration-300 group ${
                  isActive(link.href)
                    ? "text-[#2A7DFF]"
                    : "text-gray-300 hover:text-[#2A7DFF]"
                }`}
              >
                {link.name}
                <span
                  className={`absolute -bottom-2 left-0 h-0.5 bg-[#2A7DFF] transition-all duration-300 ${
                    isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* Desktop Contact & CTA - Hidden below 1120px */}
          <div className="hidden xl:flex items-center gap-6 xl:gap-10">
            <div className="text-right">
              <p className="text-gray-400 text-xs xl:text-sm mb-0.5">
                Call anytime
              </p>
              <p className="text-white text-sm xl:text-base font-semibold">
                + 98 (000) - 9630
              </p>
            </div>

            <Button>
              Start Your Project
              <ArrowRightIcon />
            </Button>
          </div>

          {/* Mobile Menu Button - Visible below 1120px */}
          <div className="flex xl:hidden items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-white p-2 relative z-50"
              aria-label="Open menu"
            >
              <MenuIcon />
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 xl:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Mobile Menu - Full Width Slide from Right */}
        <div
          className={`fixed top-0 right-0 h-full w-full sm:w-80 bg-black z-50 xl:hidden transform transition-transform duration-500 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-6 right-6 text-white p-2 hover:bg-white/10 rounded-full transition-colors z-10"
            aria-label="Close menu"
          >
            <CloseIcon />
          </button>

          <div className="flex flex-col h-full p-6 pt-20">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`relative text-lg font-medium transition-all duration-300 group w-fit ${
                    isActive(link.href)
                      ? "text-[#2A7DFF]"
                      : "text-gray-300 hover:text-[#2A7DFF]"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-[#2A7DFF] transition-all duration-300 ${
                      isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              ))}
            </nav>

            {/* Contact Info */}
            <div className="mt-auto pb-6">
              <div className="border-t border-gray-800 pt-5">
                <p className="text-gray-400 text-xs mb-1">Call anytime</p>
                <p className="text-white text-base font-semibold mb-4">
                  + 98 (000) - 9630
                </p>

                <Button fullWidth={true}>
                  Start Your Project
                  <ArrowRightIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
