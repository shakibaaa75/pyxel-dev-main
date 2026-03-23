import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import Button, { ArrowRightIcon } from "../button";

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
        question: "What is your pricing structure?",
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
          "We deliver designs in a variety of formats depending on your needs, including vector files like AI, EPS, PDF, and web-friendly formats like PNG, JPEG, and SVG. For animations or videos, formats like MP4 or GIF are also provided.",
      },
      {
        question: "Are your designs responsive and mobile-friendly?",
        answer:
          "Yes, we use agile methodologies and project management tools like Asana and Notion to track progress, set milestones, and communicate with clients throughout the project lifecycle.",
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
  "General information FAQs",
  "Technical and design FAQs",
  "Project management FAQs",
  "Client support FAQs",
];

const smoothEase: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

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
        open ? "border-gray-600 bg-[#1a1a1a]" : "border-gray-700 bg-[#161616]"
      }`}
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between px-5 py-4">
        <span className="text-white font-semibold text-[15px] leading-snug">
          {item.question}
        </span>
        <motion.span
          animate={{ rotate: open ? 0 : 0 }}
          className={`ml-4 flex-shrink-0 text-blue-500 text-xl font-light transition-transform duration-300`}
        >
          {open ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect
                x="3"
                y="9.5"
                width="14"
                height="1.5"
                rx="0.75"
                fill="#3B82F6"
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
                fill="#3B82F6"
              />
              <rect
                x="9.25"
                y="3"
                width="1.5"
                height="14"
                rx="0.75"
                fill="#3B82F6"
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
        <div className="px-5 pb-5">
          <p className="text-gray-400 text-sm leading-relaxed">{item.answer}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function FAQPage() {
  const navigate = useNavigate();
  const [headerHeight, setHeaderHeight] = useState(0);
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      setIsLoaded(true);
    }
  }, [isInView, hasAnimated]);

  useEffect(() => {
    const calculateHeaderHeight = () => {
      const header =
        document.querySelector("header") ||
        document.querySelector(".header") ||
        document.querySelector("nav");
      if (header) {
        setHeaderHeight(header.clientHeight);
      } else {
        setHeaderHeight(96);
      }
    };

    calculateHeaderHeight();
    window.addEventListener("resize", calculateHeaderHeight);

    return () => window.removeEventListener("resize", calculateHeaderHeight);
  }, []);

  const renderAnimatedText = (text: string, baseDelay = 0) => {
    return text.split("").map((letter, index) => {
      const delay = baseDelay + index * 0.01;
      return (
        <span
          key={index}
          className={`inline-block transition-all duration-200 ease-out ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: `${delay}s` }}
        >
          {letter === " " ? "\u00A0" : letter}
        </span>
      );
    });
  };

  const breadcrumbItems = [
    { label: "Home", path: "/", isLast: false },
    { label: "FAQs", path: "/faqs", isLast: true },
  ];

  const handleContactClick = () => {
    navigate("/contact");
  };

  return (
    <div
      ref={sectionRef}
      className="min-h-screen bg-[#111111] font-['Montserrat']"
    >
      {/* Hero Header - with animations */}
      <div className="pt-24 pb-0 px-4 sm:px-8 lg:px-16">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: smoothEase }}
            className="bg-[#1e1e1e] rounded-[20px] p-8 sm:p-10 mb-8"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              <span className="text-white block sm:inline">
                {renderAnimatedText("Frequently Asked ", 0.2)}
              </span>
              <span className="text-[#2979FF] block sm:inline">
                {renderAnimatedText(
                  "Questions",
                  0.2 + "Frequently Asked ".length * 0.01,
                )}
              </span>
            </h1>
            {/* Dynamic Breadcrumb with animation */}
            <div className="mt-2">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                {breadcrumbItems.map((item, index) => (
                  <React.Fragment key={item.label}>
                    {index > 0 && (
                      <span
                        className={`transition-all duration-200 ${
                          isLoaded
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-4"
                        }`}
                        style={{ transitionDelay: `${0.4 + index * 0.05}s` }}
                      >
                        /
                      </span>
                    )}
                    <span
                      className={`hover:text-white transition-colors cursor-pointer transition-all duration-200 ${
                        isLoaded
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-4"
                      }`}
                      style={{ transitionDelay: `${0.4 + index * 0.05}s` }}
                    >
                      {item.label}
                    </span>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16 pb-20">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar - with animation */}
          <motion.aside
            initial={{ opacity: 0, x: -30 }}
            animate={
              hasAnimated ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }
            }
            transition={{
              duration: 0.6,
              delay: 0.2,
              ease: smoothEase,
            }}
            className="w-full md:w-72 flex-shrink-0 md:sticky md:self-start"
            style={{
              top: `${headerHeight + 20}px`,
              maxHeight: `calc(100vh - ${headerHeight + 40}px)`,
              overflowY: "auto",
              scrollbarWidth: "thin",
              paddingRight: "10px",
            }}
          >
            <div className="space-y-6">
              {/* Nav links */}
              <div className="bg-[#1a1a1a] rounded-2xl overflow-hidden border border-gray-800">
                <div className="p-4 border-b border-gray-800 bg-[#1e1e1e]">
                  <h3 className="text-white font-semibold text-sm">
                    Categories
                  </h3>
                </div>
                {sidebarLinks.map((link, i) => (
                  <motion.a
                    key={i}
                    href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={
                      hasAnimated
                        ? { opacity: 1, x: 0 }
                        : { opacity: 0, x: -20 }
                    }
                    transition={{
                      duration: 0.4,
                      delay: hasAnimated ? 0.3 + i * 0.05 : 0,
                      ease: smoothEase,
                    }}
                    className="flex items-center justify-between px-5 py-3.5 border-b border-gray-800 last:border-b-0 cursor-pointer group hover:bg-[#1f1f1f] transition-colors"
                  >
                    <span className="text-gray-400 text-sm group-hover:text-white transition-colors">
                      {link}
                    </span>
                    <svg
                      className="text-[#2979FF] opacity-0 group-hover:opacity-100 transition-opacity"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M3 8h10M9 4l4 4-4 4"
                        stroke="#2979FF"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.a>
                ))}
              </div>

              {/* Contact card with animation */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={
                  hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{
                  duration: 0.6,
                  delay: 0.4,
                  ease: smoothEase,
                }}
                className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-6 flex flex-col items-center text-center"
              >
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={
                    hasAnimated
                      ? { scale: 1, opacity: 1 }
                      : { scale: 0, opacity: 0 }
                  }
                  transition={{
                    duration: 0.5,
                    delay: 0.5,
                    ease: smoothEase,
                  }}
                  className="mb-4"
                >
                  <div className="w-14 h-14 bg-[#2979FF] rounded-xl flex items-center justify-center relative">
                    <svg width="28" height="22" viewBox="0 0 28 22" fill="none">
                      <rect
                        x="2"
                        y="2"
                        width="24"
                        height="18"
                        rx="3"
                        fill="white"
                        fillOpacity="0.2"
                      />
                      <path
                        d="M4 4l10 8 10-8"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={hasAnimated ? { scale: 1 } : { scale: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: 0.7,
                        ease: smoothEase,
                      }}
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center border-2 border-[#1a1a1a]"
                    >
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path
                          d="M1 4l3 3 5-6"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.div>
                  </div>
                </motion.div>
                <p className="text-gray-400 text-xs mb-2 leading-snug">
                  We always available to discuss with you
                </p>
                <p className="text-gray-300 text-sm font-medium mb-5">
                  info@domain.com
                </p>

                <Button
                  size="small"
                  variant="primary"
                  onClick={handleContactClick}
                  className="w-full justify-center cursor-pointer"
                >
                  Contact Us
                  <ArrowRightIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </motion.div>
            </div>
          </motion.aside>

          {/* Main content */}
          <main className="flex-1">
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
                className="mb-10 scroll-mt-24"
              >
                <h2 className="text-white text-2xl font-bold mb-5 pb-2 border-b border-gray-800">
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
        @media (min-width: 768px) {
          aside::-webkit-scrollbar {
            width: 4px;
          }

          aside::-webkit-scrollbar-track {
            background: #2a2a2a;
            border-radius: 10px;
          }

          aside::-webkit-scrollbar-thumb {
            background: #2979ff;
            border-radius: 10px;
          }
        }
        
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
        
        .translate-y-8 {
          transform: translateY(2rem);
        }
      `}</style>
    </div>
  );
}
