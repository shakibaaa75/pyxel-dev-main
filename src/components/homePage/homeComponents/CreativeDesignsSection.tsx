import React, { useRef, useEffect, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

interface StatItemProps {
  number: string;
  label: string;
  delay?: number;
  hasAnimated: boolean;
  isLast?: boolean;
}

interface CreativeDesignsSectionProps {
  className?: string;
  gradientStart?: string;
  gradientEnd?: string;
}

const AnimatedCounter: React.FC<{
  target: number;
  suffix?: string;
  hasAnimated: boolean;
  delay?: number;
}> = ({ target, suffix = "", hasAnimated, delay = 0 }) => {
  const [count, setCount] = useState(0);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!hasAnimated || hasStarted.current) return;

    hasStarted.current = true;

    const timeout = setTimeout(() => {
      const controls = animate(0, target, {
        duration: 2,
        ease: [0.25, 0.1, 0.25, 1],
        onUpdate: (value) => {
          setCount(Math.round(value));
        },
      });

      return () => controls.stop();
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [hasAnimated, target, delay]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

const StatItem: React.FC<StatItemProps> = ({
  number,
  label,
  delay = 0,
  hasAnimated,
  isLast = false,
}) => {
  const numericValue = parseInt(number.replace(/\D/g, ""), 10);
  const suffix = number.replace(/[0-9]/g, "");

  return (
    <div
      className={`flex flex-col gap-1 pb-4 sm:pb-0 w-full sm:w-auto ${
        !isLast ? "border-b border-white/20 sm:border-b-0" : ""
      }`}
    >
      <span className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-extrabold text-white leading-none tracking-[-0.5px] text-left">
        <AnimatedCounter
          target={numericValue}
          suffix={suffix}
          hasAnimated={hasAnimated}
          delay={delay}
        />
      </span>
      <span className="text-xs sm:text-sm md:text-[0.95rem] text-white/85 font-medium mt-1 sm:mt-[6px] text-left">
        {label}
      </span>
    </div>
  );
};

const CreativeDesignsSection: React.FC<CreativeDesignsSectionProps> = ({
  className = "",
  gradientStart = "#0944A0",
  gradientEnd = "#2A7DFF",
}) => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  const smoothEase: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

  return (
    <div
      ref={sectionRef}
      className={`flex items-center justify-center py-2 sm:py-3 md:py-4 lg:py-5 overflow-x-hidden ${className}`}
    >
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: smoothEase }}
        className="max-w-[1400px] mx-auto w-full px-3 sm:px-6 lg:px-8 xl:px-12 relative z-10"
      >
        <div
          className="w-full rounded-2xl sm:rounded-[24px] lg:rounded-[28px] py-3 sm:py-4 md:py-5 lg:py-6 px-4 sm:px-6 lg:px-[40px] xl:px-[60px] flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 lg:gap-10 relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${gradientStart}, ${gradientEnd})`,
          }}
        >
          {/* Background decoration for visual interest */}
          <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={
              hasAnimated ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }
            }
            transition={{ duration: 0.8, delay: 0.2, ease: smoothEase }}
            className="flex-1 w-full max-w-[740px] text-left"
          >
            <h2 className="font-['Montserrat'] text-xl sm:text-2xl md:text-3xl lg:text-[2.4rem] font-bold text-white mb-2 sm:mb-2 md:mb-3 leading-tight lg:leading-[1.15] tracking-[-0.3px] text-left">
              Creative Designs That Drive Results
            </h2>
            <p className="text-sm sm:text-base md:text-[0.975rem] text-white/85 leading-relaxed lg:leading-[1.6] mb-3 sm:mb-4 md:mb-5 lg:mb-6 max-w-[700px] text-left">
              We specialize in delivering innovative and impactful design
              solutions that elevate brands and drive results. From digital
              experiences to print media, our team of creative professionals is
              dedicated to transforming ideas into compelling visual stories
              that resonate with audiences. With a focus on creativity,
              strategy, and client collaboration.
            </p>

            {/* Mobile: Stacked vertical with bottom borders | Desktop: Horizontal with vertical separators */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start gap-0 sm:gap-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={
                  hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.6, delay: 0.4, ease: smoothEase }}
                className="w-full sm:w-auto"
              >
                <StatItem
                  number="45+"
                  label="Project Completed"
                  hasAnimated={hasAnimated}
                  delay={0.4}
                />
              </motion.div>

              {/* Vertical separator - hidden on mobile, visible on sm+ */}
              <motion.div
                initial={{ scaleY: 0 }}
                animate={hasAnimated ? { scaleY: 1 } : { scaleY: 0 }}
                transition={{ duration: 0.5, delay: 0.5, ease: smoothEase }}
                className="hidden sm:block w-px h-8 sm:h-9 lg:h-10 bg-white/30 mx-4 sm:mx-5 lg:mx-8 origin-top"
              />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={
                  hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.6, delay: 0.6, ease: smoothEase }}
                className="w-full sm:w-auto"
              >
                <StatItem
                  number="15+"
                  label="Years Of Experience"
                  hasAnimated={hasAnimated}
                  delay={0.6}
                />
              </motion.div>

              {/* Vertical separator - hidden on mobile, visible on sm+ */}
              <motion.div
                initial={{ scaleY: 0 }}
                animate={hasAnimated ? { scaleY: 1 } : { scaleY: 0 }}
                transition={{ duration: 0.5, delay: 0.7, ease: smoothEase }}
                className="hidden sm:block w-px h-8 sm:h-9 lg:h-10 bg-white/30 mx-4 sm:mx-5 lg:mx-8 origin-top"
              />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={
                  hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.6, delay: 0.8, ease: smoothEase }}
                className="w-full sm:w-auto"
              >
                <StatItem
                  number="100"
                  label="Client Satisfaction"
                  hasAnimated={hasAnimated}
                  delay={0.8}
                  isLast={true}
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Responsive Badge - scales with container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
            animate={
              hasAnimated
                ? { opacity: 1, scale: 1, rotate: 0 }
                : { opacity: 0, scale: 0.8, rotate: -20 }
            }
            transition={{ duration: 0.8, delay: 0.3, ease: smoothEase }}
            className="relative w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] md:w-[170px] md:h-[170px] lg:w-[180px] lg:h-[180px] shrink-0 flex items-center justify-center mt-0 sm:mt-0 lg:mt-0"
          >
            {/* Outer rotating circle with text */}
            <div className="absolute inset-0 rounded-full bg-[#0f0f10] flex items-center justify-center">
              <div className="absolute inset-0 animate-[spinBadge_12s_linear_infinite]">
                <svg
                  viewBox="0 0 230 230"
                  className="w-full h-full"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <defs>
                    <path
                      id="outerCircle"
                      d="M 115,115 m -100,0 a 100,100 0 1,1 200,0 a 100,100 0 1,1 -200,0"
                    />
                  </defs>
                  <text className="fill-white text-[10px] sm:text-[11px] font-semibold tracking-[2px] font-sans uppercase">
                    <textPath href="#outerCircle" startOffset="0%">
                      Connect Now • Connect Now • Connect Now • Connect Now •
                    </textPath>
                  </text>
                </svg>
              </div>
            </div>

            {/* Middle blue circle - Now dynamic to match gradient */}
            <div
              className="absolute w-[80px] h-[80px] sm:w-[105px] sm:h-[105px] md:w-[125px] md:h-[125px] lg:w-[135px] lg:h-[135px] rounded-full z-10"
              style={{
                background: `linear-gradient(135deg, ${gradientStart}, ${gradientEnd})`,
              }}
            />

            {/* Inner dark circle with arrow */}
            <div className="absolute w-[45px] h-[45px] sm:w-[60px] sm:h-[60px] md:w-[75px] md:h-[75px] lg:w-[85px] lg:h-[85px] rounded-full bg-[#0f0f10] flex items-center justify-center z-20 cursor-pointer hover:scale-105 transition-transform duration-300">
              <svg
                className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 text-[#6aa9ff] -rotate-45"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </div>
          </motion.div>

          <style>{`
            @keyframes spinBadge {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </motion.section>
    </div>
  );
};

export default CreativeDesignsSection;
