import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { blogPosts } from "../../data/BlogPost";

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 8H13M13 8L9 4M13 8L9 12"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const smoothEase: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

function BlogCard({
  post,
  index,
  hasAnimated,
}: {
  post: any;
  index: number;
  hasAnimated: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={
        hasAnimated
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 50, scale: 0.95 }
      }
      transition={{
        duration: 0.6,
        delay: hasAnimated ? index * 0.08 + 0.3 : 0,
        ease: smoothEase,
      }}
      className={`
        bg-[#1a1a1a] rounded-[20px] overflow-hidden flex flex-col 
        transition-all duration-500 ease-out 
        ${!isMobile && "hover:-translate-y-1"}
      `}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
    >
      {/* Image */}
      <Link to={`/blogs/${post.slug}`} className="block overflow-hidden">
        <div className="w-full h-[200px] md:h-[220px] overflow-hidden bg-gray-800 relative">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-700 animate-pulse" />
          )}
          <motion.img
            src={post.image}
            alt={post.title}
            className={`w-full h-full object-cover transition-all duration-700 ease-out
              ${imageLoaded ? "opacity-100" : "opacity-0"}
            `}
            style={{
              transform: isHovered && !isMobile ? "scale(1.06)" : "scale(1)",
            }}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              console.error("Image failed to load:", post.image);
              setImageLoaded(true);
            }}
            initial={{ scale: 1.1 }}
            animate={hasAnimated ? { scale: 1 } : { scale: 1.1 }}
            transition={{
              duration: 0.7,
              delay: hasAnimated ? index * 0.08 + 0.35 : 0,
              ease: smoothEase,
            }}
          />
        </div>
      </Link>

      {/* Content */}
      <motion.div
        className="p-4 md:p-6 flex flex-col flex-1"
        initial={{ y: 20, opacity: 0 }}
        animate={hasAnimated ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
        transition={{
          duration: 0.5,
          delay: hasAnimated ? index * 0.08 + 0.45 : 0,
          ease: smoothEase,
        }}
      >
        {/* Title */}
        <Link to={`/blogs/${post.slug}`} className="no-underline">
          <h3
            className="text-[15px] md:text-[17px] font-bold leading-[1.45] mb-4 md:mb-5 transition-colors duration-300 line-clamp-2"
            style={{
              color: !isMobile && isHovered ? "#2979FF" : "#ffffff",
            }}
          >
            {post.title}
          </h3>
        </Link>

        {/* Divider */}
        <div className="h-px bg-white/10 mb-3 md:mb-4 w-full" />

        {/* Footer Row */}
        <div className="flex items-center justify-between mt-auto">
          <span className="text-gray-500 text-xs md:text-sm">{post.date}</span>
          <Link
            to={`/blogs/${post.slug}`}
            className="group inline-flex items-center gap-1 md:gap-2 text-[#2979FF] text-xs md:text-sm font-semibold no-underline transition-all duration-300 hover:gap-2 md:hover:gap-3 min-h-[44px] md:min-h-0"
          >
            Read More
            <motion.span
              className={`
                rounded-full w-6 h-6 md:w-7 md:h-7 flex items-center justify-center flex-shrink-0 
                transition-all duration-300
                ${!isMobile && isHovered ? "bg-[#2979FF] rotate-0" : "bg-white -rotate-45"}
              `}
              whileHover={!isMobile ? { scale: 1.1 } : {}}
              whileTap={!isMobile ? { scale: 0.95 } : {}}
            >
              <ArrowIcon
                className={`w-3 h-3 md:w-4 md:h-4 transition-colors duration-300 ${
                  !isMobile && isHovered ? "text-white" : "text-[#2979FF]"
                }`}
              />
            </motion.span>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function BlogsPage() {
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

  // Custom breadcrumb items for blogs page
  const breadcrumbItems = [
    { label: "Home", path: "/", isLast: false },
    { label: "Blogs", path: "/blogs", isLast: true },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#111111] min-h-screen font-['Montserrat'] overflow-x-hidden py-12 sm:py-16 lg:py-20"
    >
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        {/* Header Section with animated text like TeamSection */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="mb-8 sm:mb-10 lg:mb-12"
        >
          <div className="bg-[#1a1b1f] rounded-2xl p-7 md:p-[28px_36px_24px_36px] w-full box-border">
            {/* Main Heading with letter-by-letter animation */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
              <span className="text-white block sm:inline">
                {renderAnimatedText("Latest ", 0.2)}
              </span>
              <span className="text-[#2A7DFF] block sm:inline">
                {renderAnimatedText("blog", 0.2 + "Latest ".length * 0.01)}
              </span>
            </h2>

            {/* Breadcrumb with staggered animation */}
            <div className="flex items-center gap-2 mt-3 text-sm text-gray-400">
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
                  <Link
                    to={item.path}
                    className={`hover:text-white transition-colors cursor-pointer transition-all duration-200 ${
                      isLoaded
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}
                    style={{ transitionDelay: `${0.4 + index * 0.05}s` }}
                  >
                    {item.label}
                  </Link>
                </React.Fragment>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Blogs Grid with staggered animations like TeamSection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {blogPosts.map((post, index) => (
            <BlogCard
              key={post.id}
              post={post}
              index={index}
              hasAnimated={hasAnimated}
            />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          
          /* Improve touch targets */
          a, button {
            cursor: pointer;
            -webkit-tap-highlight-color: transparent;
          }
          
          /* Disable hover effects on mobile */
          .hover\\:-translate-y-1:hover {
            transform: none !important;
          }
        }
        
        /* Performance optimization for animations */
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
    </section>
  );
}
