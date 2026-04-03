import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Button, { ArrowRightIcon } from "../button";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  buttonText?: string;
  buttonLink?: string;
  onButtonClick?: () => void;
  bgColor?: string;
  className?: string;
}

const FAQS: FAQItem[] = [
  {
    question: "What services does your agency provide?",
    answer:
      "We specialize in graphic design, branding, website design and development, UX/UI design, social media marketing, digital advertising, video production, and content creation.",
  },
  {
    question: "Who are your typical clients?",
    answer:
      "Our clients range from startups and small businesses to established enterprises across various industries including tech, retail, healthcare, and finance.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Project timelines vary depending on scope and complexity. A simple branding project may take 2–4 weeks, while a full website build can range from 6–12 weeks.",
  },
  {
    question: "What is your pricing structure?",
    answer:
      "We offer flexible pricing models including fixed-price packages, hourly rates, and retainer agreements tailored to your project needs and budget.",
  },
  {
    question: "Why are UX and UI important?",
    answer:
      "Great UX and UI design directly impact user satisfaction, retention, and conversion rates. A well-designed interface builds trust and ensures your product is intuitive and enjoyable to use.",
  },
];

const smoothEase: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const PlusIcon = ({ open }: { open: boolean }) => (
  <svg
    className="w-4 h-4 text-blue-500 flex-shrink-0"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <motion.line
      x1="12"
      y1="5"
      x2="12"
      y2="19"
      animate={{ opacity: open ? 0 : 1 }}
      transition={{ duration: 0.2 }}
    />
  </svg>
);

const AccordionItem: React.FC<{
  item: FAQItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  visible: boolean;
}> = ({ item, index, isOpen, onToggle, visible }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
    transition={{
      duration: 0.5,
      delay: visible ? 0.7 + index * 0.08 : 0,
      ease: smoothEase,
    }}
    className="rounded-2xl overflow-hidden"
    style={{ background: "#1a1a1a", border: "1px solid #2a2a2a" }}
  >
    <button
      className="w-full flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 text-left"
      onClick={onToggle}
    >
      <span className="text-sm sm:text-base font-bold text-white pr-4 leading-relaxed">
        {item.question}
      </span>
      <PlusIcon open={isOpen} />
    </button>

    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key="answer"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: smoothEase }}
          style={{ overflow: "hidden" }}
        >
          <p className="px-4 sm:px-6 pb-4 sm:pb-6 text-xs sm:text-sm leading-relaxed text-gray-400">
            {item.answer}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

export default function FAQ({
  buttonText = "All Team Members",
  buttonLink,
  onButtonClick,
  bgColor = "#111111",
  className = "",
}: FAQProps) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { once: true, amount: 0.15 });
  const [openIndex, setOpenIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const toggle = (i: number) => setOpenIndex((prev) => (prev === i ? -1 : i));

  // Handle animation state
  React.useEffect(() => {
    if (visible) {
      setIsLoaded(true);
    }
  }, [visible]);

  // Letter-by-letter animation function matching testimonials
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
      ref={ref}
      className={`py-12 sm:py-16 lg:py-20 overflow-hidden ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Header - Matches testimonials section design with button */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-12 sm:mb-16">
          {/* Left side: Label + Heading */}
          <div className="flex-1">
            {/* Label with star symbol animation */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.5, delay: 0.2, ease: smoothEase }}
              className="flex items-center gap-2 mb-6"
            >
              <motion.span
                initial={{ rotate: 0, scale: 0 }}
                animate={
                  visible ? { rotate: 360, scale: 1 } : { rotate: 0, scale: 0 }
                }
                transition={{ duration: 0.6, delay: 0.3, ease: "backOut" }}
                className="text-[#2A7DFF] text-lg"
              >
                ✦
              </motion.span>
              <span className="text-white font-medium text-sm tracking-wide">
                FAQ's
              </span>
            </motion.div>

            {/* Heading with letter-by-letter animation - matching testimonials style */}
            <h2 className="text-white text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight">
              <span className="block">
                {renderAnimatedText("Everything you need to ", 0.4)}
                <span className="inline-block">
                  {renderAnimatedText(
                    "know",
                    0.4 + "Everything you need to ".length * 0.02,
                  )}
                </span>
              </span>
            </h2>
          </div>

          {/* Right side: Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={
              visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
            }
            transition={{ duration: 0.5, delay: 0.55, ease: smoothEase }}
            className="w-full sm:w-auto flex-shrink-0"
          >
            <Button
              size="default"
              variant="primary"
              href={buttonLink}
              onClick={!buttonLink ? onButtonClick : undefined}
              className="w-full sm:w-auto"
            >
              {buttonText}
              <ArrowRightIcon className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </motion.div>
        </div>

        {/* Body */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          {/* Accordion */}
          <div className="flex flex-col gap-3">
            {FAQS.map((item, i) => (
              <AccordionItem
                key={i}
                item={item}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => toggle(i)}
                visible={visible}
              />
            ))}
          </div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={visible ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.5, ease: smoothEase }}
            className="relative rounded-3xl overflow-hidden sticky top-24
              h-[280px] sm:h-[320px] md:h-[380px] lg:h-[491px] xl:h-[520px]"
          >
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80"
              alt="Team member"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
