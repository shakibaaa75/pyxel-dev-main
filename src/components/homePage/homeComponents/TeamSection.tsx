import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Facebook, Twitter, Linkedin } from "lucide-react";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Joseph G. Brown",
    role: "Director",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Creative Director",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "Sarah Johnson",
    role: "Lead Designer",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop&crop=face",
  },
  {
    id: 4,
    name: "Emily Davis",
    role: "Marketing Head",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop&crop=face",
  },
  {
    id: 5,
    name: "Ethan Davis",
    role: "Tech Lead",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face",
  },
  {
    id: 6,
    name: "Lucas Turner",
    role: "Developer",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=500&fit=crop&crop=face",
  },
  {
    id: 7,
    name: "James Walker",
    role: "Product Manager",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop&crop=face",
  },
  {
    id: 8,
    name: "Charlotte Reed",
    role: "UX Researcher",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop&crop=face",
  },
];

const smoothEase: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const TeamSection: React.FC = () => {
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

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#161616] py-12 sm:py-16 lg:py-20 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        {/* Header Section with animated text like Methodology */}
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
                {renderAnimatedText("The minds ", 0.2)}
              </span>
              <span className="text-[#2A7DFF] block sm:inline">
                {renderAnimatedText(
                  "behind the magic",
                  0.2 + "The minds ".length * 0.01,
                )}
              </span>
            </h2>

            {/* Breadcrumb with staggered animation */}
            <div className="flex items-center gap-2 mt-3 text-sm text-gray-400">
              {["Home", "Team"].map((item, index) => (
                <React.Fragment key={item}>
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
                  <span
                    className={`hover:text-white transition-colors cursor-pointer transition-all duration-200 ${
                      isLoaded
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}
                    style={{ transitionDelay: `${0.4 + index * 0.05}s` }}
                  >
                    {item}
                  </span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Team Grid with staggered animations like Methodology steps */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={
                hasAnimated
                  ? { opacity: 1, y: 0, scale: 1 }
                  : { opacity: 0, y: 50, scale: 0.95 }
              }
              transition={{
                duration: 0.8,
                delay: hasAnimated ? index * 0.08 + 0.3 : 0,
                ease: smoothEase,
              }}
              className="group relative overflow-hidden cursor-pointer w-full"
              style={{ aspectRatio: "4/5" }}
            >
              {/* Image Container with rounded corners */}
              <div className="absolute inset-0 rounded-2xl sm:rounded-3xl overflow-hidden">
                <motion.img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  initial={{ scale: 1.1 }}
                  animate={hasAnimated ? { scale: 1 } : { scale: 1.1 }}
                  transition={{
                    duration: 0.8,
                    delay: hasAnimated ? index * 0.08 + 0.35 : 0,
                    ease: smoothEase,
                  }}
                />

                {/* Gradient Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"
                  initial={{ opacity: 0 }}
                  animate={hasAnimated ? { opacity: 0.7 } : { opacity: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: hasAnimated ? index * 0.08 + 0.4 : 0,
                  }}
                />

                {/* Info Card - Glassmorphism effect with slide-up animation */}
                <motion.div
                  className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3"
                  initial={{ y: 20, opacity: 0 }}
                  animate={
                    hasAnimated ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }
                  }
                  transition={{
                    duration: 0.5,
                    delay: hasAnimated ? index * 0.08 + 0.45 : 0,
                    ease: smoothEase,
                  }}
                >
                  <div className="backdrop-blur-md bg-white/10 rounded-xl sm:rounded-2xl p-2.5 sm:p-3 border border-white/10 shadow-lg transform transition-all duration-300 group-hover:translate-y-[-2px] group-hover:bg-white/15">
                    <h3 className="text-white font-semibold text-xs sm:text-sm truncate mb-0.5">
                      {member.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-white/70 text-[10px] sm:text-xs">
                        {member.role}
                      </span>
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        {[Facebook, Twitter, Linkedin].map(
                          (Icon, iconIndex) => (
                            <motion.a
                              key={iconIndex}
                              href="#"
                              className="text-white/60 hover:text-[#2A7DFF] transition-colors duration-200"
                              aria-label={
                                ["Facebook", "Twitter", "LinkedIn"][iconIndex]
                              }
                              initial={{ scale: 0, opacity: 0 }}
                              animate={
                                hasAnimated
                                  ? { scale: 1, opacity: 1 }
                                  : { scale: 0, opacity: 0 }
                              }
                              transition={{
                                duration: 0.3,
                                delay: hasAnimated
                                  ? index * 0.08 + 0.5 + iconIndex * 0.05
                                  : 0,
                                ease: smoothEase,
                              }}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                            </motion.a>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes rotate360 {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default TeamSection;
