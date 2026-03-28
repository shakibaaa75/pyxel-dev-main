import { useState, useRef, useEffect } from "react";
import { motion, useInView, type Transition } from "framer-motion";
import { Plus, Minus, Sparkles } from "lucide-react";
import Button, { ArrowRightIcon } from "../../button";

interface MethodologyStep {
  id: number;
  title: string;
  description: string;
}

const methodologyData: MethodologyStep[] = [
  {
    id: 1,
    title: "Discovery & Strategy",
    description:
      "We begin by getting to know you and your brand. Through in-depth conversations, research, and analysis.",
  },
  {
    id: 2,
    title: "Concept Development",
    description:
      "We brainstorm and develop creative concepts that align with your vision and business objectives.",
  },
  {
    id: 3,
    title: "Design & Iteration",
    description:
      "We create detailed designs and iterate based on your feedback until everything is perfect.",
  },
  {
    id: 4,
    title: "Development & Execution",
    description:
      "We bring designs to life with clean code and ensure everything works flawlessly across all devices.",
  },
];

const smoothEase: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const springTransition: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 15,
  mass: 1,
};

export default function MethodologyComponent() {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      setIsLoaded(true);
    }
  }, [isInView, hasAnimated]);

  const toggleStep = (id: number) => {
    setActiveStep(id);
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
    <div
      className="h-auto bg-[#161616] text-white py-12 sm:py-16 lg:py-20"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');
      `}</style>

      <div
        ref={sectionRef}
        className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 sm:mb-10 lg:mb-12 xl:mb-16 gap-4 sm:gap-6">
          <div className="space-y-2 sm:space-y-3 lg:space-y-4 w-full lg:w-auto">
            <motion.div
              className="flex items-center gap-2 text-[#2A7DFF]"
              initial={{ opacity: 0, y: 20 }}
              animate={
                hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.6, delay: 0.1, ease: smoothEase }}
            >
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="font-['Rethink_Sans'] text-xs sm:text-sm font-medium tracking-wide uppercase">
                Creative Toolkit
              </span>
            </motion.div>

            <h1 className="font-['Montserrat'] text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-white leading-tight">
              <span className="text-white block sm:inline">
                {renderAnimatedText("Our Methodology ", 0.2)}
              </span>
              <span className="text-[#2A7DFF] block sm:inline">
                {renderAnimatedText(
                  "For Success",
                  0.2 + "Our Methodology ".length * 0.01,
                )}
              </span>
            </h1>
          </div>

          <motion.div
            className="self-start lg:self-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3, ease: smoothEase }}
          >
            <Button
              size="default"
              variant="primary"
              onClick={() => console.log("Contact clicked")}
            >
              Contact Us
              <ArrowRightIcon className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
            </Button>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
          <motion.div
            className="relative w-full max-w-[400px] sm:max-w-[500px] lg:max-w-[562px] mx-auto"
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={
              hasAnimated
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: 60, scale: 0.95 }
            }
            transition={{ duration: 0.8, delay: 0.3, ease: smoothEase }}
          >
            <div className="relative w-full aspect-square">
              <motion.div
                className="absolute inset-0"
                whileHover={{ scale: 1.02 }}
                transition={springTransition}
              >
                <img
                  src="/images/how-work-image-circle.png.png"
                  alt="Methodology Circle"
                  className="w-full h-full object-contain"
                />
              </motion.div>

              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[67.6%] h-[67.6%] rounded-full overflow-hidden shadow-2xl"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={
                  hasAnimated
                    ? { scale: 1, opacity: 1 }
                    : { scale: 0.8, opacity: 0 }
                }
                transition={{ duration: 0.6, delay: 0.5, ease: smoothEase }}
              >
                <img
                  src="/images/HerosecBg.png"
                  alt="Center Content"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </motion.div>

          <div className="space-y-3 sm:space-y-4 w-full">
            {methodologyData.map((step, index) => {
              const isActive = activeStep === step.id;

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  animate={
                    hasAnimated
                      ? { opacity: 1, y: 0, scale: 1 }
                      : { opacity: 0, y: 50, scale: 0.95 }
                  }
                  transition={{
                    duration: 0.8,
                    delay: hasAnimated ? index * 0.12 + 0.4 : 0,
                    ease: smoothEase,
                  }}
                  className={`border-b border-gray-800 pb-3 sm:pb-4 transition-all duration-300 ${
                    isActive ? "border-blue-500/30" : ""
                  }`}
                >
                  <motion.button
                    onClick={() => toggleStep(step.id)}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    transition={springTransition}
                    className="w-full flex items-center justify-between py-3 sm:py-4 group"
                  >
                    <h3
                      className={`text-sm sm:text-base md:text-lg lg:text-xl font-semibold transition-colors duration-300 text-left pr-2 ${
                        isActive
                          ? "text-white"
                          : "text-gray-300 group-hover:text-white"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <motion.div
                      animate={{ rotate: isActive ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className={`w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0 ml-4 ${
                        isActive
                          ? "bg-blue-500"
                          : "bg-gray-800 group-hover:bg-gray-700"
                      }`}
                    >
                      {isActive ? (
                        <Minus className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-white" />
                      ) : (
                        <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-gray-400 group-hover:text-white" />
                      )}
                    </motion.div>
                  </motion.button>

                  <motion.div
                    initial={false}
                    animate={{
                      height: isActive ? "auto" : 0,
                      opacity: isActive ? 1 : 0,
                    }}
                    transition={{ duration: 0.4, ease: smoothEase }}
                    className="overflow-hidden"
                  >
                    <motion.p
                      initial={{ y: 10, opacity: 0 }}
                      animate={
                        isActive ? { y: 0, opacity: 1 } : { y: 10, opacity: 0 }
                      }
                      transition={{ duration: 0.3, delay: isActive ? 0.1 : 0 }}
                      className="text-gray-400 text-xs sm:text-sm md:text-base leading-relaxed pb-3 sm:pb-4"
                    >
                      {step.description}
                    </motion.p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
