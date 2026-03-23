import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import {
  motion,
  useInView,
  AnimatePresence,
  type Transition,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  portfolioItems,
  categories,
  type PortfolioItem,
} from "../../data/Portfoliodata";
import Breadcrumb from "../Breadcrumb/Breadcrumb";

const smoothEase: [number, number, number, number] = [0.25, 0.1, 0.25, 1];
const springTransition: Transition = {
  type: "spring",
  stiffness: 200,
  damping: 20,
  mass: 1,
};

// Optimized card with reduced motion on mobile
const PortfolioCard: React.FC<{
  item: PortfolioItem;
  index: number;
  hasAnimated: boolean;
  isMobile: boolean;
}> = ({ item, index, hasAnimated, isMobile }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const goToSingle = () => navigate(`/portfolio/${item.slug}`);

  // Simplified animations for mobile
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isMobile ? 0.4 : 0.6,
        delay: hasAnimated ? index * (isMobile ? 0.04 : 0.08) + 0.2 : 0,
        ease: smoothEase,
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate={hasAnimated ? "visible" : "hidden"}
      whileHover={!isMobile ? { y: -8, transition: { duration: 0.3 } } : {}}
      onHoverStart={() => !isMobile && setIsHovered(true)}
      onHoverEnd={() => !isMobile && setIsHovered(false)}
      onClick={goToSingle}
      className="group relative bg-[#161616] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer will-change-transform"
      style={{ border: "1px solid rgba(255,255,255,0.05)" }}
    >
      <div
        className="relative overflow-hidden m-3 sm:m-4 rounded-xl sm:rounded-2xl"
        style={{ aspectRatio: "16/10" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
        <motion.img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover"
          initial={false}
          animate={!isMobile && isHovered ? { scale: 1.05 } : { scale: 1 }}
          transition={{ duration: 0.4, ease: smoothEase }}
          loading="lazy"
        />
        <span className="absolute top-3 sm:top-4 left-3 sm:left-4 z-20 px-2 sm:px-3 py-1 sm:py-1.5 bg-white/10 backdrop-blur-md text-white text-xs font-medium rounded-full border border-white/20">
          {item.category}
        </span>
      </div>

      <div className="px-4 sm:px-5 lg:px-6 pb-4 sm:pb-5 lg:pb-6 pt-1 sm:pt-2">
        <h3 className="text-white text-base sm:text-lg lg:text-xl font-semibold mb-1 sm:mb-2 font-['Montserrat']">
          {item.title}
        </h3>
        <div className="flex items-end justify-between gap-2">
          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-[65%] sm:max-w-[70%] font-['Montserrat']">
            {item.description}
          </p>
          <motion.button
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
      </div>
    </motion.div>
  );
};

const PortfolioArchivePage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All Projects");
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      // Small delay to ensure smooth initial render
      const timer = setTimeout(() => setHasAnimated(true), 50);
      return () => clearTimeout(timer);
    }
  }, [isInView, hasAnimated]);

  // Memoize filtered items to prevent unnecessary recalculations
  const filtered = useMemo(() => {
    return activeCategory === "All Projects"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  // Handle category change with debounce for smoother mobile experience
  const handleCategoryChange = useCallback((category: string) => {
    // Use requestAnimationFrame for smoother UI updates
    requestAnimationFrame(() => {
      setActiveCategory(category);
    });
  }, []);

  const renderAnimatedText = (text: string, baseDelay = 0) => {
    return text.split("").map((letter, index) => {
      const delay = baseDelay + index * 0.01;
      return (
        <span
          key={index}
          className={`inline-block transition-all duration-200 ease-out ${
            hasAnimated
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
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
    { label: "Portfolio", path: "/portfolio", isLast: true },
  ];

  return (
    <section
      ref={sectionRef}
      className="w-full min-h-screen bg-[#111111] font-sans relative overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#2E6BFF]/5 blur-[120px] rounded-full pointer-events-none" />

      {/* UPDATED: Changed padding from py-10 sm:py-14 lg:py-20 to pt-8 sm:pt-10 pb-12 sm:pb-16 to match BlogSinglePage */}
      <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-12 pt-8 sm:pt-10 pb-12 sm:pb-16 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="mb-6 sm:mb-8"
        >
          <div className="bg-[#1e1e1e] rounded-[20px] p-6 sm:p-8 md:p-10 w-full">
            <div className="space-y-3 sm:space-y-4">
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

              {/* UPDATED: Replaced custom breadcrumb with Breadcrumb component */}
              <div className="mt-2">
                <Breadcrumb customItems={breadcrumbItems} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Category Filter Tabs - Optimized for mobile - KEPT ORIGINAL */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-0 mb-10 sm:mb-12">
          {categories.map((cat, i) => (
            <React.Fragment key={cat}>
              <button
                onClick={() => handleCategoryChange(cat)}
                className={`relative px-3 sm:px-5 py-1.5 text-sm font-medium font-['Montserrat'] transition-colors duration-200 ${
                  activeCategory === cat
                    ? "text-[#2E6BFF]"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {activeCategory === cat && !isMobile && (
                  <motion.span
                    layoutId="activeTab"
                    className="absolute inset-0 bg-[#2E6BFF]/10 rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {activeCategory === cat && isMobile && (
                  <span className="absolute inset-0 bg-[#2E6BFF]/10 rounded-full" />
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
        </div>

        {/* Grid - KEPT ORIGINAL */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 xl:gap-8">
          <AnimatePresence mode="wait">
            {filtered.map((item, index) => (
              <PortfolioCard
                key={item.id}
                item={item}
                index={index}
                hasAnimated={hasAnimated}
                isMobile={isMobile}
              />
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="text-center text-gray-500 py-24 font-['Montserrat']">
            No projects found in this category.
          </div>
        )}

        {/* Bottom divider - KEPT ORIGINAL */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={hasAnimated ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.6, ease: smoothEase }}
          className="mt-16 sm:mt-20 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent origin-left"
        />
      </div>
    </section>
  );
};

export default PortfolioArchivePage;
