import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

interface Testimonial {
  id: number;
  rating: number;
  content: string;
  author: string;
  role: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    rating: 5,
    content:
      "The creativity professionalism shown by Rovex exceeded our expectations Their design transformed brand and the results speak for themselves.",
    author: "Arlene McCoy",
    role: "Co Founder",
  },
  {
    id: 2,
    rating: 5,
    content:
      "The creativity professionalism shown by Rovex exceeded our expectations Their design transformed brand and the results speak for themselves.",
    author: "Arlene McCoy",
    role: "Co Founder",
  },
  {
    id: 3,
    rating: 5,
    content:
      "The creativity professionalism shown by Rovex exceeded our expectations Their design transformed brand and the results speak for themselves.",
    author: "Arlene McCoy",
    role: "Co Founder",
  },
];

const smoothEase: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const TestimonialCard: React.FC<{
  testimonial: Testimonial;
  index: number;
  isAnimated: boolean;
  delay: number;
}> = ({ testimonial, index, isAnimated, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={
        isAnimated
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 50, scale: 0.95 }
      }
      transition={{
        duration: 0.6,
        delay: isAnimated ? delay + index * 0.1 : 0,
        ease: smoothEase,
      }}
      className="group relative bg-[#2a2a2a] rounded-3xl p-8 transition-all duration-500 hover:scale-[1.02] hover:bg-[#323232]"
    >
      {/* Rating Stars with staggered animation - using text stars */}
      <div className="flex gap-1 mb-6">
        {[...Array(testimonial.rating)].map((_, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={
              isAnimated ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }
            }
            transition={{
              duration: 0.3,
              delay: isAnimated ? delay + index * 0.1 + i * 0.05 : 0,
              ease: "backOut",
            }}
            className="text-[#2A7DFF] text-base"
          >
            ★
          </motion.span>
        ))}
      </div>

      {/* Content with character animation */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={isAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{
          duration: 0.5,
          delay: isAnimated ? delay + index * 0.1 + 0.2 : 0,
          ease: smoothEase,
        }}
        className="text-gray-400 text-base leading-relaxed mb-8 min-h-[120px]"
      >
        {testimonial.content}
      </motion.p>

      {/* Divider with width animation */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isAnimated ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{
          duration: 0.6,
          delay: isAnimated ? delay + index * 0.1 + 0.3 : 0,
          ease: smoothEase,
        }}
        className="h-px bg-gray-600 mb-6 group-hover:bg-gray-500 transition-colors duration-300 origin-left"
      />

      {/* Author Info with slide animation */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={isAnimated ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{
          duration: 0.5,
          delay: isAnimated ? delay + index * 0.1 + 0.4 : 0,
          ease: smoothEase,
        }}
      >
        <h4 className="text-white font-medium text-lg mb-1">
          {testimonial.author}
        </h4>
        <p className="text-gray-500 text-sm">{testimonial.role}</p>
      </motion.div>

      {/* Subtle glow effect on hover */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isAnimated ? { opacity: 0 } : { opacity: 0 }}
        className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      />
    </motion.div>
  );
};

const TestimonialsSection: React.FC = () => {
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
      const delay = baseDelay + index * 0.02;
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
      className="bg-[#111111] py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-[1400px] bg-[#1e1e1e] rounded-3xl p-8 mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          {/* Label with sparkle animation - using text star */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={
              hasAnimated ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }
            }
            transition={{ duration: 0.5, delay: 0.2, ease: smoothEase }}
            className="flex items-center gap-2 mb-6"
          >
            <motion.span
              initial={{ rotate: 0, scale: 0 }}
              animate={
                hasAnimated
                  ? { rotate: 360, scale: 1 }
                  : { rotate: 0, scale: 0 }
              }
              transition={{ duration: 0.6, delay: 0.3, ease: "backOut" }}
              className="text-[#2A7DFF] text-lg"
            >
              ✦
            </motion.span>
            <span className="text-white font-medium text-sm tracking-wide">
              Our Team
            </span>
          </motion.div>

          {/* Heading with letter-by-letter animation */}
          <h2 className="text-white text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight">
            <span className="block">
              {renderAnimatedText("Hear from our happy ", 0.4)}
              <span className="inline-block">
                {renderAnimatedText(
                  "clients",
                  0.4 + "Hear from our happy ".length * 0.02,
                )}
              </span>
            </span>
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
              isAnimated={hasAnimated}
              delay={0.5}
            />
          ))}
        </div>

        {/* Optional: Add a subtle floating animation to the entire section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={hasAnimated ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="absolute inset-0 pointer-events-none"
        />
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;
