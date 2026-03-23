import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  useInView,
  AnimatePresence,
  type Transition,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import {
  portfolioItems,
  categories,
  type PortfolioItem,
} from "../../data/Portfoliodata";

const smoothEase: [number, number, number, number] = [0.25, 0.1, 0.25, 1];
const springTransition: Transition = {
  type: "spring",
  stiffness: 200,
  damping: 20,
  mass: 1,
};

const PortfolioCard: React.FC<{
  item: PortfolioItem;
  index: number;
  hasAnimated: boolean;
}> = ({ item, index, hasAnimated }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const goToSingle = () => navigate(`/portfolio/${item.slug}`);

  return (
    <motion.div
      layout
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
      whileHover={{ y: -8, transition: { duration: 0.3, ease: smoothEase } }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={goToSingle}
      className="group relative bg-[#161616] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer"
      style={{ border: "1px solid rgba(255,255,255,0.05)" }}
    >
      <motion.div
        className="relative overflow-hidden m-3 sm:m-4 rounded-xl sm:rounded-2xl"
        style={{ aspectRatio: "16/10" }}
        animate={isHovered ? { scale: 1.02 } : { scale: 1 }}
        transition={{ duration: 0.4, ease: smoothEase }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        <motion.img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={
            hasAnimated ? { scale: isHovered ? 1.1 : 1 } : { scale: 1.1 }
          }
          transition={{
            duration: 0.7,
            delay: hasAnimated ? index * 0.08 + 0.35 : 0,
            ease: smoothEase,
          }}
        />
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : -10 }}
          transition={{ duration: 0.3, ease: smoothEase }}
          className="absolute top-3 sm:top-4 left-3 sm:left-4 z-20 px-2 sm:px-3 py-1 sm:py-1.5 bg-white/10 backdrop-blur-md text-white text-xs font-medium rounded-full border border-white/20"
        >
          {item.category}
        </motion.span>
      </motion.div>

      <motion.div
        className="px-4 sm:px-5 lg:px-6 pb-4 sm:pb-5 lg:pb-6 pt-1 sm:pt-2"
        initial={{ y: 20, opacity: 0, x: 0 }}
        animate={
          hasAnimated
            ? {
                y: 0,
                opacity: 1,
                x: isHovered ? 5 : 0,
              }
            : { y: 20, opacity: 0, x: 0 }
        }
        transition={{
          duration: 0.5,
          delay: hasAnimated ? index * 0.08 + 0.45 : 0,
          ease: smoothEase,
        }}
      >
        <motion.h3
          className="text-white text-base sm:text-lg lg:text-xl font-semibold mb-1 sm:mb-2 font-['Montserrat']"
          animate={isHovered ? { color: "#2E6BFF" } : { color: "#FFFFFF" }}
          transition={{ duration: 0.3 }}
        >
          {item.title}
        </motion.h3>
        <div className="flex items-end justify-between gap-2">
          <motion.p
            className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-[65%] sm:max-w-[70%] font-['Montserrat']"
            animate={isHovered ? { color: "#E5E7EB" } : { color: "#9CA3AF" }}
            transition={{ duration: 0.3 }}
          >
            {item.description}
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 45 }}
            whileTap={{ scale: 0.95 }}
            transition={springTransition}
            onClick={(e) => {
              e.stopPropagation();
              goToSingle();
            }}
            className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-[#2E6BFF] rounded-full flex items-center justify-center shadow-lg shadow-blue-900/40"
          >
            <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </motion.button>
        </div>
      </motion.div>

      <motion.div
        className="absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#2E6BFF]/10 via-transparent to-purple-500/10" />
      </motion.div>
    </motion.div>
  );
};

const PortfolioArchivePage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All Projects");
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

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

  const filtered =
    activeCategory === "All Projects"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeCategory);

  // Dynamic breadcrumb items
  const breadcrumbItems = [
    { label: "Home", path: "/", isLast: false },
    { label: "Portfolio", path: "/portfolio", isLast: true },
  ];

  return (
    <section
      ref={sectionRef}
      className="w-full min-h-screen bg-[#111111] font-sans relative overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#2E6BFF]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-10 sm:py-14 lg:py-20 relative z-10">
        {/* Header with Breadcrumb Design like Blog Page */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="mb-10 sm:mb-12 lg:mb-16"
        >
          <div className="bg-[#1e1e1e] rounded-[20px] p-6 sm:p-8 md:p-10 w-full">
            <div className="space-y-4 sm:space-y-6">
              {/* Main Heading with letter-by-letter animation */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight font-['Montserrat']">
                <span className="text-white block sm:inline">
                  {renderAnimatedText("Our Design ", 0.2)}
                </span>
                <span className="text-[#2E6BFF] block sm:inline">
                  {renderAnimatedText(
                    "Masterpieces",
                    0.2 + "Our Design ".length * 0.01,
                  )}
                </span>
              </h1>

              {/* Dynamic Breadcrumb */}
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
                    {item.isLast ? (
                      <span
                        className={`transition-all duration-200 ${
                          isLoaded
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-4"
                        }`}
                        style={{ transitionDelay: `${0.4 + index * 0.05}s` }}
                      >
                        {item.label}
                      </span>
                    ) : (
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
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Category Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25, ease: smoothEase }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-0 mb-10 sm:mb-12"
        >
          {categories.map((cat, i) => (
            <React.Fragment key={cat}>
              <button
                onClick={() => setActiveCategory(cat)}
                className={`relative px-3 sm:px-5 py-1.5 text-sm font-medium font-['Montserrat'] transition-colors duration-200 ${
                  activeCategory === cat
                    ? "text-[#2E6BFF]"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {activeCategory === cat && (
                  <motion.span
                    layoutId="activeTab"
                    className="absolute inset-0 bg-[#2E6BFF]/10 rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
              {i < categories.length - 1 && (
                <span className="hidden sm:inline text-gray-700 mx-1 select-none">
                  /
                </span>
              )}
            </React.Fragment>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 xl:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item, index) => (
              <PortfolioCard
                key={item.id}
                item={item}
                index={index}
                hasAnimated={hasAnimated}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-500 py-24 font-['Montserrat']"
          >
            No projects found in this category.
          </motion.div>
        )}

        {/* Bottom divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={hasAnimated ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.6, ease: smoothEase }}
          className="mt-16 sm:mt-20 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent origin-left"
        />
      </div>

      <style>{`
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
    </section>
  );
};

export default PortfolioArchivePage;
