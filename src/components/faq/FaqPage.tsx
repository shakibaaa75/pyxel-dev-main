import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import Button, { ArrowRightIcon } from "../button";
import { Mail, FileText, Layers, HelpCircle, X } from "lucide-react";
import Breadcrumb from "../Breadcrumb/Breadcrumb";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSection {
  title: string;
  items: FAQItem[];
}

const faqSections: FAQSection[] = [
  {
    title: "General information FAQs",
    items: [
      {
        question: "What services does your agency provide?",
        answer:
          "We specialize in including graphic design, branding, website design and development, UX/UI design, social media marketing, digital advertising, video production, and content creation.",
      },
      {
        question: "Who are your typical clients?",
        answer:
          "We work with a wide range of clients including startups, SMEs, and established enterprises across various industries looking to strengthen their digital presence.",
      },
      {
        question: "How long does a typical project take?",
        answer:
          "Project timelines vary depending on scope and complexity. A simple branding project may take 2–4 weeks, while a full website build can take 6–12 weeks.",
      },
      {
        question: "What is your pricing structure?",
        answer:
          "We offer flexible pricing models including fixed-price packages, hourly rates, and retainer-based engagements tailored to your specific needs and budget.",
      },
      {
        question: "Why are UX and UI important?",
        answer:
          "UX and UI design directly impact user satisfaction, engagement, and conversion rates. Great design makes your product intuitive and enjoyable to use, leading to better business outcomes.",
      },
    ],
  },
  {
    title: "Technical and design FAQs",
    items: [
      {
        question: "What formats do you deliver designs in?",
        answer:
          "We deliver designs in a variety of formats depending on your needs, including vector files like AI, EPS, PDF, and web-friendly formats like PNG, JPEG, and SVG. For animations or videos, formats like MP4 or GIF are also provided.",
      },
      {
        question: "Are your designs responsive and mobile-friendly?",
        answer:
          "Absolutely. All our web designs are built with a mobile-first approach to ensure they look and function perfectly on all screen sizes and devices.",
      },
    ],
  },
  {
    title: "Project management FAQs",
    items: [
      {
        question: "How do you manage projects to ensure timely delivery?",
        answer:
          "We use agile methodologies and project management tools like Asana and Notion to track progress, set milestones, and communicate with clients throughout the project lifecycle.",
      },
      {
        question: "What is your revision process?",
        answer:
          "We offer multiple rounds of revisions based on your package. Each revision round allows you to provide feedback and request changes until you're satisfied with the final result.",
      },
      {
        question: "Who will be my main point of contact?",
        answer:
          "You will be assigned a dedicated project manager who will serve as your primary contact throughout the engagement, ensuring clear communication and accountability.",
      },
    ],
  },
  {
    title: "Client support FAQs",
    items: [
      {
        question:
          "Do you offer ongoing support after the project is completed?",
        answer:
          "Yes, we provide ongoing support for services such as website maintenance, updates, design tweaks, and marketing campaigns. Our support packages can be customized based on your specific needs.",
      },
      {
        question: "How do I contact your support team?",
        answer:
          "You can reach our support team via email at info@domain.com, through our website's live chat, or by scheduling a call through our booking system.",
      },
      {
        question: "What is your response time for support inquiries?",
        answer:
          "We aim to respond to all support inquiries within 24 business hours. For urgent matters, priority support options are available in our premium packages.",
      },
    ],
  },
];

const sidebarLinks = [
  {
    label: "General information FAQs",
    icon: <HelpCircle className="w-4 h-4" />,
  },
  { label: "Technical and design FAQs", icon: <Layers className="w-4 h-4" /> },
  { label: "Project management FAQs", icon: <FileText className="w-4 h-4" /> },
  { label: "Client support FAQs", icon: <Mail className="w-4 h-4" /> },
];

const smoothEase: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

// ─── Mobile Sidebar Drawer ────────────────────────────────────────────────────
const MobileSidebarDrawer: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onLinkClick: (link: string) => void;
  hasAnimated: boolean;
}> = ({ isOpen, onClose, onLinkClick, hasAnimated }) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 lg:hidden"
        />
      )}

      {/* Drawer */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ duration: 0.3, ease: smoothEase }}
        className="fixed right-0 top-0 h-full w-[280px] sm:w-[320px] bg-[#111111] z-50 lg:hidden shadow-2xl overflow-y-auto"
      >
        <div className="sticky top-0 bg-[#111111] z-10 px-4 py-4 border-b border-white/10 flex justify-between items-center">
          <h3 className="text-white font-semibold text-base">Categories</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        <div className="p-4">
          {/* Nav links - Portfolio style */}
          <div className="rounded-2xl overflow-hidden border border-white/8">
            <div className="bg-[#2E6BFF] px-4 py-3">
              <h3 className="text-white font-semibold text-sm">Categories</h3>
            </div>
            <div className="px-4 py-3" style={{ background: "#1a1a1a" }}>
              {sidebarLinks.map((link, i) => (
                <button
                  key={i}
                  onClick={() => {
                    onLinkClick(link.label);
                    onClose();
                  }}
                  className="w-full text-left py-3 group"
                >
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-gray-400 group-hover:text-[#2E6BFF] transition-colors">
                      {link.icon}
                    </span>
                    <span className="text-white text-xs font-semibold group-hover:text-[#2E6BFF] transition-colors">
                      {link.label}
                    </span>
                  </div>
                  <div className="h-px bg-white/5 mt-3 group-last:hidden" />
                </button>
              ))}
            </div>
          </div>

          {/* Contact Card */}
          <div
            className="mt-5 rounded-2xl px-4 py-5 border border-white/8 flex flex-col items-center text-center gap-3"
            style={{ background: "#1a1a1a" }}
          >
            <div className="w-12 h-12 rounded-full bg-[#2E6BFF]/15 flex items-center justify-center">
              <div className="relative">
                <Mail className="w-5 h-5 text-[#2E6BFF]" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-[#1a1a1a]" />
              </div>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed">
              We are always available to discuss with you
            </p>
            <p className="text-white text-xs font-medium">info@domain.com</p>
            <button
              onClick={() => {
                onLinkClick("");
                setTimeout(() => (window.location.href = "/contact"), 100);
              }}
              className="flex items-center gap-2 bg-[#2E6BFF] hover:bg-[#1e5fcc] transition-colors text-white text-xs font-semibold px-5 py-2.5 rounded-full"
            >
              Contact Us <ArrowRightIcon className="w-3 h-3" />
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

function AccordionItem({
  item,
  index,
  hasAnimated,
}: {
  item: FAQItem;
  index: number;
  hasAnimated: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: 0.5,
        delay: hasAnimated ? index * 0.05 + 0.2 : 0,
        ease: smoothEase,
      }}
      className={`border rounded-xl mb-3 transition-all duration-300 cursor-pointer select-none ${
        open ? "border-gray-600 bg-[#1a1a1a]" : "border-white/8 bg-[#161616]"
      }`}
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between px-4 sm:px-5 py-3 sm:py-4">
        <span className="text-white font-semibold text-[14px] sm:text-[15px] leading-snug pr-4">
          {item.question}
        </span>
        <motion.span
          animate={{ rotate: open ? 0 : 0 }}
          className={`flex-shrink-0 text-[#2E6BFF] text-xl font-light transition-transform duration-300`}
        >
          {open ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect
                x="3"
                y="9.5"
                width="14"
                height="1.5"
                rx="0.75"
                fill="#2E6BFF"
              />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect
                x="3"
                y="9.25"
                width="14"
                height="1.5"
                rx="0.75"
                fill="#2E6BFF"
              />
              <rect
                x="9.25"
                y="3"
                width="1.5"
                height="14"
                rx="0.75"
                fill="#2E6BFF"
              />
            </svg>
          )}
        </motion.span>
      </div>
      <motion.div
        initial={false}
        animate={{
          height: open ? "auto" : 0,
          opacity: open ? 1 : 0,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className="overflow-hidden"
      >
        <div className="px-4 sm:px-5 pb-4 sm:pb-5">
          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
            {item.answer}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function FAQPage() {
  const navigate = useNavigate();
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      setIsLoaded(true);
    }
  }, [isInView, hasAnimated]);

  const breadcrumbItems = [
    { label: "Home", path: "/", isLast: false },
    { label: "FAQs", path: "/faqs", isLast: true },
  ];

  const handleContactClick = () => {
    navigate("/contact");
  };

  const handleSidebarLinkClick = (link: string) => {
    const element = document.getElementById(
      link.toLowerCase().replace(/\s+/g, "-"),
    );
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      ref={sectionRef}
      className="min-h-screen bg-[#111111] font-['Montserrat']"
    >
      {/* Mobile Sidebar Drawer */}
      <MobileSidebarDrawer
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
        onLinkClick={handleSidebarLinkClick}
        hasAnimated={hasAnimated}
      />

      {/* Hero Header - Matching BlogSinglePage Design */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-8 sm:pt-10 pb-12 sm:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="bg-[#1e1e1e] rounded-[20px] p-6 sm:p-8 md:p-10 mb-6 sm:mb-8"
        >
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
              <span className="text-white">Frequently Asked </span>
              <span className="text-[#2E6BFF]">Questions</span>
            </h1>

            {/* Dynamic Breadcrumb - using Breadcrumb component */}
            <div className="mt-2">
              <Breadcrumb customItems={breadcrumbItems} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Body */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pb-16 sm:pb-20">
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-10">
          {/* Mobile Categories Button */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setIsMobileDrawerOpen(true)}
              className="w-full flex items-center justify-between gap-2 bg-[#1e1e1e] rounded-xl px-4 py-3 border border-white/10"
            >
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#2E6BFF]" />
                <span className="text-white text-sm font-medium">
                  Categories
                </span>
              </div>
              <ArrowRightIcon className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          {/* Sidebar - Desktop (Portfolio Style) */}
          <motion.aside
            initial={{ opacity: 0, x: -24 }}
            animate={
              hasAnimated ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }
            }
            transition={{ duration: 0.6, delay: 0.2, ease: smoothEase }}
            className="hidden lg:block w-full lg:w-[280px] xl:w-[300px] flex-shrink-0"
          >
            <div className="space-y-5">
              {/* Categories Card - Portfolio Style */}
              <div className="rounded-2xl overflow-hidden border border-white/8">
                <div className="bg-[#2E6BFF] px-5 py-3">
                  <h3 className="text-white font-semibold text-sm">
                    Categories
                  </h3>
                </div>
                <div className="px-5 py-4" style={{ background: "#1a1a1a" }}>
                  {sidebarLinks.map((link, i) => (
                    <div key={i}>
                      <button
                        onClick={() => handleSidebarLinkClick(link.label)}
                        className="w-full text-left py-3 group"
                      >
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-gray-400 group-hover:text-[#2E6BFF] transition-colors">
                            {link.icon}
                          </span>
                          <span className="text-white text-xs font-semibold group-hover:text-[#2E6BFF] transition-colors">
                            {link.label}
                          </span>
                        </div>
                      </button>
                      {i < sidebarLinks.length - 1 && (
                        <div className="h-px bg-white/5" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Card - Portfolio Style */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={
                  hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: 0.3, ease: smoothEase }}
                className="rounded-2xl px-5 py-6 border border-white/8 flex flex-col items-center text-center gap-3"
                style={{ background: "#1a1a1a" }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={hasAnimated ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.4, delay: 0.4, ease: smoothEase }}
                  className="w-12 h-12 rounded-full bg-[#2E6BFF]/15 flex items-center justify-center"
                >
                  <div className="relative">
                    <Mail className="w-5 h-5 text-[#2E6BFF]" />
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={hasAnimated ? { scale: 1 } : { scale: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 }}
                      className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-[#1a1a1a]"
                    />
                  </div>
                </motion.div>
                <p className="text-gray-400 text-xs leading-relaxed">
                  We are always available to discuss with you
                </p>
                <p className="text-white text-xs font-medium">
                  info@domain.com
                </p>
                <button
                  onClick={handleContactClick}
                  className="flex items-center gap-2 bg-[#2E6BFF] hover:bg-[#1e5fcc] transition-colors text-white text-xs font-semibold px-5 py-2.5 rounded-full"
                >
                  Contact Us <ArrowRightIcon className="w-3 h-3" />
                </button>
              </motion.div>
            </div>
          </motion.aside>

          {/* Main content */}
          <main className="flex-1 min-w-0">
            {faqSections.map((section, si) => (
              <motion.div
                key={si}
                id={section.title.toLowerCase().replace(/\s+/g, "-")}
                initial={{ opacity: 0, y: 30 }}
                animate={
                  hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{
                  duration: 0.6,
                  delay: hasAnimated ? si * 0.1 + 0.2 : 0,
                  ease: smoothEase,
                }}
                className="mb-8 sm:mb-10 scroll-mt-20"
              >
                <h2 className="text-white text-xl sm:text-2xl font-bold mb-4 sm:mb-5 pb-2 border-b border-gray-800">
                  {section.title}
                </h2>
                {section.items.map((item, ii) => (
                  <AccordionItem
                    key={ii}
                    item={item}
                    index={ii}
                    hasAnimated={hasAnimated}
                  />
                ))}
              </motion.div>
            ))}
          </main>
        </div>
      </div>

      <style>{`
        /* Animation classes */
        .opacity-0 {
          opacity: 0;
        }
        
        .opacity-100 {
          opacity: 1;
        }
        
        .translate-y-0 {
          transform: translateY(0);
        }
        
        .translate-y-4 {
          transform: translateY(1rem);
        }
      `}</style>
    </div>
  );
}
