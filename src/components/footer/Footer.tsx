import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  ChevronRight,
} from "lucide-react";

export default function Footer() {
  const usefulLinks = [
    { name: "Home", href: "#" },
    { name: "About Us", href: "#" },
    { name: "Services", href: "#" },
    { name: "Blog", href: "#" },
    { name: "FAQ", href: "#" },
    { name: "Contact Us", href: "#" },
  ];

  const serviceAreas = [
    { name: "Sacramento, CA", href: "#" },
    { name: "Elk Grove, CA", href: "#" },
    { name: "Citrus Heights, CA", href: "#" },
    { name: "Folsom, CA", href: "#" },
    { name: "Roseville, CA", href: "#" },
    { name: "View All Areas Served", href: "#", highlight: true },
  ];

  const services = [
    { name: "Website Development", href: "#" },
    { name: "Website Design", href: "#" },
    { name: "Website Maintenance", href: "#" },
    { name: "Digital Marketing", href: "#" },
    { name: "Ecommerce", href: "#" },
    { name: "Search Engine Optimization", href: "#" },
  ];

  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Youtube, href: "#", label: "Youtube" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  const contactInfo = [
    {
      icon: Mail,
      text: "admin@pyxeldev.com",
      href: "mailto:admin@pyxeldev.com",
    },
    { icon: Phone, text: "916-821-9044", href: "tel:9168219044" },
    {
      icon: MapPin,
      text: (
        <>
          500 Capitol Mall, Suite #2350
          <br />
          Sacramento, CA 95814
        </>
      ),
      href: "https://maps.google.com/?q=500+Capitol+Mall+Suite+2350+Sacramento+CA+95814",
    },
  ];

  return (
    <div className="bg-[#161616] px-4 sm:px-6 lg:px-[30px]">
      <footer className="bg-[#2E6BFF] text-white rounded-[2rem] sm:rounded-[2.5rem] pt-8 sm:pt-10 lg:pt-12 pb-6 sm:pb-8 px-4 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Main Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-6 mb-8 sm:mb-10 lg:mb-12">
            {/* Brand Column */}
            <div className="sm:col-span-2 lg:col-span-4 flex flex-col gap-4 sm:gap-5 lg:pr-4">
              {/* Logo - Montserrat font */}
              <div className="mb-1">
                <h2 className="font-['Montserrat'] text-2xl sm:text-3xl font-bold tracking-wider uppercase">
                  Pyxel
                </h2>
                <p className="font-['Rethink_Sans'] text-[0.6rem] sm:text-[0.65rem] tracking-[0.25em] uppercase mt-0.5 opacity-90">
                  Development
                </p>
              </div>

              {/* Description - Rethink Sans */}
              <p className="font-['Rethink_Sans'] text-white/90 text-xs sm:text-sm leading-relaxed max-w-xs">
                Pyxel Development is your solution to all your Website, Web
                Design, Digital Marketing, and SEO (Search Engine Optimization)
                needs.
              </p>

              <div className="mt-1 sm:mt-2">
                {/* Section heading - Montserrat */}
                <h4 className="font-['Montserrat'] font-semibold text-xs sm:text-sm mb-2 sm:mb-3">
                  Follow Us
                </h4>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      aria-label={social.label}
                      className="w-8 h-8 sm:w-9 sm:h-9 bg-black rounded-lg flex items-center justify-center hover:bg-gray-900 transition-colors hover:scale-110 transform duration-200"
                    >
                      <social.icon
                        size={16}
                        className="sm:w-[20px] sm:h-[20px]"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Useful Links */}
            <div className="lg:col-span-2">
              {/* Section heading - Montserrat */}
              <h4 className="font-['Montserrat'] font-semibold text-sm sm:text-base mb-3 sm:mb-4">
                Useful Links
              </h4>
              {/* Links - Rethink Sans */}
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2 sm:flex sm:flex-col sm:gap-y-2.5 text-xs sm:text-sm text-white/90">
                {usefulLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="font-['Rethink_Sans'] inline-flex items-center gap-1 hover:text-white hover:underline decoration-1 underline-offset-2 transition-all group"
                    >
                      <ChevronRight
                        size={12}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Service Area */}
            <div className="lg:col-span-2">
              {/* Section heading - Montserrat */}
              <h4 className="font-['Montserrat'] font-semibold text-sm sm:text-base mb-3 sm:mb-4">
                Service Area
              </h4>
              {/* Links - Rethink Sans */}
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2 sm:flex sm:flex-col sm:gap-y-2.5 text-xs sm:text-sm text-white/90">
                {serviceAreas.map((area, index) => (
                  <li key={index}>
                    <a
                      href={area.href}
                      className={`font-['Rethink_Sans'] inline-flex items-center gap-1 hover:text-white hover:underline decoration-1 underline-offset-2 transition-all group ${
                        area.highlight ? "font-medium text-white" : ""
                      }`}
                    >
                      <ChevronRight
                        size={12}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                      {area.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="lg:col-span-2">
              {/* Section heading - Montserrat */}
              <h4 className="font-['Montserrat'] font-semibold text-sm sm:text-base mb-3 sm:mb-4">
                Services
              </h4>
              {/* Links - Rethink Sans */}
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2 sm:flex sm:flex-col sm:gap-y-2.5 text-xs sm:text-sm text-white/90">
                {services.map((service, index) => (
                  <li key={index}>
                    <a
                      href={service.href}
                      className="font-['Rethink_Sans'] inline-flex items-center gap-1 hover:text-white hover:underline decoration-1 underline-offset-2 transition-all group"
                    >
                      <ChevronRight
                        size={12}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                      {service.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2">
              {/* Section heading - Montserrat */}
              <h4 className="font-['Montserrat'] font-semibold text-sm sm:text-base mb-3 sm:mb-4">
                Contact Info
              </h4>
              {/* Contact items - Rethink Sans */}
              <ul className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-white/90">
                {contactInfo.map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.href}
                      className="font-['Rethink_Sans'] flex items-start gap-2 sm:gap-3 hover:text-white transition-colors group"
                      {...(item.icon === MapPin
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-white/40 flex items-center justify-center shrink-0 mt-0.5 group-hover:border-white group-hover:bg-white/10 transition-all">
                        <item.icon
                          size={12}
                          className="sm:w-[14px] sm:h-[14px]"
                        />
                      </div>
                      <span className="pt-0.5 sm:pt-1 leading-snug">
                        {item.text}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar - Rethink Sans */}
          <div className="border-t border-white/20 pt-4 sm:pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 text-white/80 text-xs">
            <p className="font-['Rethink_Sans'] text-center sm:text-left">
              © 2025 Pyxel Development. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
              <a
                href="#"
                className="font-['Rethink_Sans'] hover:text-white transition-colors hover:underline underline-offset-2"
              >
                Terms of Use
              </a>
              <span className="opacity-50 hidden sm:inline">|</span>
              <span className="opacity-50 sm:hidden mx-1">•</span>
              <a
                href="#"
                className="font-['Rethink_Sans'] hover:text-white transition-colors hover:underline underline-offset-2"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
      {/* Bottom padding */}
      <div className="h-5 bg-[#0a0a0a]" />
    </div>
  );
}
