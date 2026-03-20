import { useState, useRef, useEffect, useMemo, memo } from "react";
import { motion, useInView, type Transition } from "framer-motion";
import { Sparkles } from "lucide-react";
import Button, { ArrowRightIcon } from "../../button";

interface Milestone {
  id: string;
  year: string;
  title: string;
  description: string;
}

const milestones: Milestone[] = [
  {
    id: "1",
    year: "2015 - 2016",
    title: "Best Design Award",
    description:
      "We begin by getting to know you and your brand. Through in-depth.",
  },
  {
    id: "2",
    year: "2016 - 2017",
    title: "Dribble Winner",
    description:
      "We begin by getting to know you and your brand. Through in-depth.",
  },
  {
    id: "3",
    year: "2017 - 2018",
    title: "Design Of The Year",
    description:
      "We begin by getting to know you and your brand. Through in-depth.",
  },
  {
    id: "4",
    year: "2017 - 2018",
    title: "Graphic Design Winner",
    description:
      "We begin by getting to know you and your brand. Through in-depth.",
  },
  {
    id: "5",
    year: "2018 - 2019",
    title: "Awward Winner",
    description:
      "We begin by getting to know you and your brand. Through in-depth.",
  },
  {
    id: "6",
    year: "2019 - 2020",
    title: "Best Jury Award",
    description:
      "We begin by getting to know you and your brand. Through in-depth.",
  },
];

const smoothEase: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const springTransition: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 15,
  mass: 1,
};

// Memoized card to prevent re-renders
const MilestoneCard = memo<{
  milestone: Milestone;
  index: number;
  hasAnimated: boolean;
}>(({ milestone, index, hasAnimated }) => {
  // Pre-calculate delays
  const cardDelay = hasAnimated ? index * 0.08 + 0.2 : 0;
  const metaDelay = hasAnimated ? index * 0.08 + 0.3 : 0;
  const titleDelay = hasAnimated ? index * 0.08 + 0.4 : 0;
  const descDelay = hasAnimated ? index * 0.08 + 0.5 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: cardDelay, ease: smoothEase }}
      className="group relative p-4 sm:p-5 lg:p-6 border-b border-white/10 md:border-r last:md:border-r-0 w-full"
    >
      <motion.div
        className="flex items-center gap-2 mb-2 sm:mb-3"
        initial={{ opacity: 0, x: -10 }}
        animate={hasAnimated ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
        transition={{ ...springTransition, delay: metaDelay }}
      >
        <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-[#2A7DFF]" />
        <span className="text-gray-400 text-xs sm:text-sm font-medium font-['Rethink_Sans']">
          {milestone.year}
        </span>
      </motion.div>

      <motion.h3
        className="font-['Montserrat'] text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2"
        initial={{ opacity: 0, y: 15 }}
        animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
        transition={{ ...springTransition, delay: titleDelay }}
      >
        {milestone.title}
      </motion.h3>

      <motion.p
        className="font-['Rethink_Sans'] text-gray-500 leading-relaxed text-xs sm:text-sm line-clamp-2"
        initial={{ opacity: 0, y: 15 }}
        animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
        transition={{ ...springTransition, delay: descDelay }}
      >
        {milestone.description}
      </motion.p>
    </motion.div>
  );
});

MilestoneCard.displayName = "MilestoneCard";

// Optimized text animation - no per-letter splitting
const AnimatedHeading = memo<{ hasAnimated: boolean }>(({ hasAnimated }) => {
  return (
    <h2 className="font-['Montserrat'] font-semibold text-white mb-6 sm:mb-8 text-[32px] sm:text-[42px] md:text-[48px] lg:text-[54px] leading-tight lg:leading-[1.2]">
      <motion.span
        className="block text-white"
        initial={{ opacity: 0, y: 30 }}
        animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, delay: 0.2, ease: smoothEase }}
      >
        Proud Moments
      </motion.span>
      <motion.span
        className="block text-[#2A7DFF] mt-2 sm:mt-3"
        initial={{ opacity: 0, y: 30 }}
        animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, delay: 0.35, ease: smoothEase }}
      >
        & Milestones
      </motion.span>
    </h2>
  );
});

AnimatedHeading.displayName = "AnimatedHeading";

const ProudMoments: React.FC = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.1, // Lower threshold for earlier trigger
    margin: "50px", // Start slightly before in view
  });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      // Use requestAnimationFrame for smoother state update
      requestAnimationFrame(() => {
        setHasAnimated(true);
      });
    }
  }, [isInView, hasAnimated]);

  // Memoize grid layout calculations
  const gridItems = useMemo(() => {
    return milestones.map((milestone, index) => (
      <div
        key={milestone.id}
        className={`${index % 2 === 0 ? "md:border-r border-white/10" : ""} ${
          index < milestones.length - 2 ? "border-b border-white/10" : ""
        }`}
      >
        <MilestoneCard
          milestone={milestone}
          index={index}
          hasAnimated={hasAnimated}
        />
      </div>
    ));
  }, [hasAnimated]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#161616] py-12 sm:py-16 lg:py-20 overflow-hidden will-change-transform"
    >
      {/* Optimized rotating image - CSS animation instead of Framer Motion */}
      <div
        className="absolute -top-20 -left-20 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 pointer-events-none z-0 opacity-30 animate-[spin_20s_linear_infinite]"
        style={{ willChange: "transform" }}
      >
        <img
          src="/images/roted.png"
          alt=""
          className="w-full h-full object-contain"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left side - No longer sticky */}
          <div className="lg:col-span-5 relative">
            <div className="flex flex-col">
              <motion.div
                className="flex items-center gap-2 text-[#2A7DFF] mb-4 sm:mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: 0.1, ease: smoothEase }}
              >
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="font-['Rethink_Sans'] text-xs sm:text-sm font-medium tracking-wide uppercase">
                  Our Achievements
                </span>
              </motion.div>

              <AnimatedHeading hasAnimated={hasAnimated} />

              <motion.p
                className="font-['Rethink_Sans'] text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed mb-8 sm:mb-10 max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: 0.5, ease: smoothEase }}
              >
                We're a full-service design agency specializing in branding, web
                design, and creative strategies that elevate businesses.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={
                  hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: 0.6, ease: smoothEase }}
              >
                <Button size="default" variant="primary" className="group">
                  Let's Get Started!
                  <ArrowRightIcon className="h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Right side - Scrollable content */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 relative">
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 hidden md:block transform -translate-x-1/2" />
              {gridItems}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default ProudMoments;
