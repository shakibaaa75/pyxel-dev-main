import React, { useState, useRef, useEffect } from "react";
import { motion, useInView, type Transition } from "framer-motion";
import { Star, Sparkles } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  content: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Arlene McCoy",
    role: "Co Founder",
    image: "https://i.pravatar.cc/150?u=arlene1",
    content:
      "Perfect for quick prototyping! The designs are professional and work seamlessly with my workflow. This kit exceeded my expectations!",
  },
  {
    id: 2,
    name: "Esther Howard",
    role: "Director",
    image: "https://i.pravatar.cc/150?u=esther",
    content:
      "Perfect for quick prototyping! The designs are professional and work seamlessly with my workflow. This kit exceeded my expectations!",
  },
  {
    id: 3,
    name: "Arlene McCoy",
    role: "CEO",
    image: "https://i.pravatar.cc/150?u=arlene2",
    content:
      "Perfect for quick prototyping! The designs are professional and work seamlessly with my workflow. This kit exceeded my expectations!",
  },
  {
    id: 4,
    name: "John Doe",
    role: "Product Manager",
    image: "https://i.pravatar.cc/150?u=john4",
    content:
      "Outstanding quality and attention to detail. The team really understood our needs and delivered beyond expectations.",
  },
  {
    id: 5,
    name: "Sarah Johnson",
    role: "Marketing Lead",
    image: "https://i.pravatar.cc/150?u=sarah5",
    content:
      "Incredible service! The designs are modern and user-friendly. Our conversion rates have improved significantly.",
  },
  {
    id: 6,
    name: "Michael Chen",
    role: "CTO",
    image: "https://i.pravatar.cc/150?u=michael6",
    content:
      "Highly recommended! The development process was smooth and the final product exceeded our expectations.",
  },
  {
    id: 7,
    name: "Emily Rodriguez",
    role: "UX Designer",
    image: "https://i.pravatar.cc/150?u=emily7",
    content:
      "Amazing work! The attention to detail and creative solutions really set them apart from others.",
  },
];

const smoothEase: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const springTransition: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 15,
  mass: 1,
};

const TestimonialSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      setIsLoaded(true);
    }
  }, [isInView, hasAnimated]);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollPosition = scrollContainerRef.current.scrollLeft;
      let itemsPerView = 1;
      if (window.innerWidth >= 1024) {
        itemsPerView = 3;
      } else if (window.innerWidth >= 640) {
        itemsPerView = 2;
      } else {
        itemsPerView = 1;
      }
      const cardWidth = scrollContainerRef.current.clientWidth / itemsPerView;
      const newIndex = Math.round(scrollPosition / cardWidth);
      setActiveIndex(
        Math.min(
          Math.max(newIndex, 0),
          Math.ceil(testimonials.length / itemsPerView) - 1,
        ),
      );
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      window.addEventListener("resize", handleScroll);
      return () => {
        container.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleScroll);
      };
    }
  }, []);

  const getItemsPerView = () => {
    if (typeof window === "undefined") return 1;
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 640) return 2;
    return 1;
  };

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

  return (
    <section
      ref={sectionRef}
      className="w-full h-auto bg-[#161616] flex items-center justify-center py-8 sm:py-12 md:py-16 lg:py-20 font-sans relative overflow-hidden"
    >
      <div className="bg-[#1c1c1c] bg-[url('./images/our-testimonial-bg.png')] bg-cover bg-center bg-no-repeat pt-6 sm:pt-8 md:pt-10 rounded-2xl sm:rounded-3xl w-full mx-2 sm:mx-4 md:mx-6 lg:mx-8">
        <div className="max-w-[1400px] mx-auto w-full px-3 sm:px-6 md:px-8 lg:px-12 xl:px-16 relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-6 sm:mb-8 md:mb-10 lg:mb-12 xl:mb-16 gap-4 sm:gap-6 lg:gap-8">
            <div className="space-y-2 sm:space-y-3 lg:space-y-4 w-full lg:w-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.6, delay: 0.1, ease: smoothEase }}
                className="font-['Montserrat'] font-semibold text-white flex items-center gap-2"
                style={{
                  fontSize: "14px",
                  lineHeight: "19.2px",
                  letterSpacing: "0%",
                }}
              >
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-[#2E6BFF]" />
                <span className="text-white text-sm sm:text-base">
                  Testimonials
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{ duration: 0.8, delay: 0.2, ease: smoothEase }}
                className="font-['Montserrat'] font-semibold"
                style={{
                  fontSize: "clamp(24px, 6vw, 45px)",
                  lineHeight: "1.2",
                  letterSpacing: "0%",
                }}
              >
                <span className="text-white block sm:inline">
                  Hear From Our{" "}
                </span>
                <span className="text-[#2E6BFF] block sm:inline">
                  Happy Clients
                </span>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-gray-400 text-sm sm:text-base max-w-2xl font-['Montserrat']"
              >
                {renderAnimatedText(
                  "What our clients say about our work and collaboration",
                  0.4,
                )}
              </motion.p>
            </div>
          </div>

          {/* Horizontal Scroll Container */}
          <div className="relative">
            <div
              ref={scrollContainerRef}
              className="flex overflow-x-auto scroll-smooth gap-3 sm:gap-4 md:gap-5 lg:gap-6 pb-6 sm:pb-8 md:pb-10 hide-scrollbar"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {testimonials.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="flex-shrink-0 w-full sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-16px)]"
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  animate={
                    hasAnimated
                      ? { opacity: 1, y: 0, scale: 1 }
                      : { opacity: 0, y: 50, scale: 0.95 }
                  }
                  transition={{
                    duration: 0.8,
                    delay: hasAnimated ? index * 0.08 + 0.2 : 0,
                    ease: smoothEase,
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={springTransition}
                    className="bg-[#1a1a1a] p-5 sm:p-6 md:p-7 lg:p-8 rounded-2xl sm:rounded-[28px] md:rounded-[32px] border border-white/5 flex flex-col h-full hover:border-[#2E6BFF]/30 transition-all duration-300"
                  >
                    {/* Stars */}
                    <div className="flex gap-1 mb-4 sm:mb-5 md:mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          fill="#facc15"
                          className="text-yellow-400 w-4 h-4 sm:w-[18px] sm:h-[18px]"
                        />
                      ))}
                    </div>

                    {/* Content */}
                    <p className="text-gray-400 leading-relaxed mb-6 sm:mb-7 md:mb-8 flex-grow text-sm sm:text-base">
                      {item.content}
                    </p>

                    {/* Divider */}
                    <div className="h-px bg-white/10 w-full mb-5 sm:mb-6" />

                    {/* Profile */}
                    <div className="flex items-center gap-3 sm:gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full object-cover ring-2 ring-[#2E6BFF]/20"
                      />
                      <div>
                        <h4 className="text-white font-semibold text-sm sm:text-base">
                          {item.name}
                        </h4>
                        <p className="text-gray-500 text-xs sm:text-sm">
                          {item.role}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Pagination Dots - Original Design */}
            <div className="flex justify-center gap-2 mt-6 sm:mt-8">
              {Array.from({
                length: Math.ceil(testimonials.length / getItemsPerView()),
              }).map((_, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => {
                    if (scrollContainerRef.current) {
                      let itemsPerView = 1;
                      if (window.innerWidth >= 1024) {
                        itemsPerView = 3;
                      } else if (window.innerWidth >= 640) {
                        itemsPerView = 2;
                      }
                      const cardWidth =
                        scrollContainerRef.current.clientWidth / itemsPerView;
                      scrollContainerRef.current.scrollTo({
                        left: cardWidth * idx * itemsPerView,
                        behavior: "smooth",
                      });
                    }
                  }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className="transition-all duration-300"
                >
                  <div
                    className={`${
                      activeIndex === idx
                        ? "w-2.5 h-2.5 rounded-full bg-[#2E6BFF] border-2 border-blue-900 ring-2 ring-[#2E6BFF]/20"
                        : "w-2 h-2 rounded-full bg-gray-700 mt-0.5"
                    }`}
                  />
                </motion.button>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={
              isLoaded ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }
            }
            transition={{ duration: 1, delay: 0.8, ease: smoothEase }}
            className="mt-10 sm:mt-12 md:mt-16 lg:mt-20 xl:mt-24 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent origin-left"
          />
        </div>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default TestimonialSection;
