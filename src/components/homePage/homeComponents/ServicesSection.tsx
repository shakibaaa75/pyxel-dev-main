import { useState, useRef, useEffect } from "react";
import { motion, useInView, type Transition } from "framer-motion";
import {
  ArrowUpRight,
  LayoutTemplate,
  Code,
  Settings,
  TrendingUp,
  ShoppingBag,
  Search,
  MoveRight,
} from "lucide-react";
import Button, { ArrowRightIcon } from "../../button";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
}

const services: ServiceItem[] = [
  {
    id: "dev",
    title: "Website Development",
    description:
      "We build robust, scalable websites using modern frameworks to ensure high performance.",
    icon: <Code size={24} />,
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: "design",
    title: "Website Design",
    description:
      "Creating intuitive and visually stunning user interfaces that drive engagement.",
    icon: <LayoutTemplate size={24} />,
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: "maint",
    title: "Website Maintenance",
    description:
      "Regular updates, security patches, and performance monitoring for your site.",
    icon: <Settings size={24} />,
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: "marketing",
    title: "Digital Marketing",
    description:
      "Strategic campaigns to boost your online presence and drive qualified traffic.",
    icon: <TrendingUp size={24} />,
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: "ecom",
    title: "Ecommerce",
    description:
      "End-to-end ecommerce solutions to maximize sales and improve customer experience.",
    icon: <ShoppingBag size={24} />,
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: "seo",
    title: "Search Engine Optimization",
    description:
      "Improving your visibility on search engines to attract organic growth.",
    icon: <Search size={24} />,
    image:
      "https://images.unsplash.com/photo-1572177812156-58036aae439c?auto=format&fit=crop&q=80&w=1600",
  },
];

const smoothEase: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const springTransition: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 15,
  mass: 1,
};

const buttonSpring: Transition = {
  type: "spring",
  stiffness: 200,
  damping: 15,
  delay: 0.3,
};

export default function ServiceShowcase({
  buttonText = "Get In Touch",
  buttonLink,
  onButtonClick,
}: {
  buttonText?: string;
  buttonLink?: string;
  onButtonClick?: () => void;
}) {
  const [activeService, setActiveService] = useState<ServiceItem>(services[0]);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [imageKey, setImageKey] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      setIsLoaded(true);
    }
  }, [isInView, hasAnimated]);

  const handleButtonClick = (serviceId: string) => {
    const service = services.find((s) => s.id === serviceId);
    if (service) {
      setActiveService(service);
      setImageKey((prev) => prev + 1);
    }
  };

  const MobileServiceImage = ({ service }: { service: ServiceItem }) => (
    <motion.div
      className="lg:hidden w-full mt-2 sm:mt-3 mb-1 sm:mb-2"
      initial={{ opacity: 0, height: 0 }}
      animate={{
        opacity: activeService.id === service.id ? 1 : 0,
        height: activeService.id === service.id ? "auto" : 0,
        marginBottom: activeService.id === service.id ? "0.5rem" : 0,
      }}
      transition={{ duration: 0.3, ease: smoothEase }}
    >
      {activeService.id === service.id && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-[#161616]"
          style={{ aspectRatio: "16/9" }}
        >
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
            <h4 className="text-base sm:text-lg font-semibold text-white mb-1">
              {service.title}
            </h4>
            <p className="text-xs sm:text-sm text-gray-300 line-clamp-2">
              {service.description}
            </p>
          </div>
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={buttonSpring}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#2E6BFF] flex items-center justify-center shadow-lg"
          >
            <ArrowUpRight
              className="text-white w-4 h-4 sm:w-5 sm:h-5"
              strokeWidth={2.5}
            />
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );

  return (
    <div className="h-auto bg-[#161616] flex items-center justify-center py-10 sm:py-12 md:py-16 lg:py-20 font-sans relative overflow-hidden">
      <motion.div
        className="absolute pointer-events-none z-0"
        style={{
          bottom: "clamp(1rem, 5vw, 4rem)",
          right: "clamp(-200px, -10vw, -50px)",
          width: "clamp(120px, 20vw, 300px)",
          height: "clamp(120px, 20vw, 300px)",
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <img
          src="/images/ball.png"
          alt="Decorative ball"
          className="w-full h-full object-contain opacity-20 sm:opacity-30 md:opacity-40 lg:opacity-50"
        />
      </motion.div>

      <div
        ref={sectionRef}
        className="max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10"
      >
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-6 sm:mb-8 md:mb-10 lg:mb-12 xl:mb-16 gap-4 sm:gap-6 lg:gap-8">
          <div className="space-y-2 sm:space-y-3 lg:space-y-4 w-full lg:w-auto">
            <div
              className={`font-['Montserrat'] font-semibold text-white transition-all duration-400 ease-out ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{
                fontSize: "14px",
                lineHeight: "19.2px",
                letterSpacing: "0%",
                transitionDelay: "0.1s",
              }}
            >
              Our Services
            </div>

            <div
              className={`font-['Montserrat'] font-semibold transition-all duration-400 ease-out ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{
                fontSize: "clamp(20px, 6vw, 45px)",
                lineHeight: "1.2",
                letterSpacing: "0%",
                transitionDelay: "0.2s",
              }}
            >
              <span className="text-white block sm:inline">
                Software Development{" "}
              </span>
              <span className="text-[#2E6BFF] block sm:inline">Solutions</span>
            </div>
          </div>

          <div
            className={`transition-all duration-400 ease-out w-full sm:w-auto ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "0.3s" }}
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
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-5 md:gap-6 lg:gap-8 xl:gap-12 2xl:gap-16">
          <div className="flex flex-col gap-2 sm:gap-3 lg:gap-4 w-full lg:max-w-[480px] xl:max-w-[520px] 2xl:max-w-[560px] flex-shrink-0">
            {services.map((service, index) => {
              const isActive = activeService.id === service.id;
              const arrowRotation = isActive ? 0 : -40;

              return (
                <div key={service.id} className="w-full">
                  <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    animate={
                      hasAnimated
                        ? { opacity: 1, y: 0, scale: 1 }
                        : { opacity: 0, y: 50, scale: 0.95 }
                    }
                    transition={{
                      duration: 0.8,
                      delay: hasAnimated ? index * 0.12 + 0.1 : 0,
                      ease: smoothEase,
                    }}
                    className="w-full"
                  >
                    <motion.button
                      onClick={() => handleButtonClick(service.id)}
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      transition={springTransition}
                      className={`
                        group relative w-full transition-colors duration-500 ease-out
                        ${isActive ? "bg-[#2E6BFF]" : "bg-[#1a1a1a] hover:bg-[#252525]"}
                      `}
                      style={{
                        width: "100%",
                        height: "auto",
                        minHeight: "50px",
                        border: isActive
                          ? "1px solid #4a85ff"
                          : "1px solid #FFFFFF1A",
                        borderRadius: "16px",
                        boxShadow: isActive
                          ? "0 20px 40px -15px rgba(46, 107, 255, 0.4)"
                          : "0 4px 20px -10px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      <div className="flex items-center justify-between w-full h-full px-3 sm:px-4 xl:px-5 py-2 sm:py-2.5 xl:py-4">
                        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                          <motion.div
                            whileHover={{ rotate: 5, scale: 1.1 }}
                            transition={springTransition}
                            className={`
                              p-1.5 sm:p-2 rounded-xl transition-colors duration-500 border flex-shrink-0
                              ${isActive ? "bg-white/10 border-white/20 text-white" : "bg-[#0a0a0a] border-[#2a2a2a] text-gray-400 group-hover:text-white group-hover:border-gray-600"}
                            `}
                          >
                            <div className="w-4 h-4 sm:w-5 sm:h-5 xl:w-6 xl:h-6">
                              {service.icon}
                            </div>
                          </motion.div>
                          <span
                            className={`text-sm sm:text-base xl:text-lg font-medium tracking-wide transition-colors duration-500 truncate ${isActive ? "text-white" : "text-gray-300"}`}
                          >
                            {service.title}
                          </span>
                        </div>

                        <motion.div
                          animate={{ rotate: arrowRotation }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className={`
                            w-6 h-6 sm:w-8 sm:h-8 xl:w-10 xl:h-10 rounded-full flex items-center justify-center transition-colors duration-500 flex-shrink-0 ml-2 sm:ml-3
                            ${isActive ? "bg-white text-[#2E6BFF]" : "bg-[#0f0f0f] text-gray-500 group-hover:bg-[#2a2a2a] group-hover:text-white"}
                          `}
                        >
                          <MoveRight
                            size={14}
                            strokeWidth={2.5}
                            className="sm:w-4 sm:h-4 xl:w-[18px] xl:h-[18px]"
                          />
                        </motion.div>
                      </div>
                    </motion.button>
                  </motion.div>
                  <MobileServiceImage service={service} />
                </div>
              );
            })}
          </div>

          <motion.div
            className="relative overflow-hidden bg-[#161616] w-full lg:flex-1 rounded-xl sm:rounded-2xl md:rounded-3xl xl:rounded-[2rem] hidden lg:block"
            style={{ aspectRatio: "16/12", maxHeight: "600px" }}
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={
              hasAnimated
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: 60, scale: 0.95 }
            }
            transition={{
              duration: 1,
              delay: hasAnimated ? 0.4 : 0,
              ease: smoothEase,
            }}
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-[#2E6BFF]/20 to-purple-500/20 rounded-2xl md:rounded-3xl xl:rounded-[2.5rem] blur-3xl opacity-50 -z-10" />

            <div key={imageKey} className="absolute inset-0 w-full h-full">
              <img
                src={activeService.image}
                alt={activeService.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            <motion.div
              className="absolute bottom-0 left-0 right-0 h-24 sm:h-28 md:h-32 lg:h-36 xl:h-44 2xl:h-56 bg-gradient-to-t from-black/90 via-black/60 to-transparent backdrop-blur-[2px] xl:backdrop-blur-[3px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: smoothEase }}
              key={`overlay-${activeService.id}`}
            />

            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-5 lg:p-6 xl:p-8 2xl:p-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 sm:gap-3 z-10">
              <div className="w-full sm:max-w-[70%] md:max-w-[75%] xl:max-w-[80%]">
                <motion.h3
                  key={`title-${activeService.id}`}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, ease: smoothEase }}
                  className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-semibold text-white mb-1 sm:mb-2"
                >
                  {activeService.title}
                </motion.h3>
                <motion.p
                  key={`desc-${activeService.id}`}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.1, ease: smoothEase }}
                  className="text-xs sm:text-sm md:text-base xl:text-lg text-gray-300 leading-relaxed line-clamp-2 xl:line-clamp-3"
                >
                  {activeService.description}
                </motion.p>
              </div>

              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={buttonSpring}
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                  boxShadow: "0 20px 40px -10px rgba(46, 107, 255, 0.5)",
                }}
                whileTap={{ scale: 0.9 }}
                className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 2xl:w-16 2xl:h-16 rounded-full bg-[#2E6BFF] hover:bg-[#1d5af5] flex items-center justify-center transition-colors duration-300 shadow-lg shadow-blue-900/40"
              >
                <ArrowUpRight
                  className="text-white w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8"
                  strokeWidth={2.5}
                />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
