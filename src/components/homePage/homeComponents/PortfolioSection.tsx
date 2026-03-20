import React, { useState, useRef, useEffect } from "react";
import { motion, useInView, type Transition } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import Button, { ArrowRightIcon } from "../../button";

interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
}

interface PortfolioSectionProps {
  title?: string;
  highlightedWord?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  onButtonClick?: () => void;
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "Stellar Tech Solutions",
    description:
      "We redesigned Stellar Tech's website to enhance user experience and drive engagement.",
    image:
      "https://img.freepik.com/premium-photo/mobile-app-ui-design-dark-mode-black-interface-orange-accents_1222783-62120.jpg?w=800",
    category: "Mobile App",
  },
  {
    id: 2,
    title: "Green Wave Foods",
    description:
      "We built a user-friendly Shopping platform for Green Wave Foods with seamless checkout.",
    image:
      "https://cdn.dribbble.com/userupload/45840875/file/00faab2fd3f9d11acb8f902f24ec0d46.png?resize=800x",
    category: "Web Design",
  },
  {
    id: 3,
    title: "Horizon Real Estate",
    description:
      "We helped Horizon Real Estate establish a trusted brand identity across all platforms.",
    image:
      "https://mir-s3-cdn-cf.behance.net/project_modules/fs/1d5e3b174890851.64aa8bf1d92be.jpg",
    category: "Branding",
  },
];

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
  isLoaded: boolean;
}> = ({ item, index, isLoaded }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.8,
        delay: isLoaded ? index * 0.12 + 0.3 : 0,
        ease: smoothEase,
      }}
      whileHover={{ y: -8, transition: { duration: 0.3, ease: smoothEase } }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-[#161616] rounded-2xl sm:rounded-3xl overflow-hidden"
      style={{ border: "1px solid rgba(255, 255, 255, 0.05)" }}
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
          animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
          transition={{ duration: 0.7, ease: smoothEase }}
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
        animate={isHovered ? { x: 5 } : { x: 0 }}
        transition={{ duration: 0.3, ease: smoothEase }}
      >
        <motion.h3
          className="text-white text-base sm:text-lg lg:text-xl font-semibold mb-1 sm:mb-2"
          animate={isHovered ? { color: "#2E6BFF" } : { color: "#FFFFFF" }}
          transition={{ duration: 0.3 }}
        >
          {item.title}
        </motion.h3>

        <div className="flex items-end justify-between gap-2">
          <motion.p
            className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-[65%] sm:max-w-[70%]"
            animate={isHovered ? { color: "#E5E7EB" } : { color: "#9CA3AF" }}
            transition={{ duration: 0.3 }}
          >
            {item.description}
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.1, rotate: 45 }}
            whileTap={{ scale: 0.95 }}
            transition={springTransition}
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

const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  title = "Our Design",
  highlightedWord = "Masterpieces",
  subtitle = "Portfolio",
  buttonText = "Get In Touch",
  buttonLink,
  onButtonClick,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  useEffect(() => {
    if (isInView && !isLoaded) {
      setIsLoaded(true);
    }
  }, [isInView, isLoaded]);

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
      className="w-full h-auto bg-[#161616] flex items-center justify-center py-10 sm:py-12 md:py-16 lg:py-20 font-sans relative overflow-hidden"
    >
      <div className="bg-[#1C1C1C] pt-8 sm:pt-10 rounded-2xl sm:rounded-3xl ">
        <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
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
                  {subtitle}
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
                <span className="text-white block sm:inline">{title} </span>
                <span className="text-[#2E6BFF] block sm:inline">
                  {highlightedWord}
                </span>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-gray-400 text-sm sm:text-base max-w-2xl font-['Montserrat']"
              >
                {renderAnimatedText(
                  "Showcasing our finest work and creative excellence",
                  0.4,
                )}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4, ease: smoothEase }}
              className="w-full sm:w-auto"
            >
              {buttonLink ? (
                <Button
                  size="default"
                  variant="primary"
                  href={buttonLink}
                  className="w-full sm:w-auto"
                >
                  {buttonText}
                  <ArrowRightIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              ) : (
                <Button
                  size="default"
                  variant="primary"
                  onClick={onButtonClick}
                  className="w-full sm:w-auto"
                >
                  {buttonText}
                  <ArrowRightIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              )}
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-8">
            {portfolioItems.map((item, index) => (
              <PortfolioCard
                key={item.id}
                item={item}
                index={index}
                isLoaded={isLoaded}
              />
            ))}
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
    </section>
  );
};

export default PortfolioSection;
