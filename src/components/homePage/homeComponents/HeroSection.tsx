import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Button, { ArrowRightIcon } from "../../button";

interface HeroSectionProps {
  title?: string;
  highlightedWord?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  onButtonClick?: () => void;
  backgroundImage?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title = "Smart",
  highlightedWord = "Solutions",
  description = "We design and develop websites, apps, and digital platforms that help brands grow.",
  buttonText = "Get In Touch",
  buttonLink,
  onButtonClick,
  backgroundImage = "/images/HerosecBg.png",
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  // FIX: Disable parallax on mobile. CSS transform on any ancestor element creates
  // a new stacking context which breaks position:sticky on the header above.
  // On mobile (<1024px) we skip the y/opacity motion values entirely.
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollY } = useScroll();

  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
  const overlayY = useTransform(scrollY, [0, 500], [0, 100]);
  const contentY = useTransform(scrollY, [0, 500], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300, 600], [1, 0.8, 0.4]);

  useEffect(() => {
    setIsLoaded(true);
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

  return (
    <section className="relative w-full h-[55vh] md:h-[70vh] lg:h-[75vh] min-h-[500px] bg-gray-900 overflow-hidden flex items-center">
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: isMobile ? 0 : backgroundY }}
      >
        <img
          src={backgroundImage}
          alt="Professional woman working late"
          className="w-full h-full object-cover object-center transition-all duration-500 ease-out"
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? "scale(1)" : "scale(1.1)",
          }}
          onLoad={() => setIsLoaded(true)}
        />
      </motion.div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 z-[1]"
        style={{ y: isMobile ? 0 : overlayY }}
      >
        <img
          src="/images/Bgoverlay.png"
          alt=""
          className="w-full h-auto object-cover object-bottom"
        />
      </motion.div>

      <motion.div
        className="relative z-10 w-full"
        style={{
          y: isMobile ? 0 : contentY,
          opacity: isMobile ? 1 : opacity,
        }}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-3xl space-y-4 sm:space-y-5 md:space-y-6">
            <h1 className="font-['Montserrat'] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight tracking-tight">
              <span className="inline-block mr-2">
                {renderAnimatedText(title + " ", 0)}
              </span>
              <span className="relative inline-block px-3 sm:px-4 py-0.5 sm:py-1 text-white">
                <span
                  className="absolute inset-0 -inset-x-1 sm:-inset-x-1.5 -inset-y-0.5 -z-10 transition-all duration-300 ease-out"
                  style={{
                    background: "#0944A0",
                    borderRadius: "26px",
                    transform: isLoaded
                      ? "rotate(-2deg) scale(1)"
                      : "rotate(-2deg) scale(0.7)",
                    opacity: isLoaded ? 1 : 0,
                    transitionDelay: "0.15s",
                  }}
                />
                {renderAnimatedText(highlightedWord, 0.08)}
              </span>
              <span className="block mt-1 sm:mt-2">
                {renderAnimatedText("Modern Businesses", 0.16)}
              </span>
            </h1>

            <p
              className={`font-['Rethink_Sans'] text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-xl leading-relaxed transition-all duration-400 ease-out ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "0.3s" }}
            >
              {description}
            </p>

            <div
              className={`pt-3 sm:pt-4 transition-all duration-400 ease-out ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "0.4s" }}
            >
              {buttonLink ? (
                <Button size="default" variant="primary" href={buttonLink}>
                  {buttonText}
                  <ArrowRightIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              ) : (
                <Button
                  size="default"
                  variant="primary"
                  onClick={onButtonClick}
                >
                  {buttonText}
                  <ArrowRightIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
