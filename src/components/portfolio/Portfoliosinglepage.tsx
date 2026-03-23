import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  FileText,
  Users,
  Grid2X2,
  Calendar,
  Share2,
  Mail,
  ArrowRight,
  CheckCircle2,
  Award,
  Trophy,
  Plus,
  Minus,
} from "lucide-react";
import { portfolioItems, type PortfolioFaq } from "../../data/Portfoliodata";

const smoothEase: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const featureIcons = [
  <Award className="w-5 h-5 text-gray-400" />,
  <Trophy className="w-5 h-5 text-gray-400" />,
];

// ─── FAQ Accordion ─────────────────────────────────────────────────────────────
const FaqAccordion: React.FC<{
  faq: PortfolioFaq;
  index: number;
  hasAnimated: boolean;
}> = ({ faq, index, hasAnimated }) => {
  const [open, setOpen] = useState(index === 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{
        duration: 0.4,
        delay: hasAnimated ? index * 0.07 + 0.3 : 0,
        ease: smoothEase,
      }}
      className="border border-white/8 rounded-xl overflow-hidden"
      style={{ background: "rgba(255,255,255,0.03)" }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
      >
        <span className="text-white text-sm sm:text-base font-medium font-['Montserrat']">
          {faq.question}
        </span>
        <span className="flex-shrink-0 ml-4 w-6 h-6 flex items-center justify-center text-[#2E6BFF]">
          {open ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.35, ease: smoothEase }}
        className="overflow-hidden"
      >
        <p className="px-5 pb-4 text-gray-400 text-sm font-['Montserrat'] leading-relaxed">
          {faq.answer}
        </p>
      </motion.div>
    </motion.div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
const PortfolioSinglePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      setIsLoaded(true);
    }
  }, [isInView, hasAnimated]);

  const item = portfolioItems.find((p) => p.slug === slug);

  useEffect(() => {
    if (!item) navigate("/portfolio");
  }, [item, navigate]);

  if (!item) return null;

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

  const detailRows = [
    {
      icon: <FileText className="w-4 h-4 text-gray-400" />,
      label: "Project Name:",
      value: item.title,
    },
    {
      icon: <Users className="w-4 h-4 text-gray-400" />,
      label: "Clients:",
      value: item.client,
    },
    {
      icon: <Grid2X2 className="w-4 h-4 text-gray-400" />,
      label: "Category:",
      value: item.category,
    },
    {
      icon: <Calendar className="w-4 h-4 text-gray-400" />,
      label: "Date:",
      value: item.date,
    },
  ];

  // Dynamic breadcrumb items
  const breadcrumbItems = [
    { label: "Home", path: "/", isLast: false },
    { label: "Portfolio", path: "/portfolio", isLast: false },
    { label: item.title, path: "", isLast: true },
  ];

  return (
    <div
      ref={sectionRef}
      className="min-h-screen bg-[#111111] font-['Montserrat']"
    >
      {/* Hero Header with Breadcrumb Design like Blog Page */}
      <div className="pt-16 sm:pt-20 pb-0 px-4 sm:px-8 lg:px-16">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: smoothEase }}
            className="bg-[#1e1e1e] rounded-[20px] p-6 sm:p-8 md:p-10 mb-8"
          >
            <div className="space-y-4 sm:space-y-6">
              {/* Main Heading with letter-by-letter animation */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight font-['Montserrat']">
                {renderAnimatedText(item.title, 0.2)}
              </h1>

              {/* Dynamic Breadcrumb */}
              <div className="flex items-center gap-2 text-sm text-gray-400">
                {breadcrumbItems.map((item, index) => (
                  <React.Fragment key={item.label}>
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
                    {item.isLast ? (
                      <span
                        className={`transition-all duration-200 ${
                          isLoaded
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-4"
                        }`}
                        style={{ transitionDelay: `${0.4 + index * 0.05}s` }}
                      >
                        {item.label}
                      </span>
                    ) : (
                      <Link
                        to={item.path}
                        className={`hover:text-white transition-colors cursor-pointer transition-all duration-200 ${
                          isLoaded
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-4"
                        }`}
                        style={{ transitionDelay: `${0.4 + index * 0.05}s` }}
                      >
                        {item.label}
                      </Link>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-14">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          {/* ── SIDEBAR ── */}
          <motion.aside
            initial={{ opacity: 0, x: -24 }}
            animate={
              hasAnimated ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }
            }
            transition={{ duration: 0.6, delay: 0.2, ease: smoothEase }}
            className="w-full lg:w-[260px] flex-shrink-0 space-y-5"
          >
            {/* Project Details */}
            <div className="rounded-2xl overflow-hidden border border-white/8">
              <div className="bg-[#2E6BFF] px-5 py-3">
                <h3 className="text-white font-semibold text-sm">
                  Project Details
                </h3>
              </div>
              <div className="px-5 py-4" style={{ background: "#1a1a1a" }}>
                {detailRows.map((row, i) => (
                  <div key={i}>
                    <div className="py-3">
                      <div className="flex items-center gap-2 mb-0.5">
                        {row.icon}
                        <span className="text-white text-xs font-semibold">
                          {row.label}
                        </span>
                      </div>
                      <p className="text-gray-400 text-xs pl-6">{row.value}</p>
                    </div>
                    {i < detailRows.length - 1 && (
                      <div className="h-px bg-white/5" />
                    )}
                  </div>
                ))}
                <div className="h-px bg-white/5" />
                <div className="pt-3 flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-gray-400" />
                  <span className="text-white text-xs font-semibold">
                    Share:
                  </span>
                </div>
              </div>
            </div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={
                hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.5, delay: 0.3, ease: smoothEase }}
              className="rounded-2xl px-5 py-6 border border-white/8 flex flex-col items-center text-center gap-3"
              style={{ background: "#1a1a1a" }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={hasAnimated ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.4, delay: 0.4, ease: smoothEase }}
                className="w-12 h-12 rounded-full bg-[#2E6BFF]/15 flex items-center justify-center"
              >
                <div className="relative">
                  <Mail className="w-5 h-5 text-[#2E6BFF]" />
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={hasAnimated ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                    className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-[#1a1a1a]"
                  />
                </div>
              </motion.div>
              <p className="text-gray-400 text-xs leading-relaxed">
                We are always available to discuss with you
              </p>
              <p className="text-white text-xs font-medium">info@domain.com</p>
              <button
                onClick={() => navigate("/contact")}
                className="flex items-center gap-2 bg-[#2E6BFF] hover:bg-[#1e5fcc] transition-colors text-white text-xs font-semibold px-5 py-2.5 rounded-full"
              >
                Contact Us <ArrowRight className="w-3 h-3" />
              </button>
            </motion.div>
          </motion.aside>

          {/* ── MAIN CONTENT ── */}
          <motion.main
            initial={{ opacity: 0, y: 24 }}
            animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.6, delay: 0.25, ease: smoothEase }}
            className="flex-1 min-w-0 space-y-10"
          >
            {/* Hero image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={
                hasAnimated
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.95 }
              }
              transition={{ duration: 0.6, delay: 0.3, ease: smoothEase }}
              className="rounded-2xl overflow-hidden aspect-[16/9] w-full"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Overview */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={
                hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.5, delay: 0.35, ease: smoothEase }}
            >
              <h2 className="text-white text-2xl sm:text-3xl font-bold mb-4">
                Project overview
              </h2>
              <div className="space-y-4 text-gray-400 text-sm sm:text-base leading-relaxed">
                {item.overview.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </motion.section>

            {/* Challenge */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={
                hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.5, delay: 0.4, ease: smoothEase }}
            >
              <h2 className="text-white text-2xl sm:text-3xl font-bold mb-3">
                The challenge of project
              </h2>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-5">
                {item.challengeIntro}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-7">
                {item.challenges.map((ch, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    animate={
                      hasAnimated
                        ? { opacity: 1, x: 0 }
                        : { opacity: 0, x: -12 }
                    }
                    transition={{
                      duration: 0.4,
                      delay: hasAnimated ? 0.45 + i * 0.07 : 0,
                      ease: smoothEase,
                    }}
                    className="flex items-center gap-2 text-gray-300 text-sm"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#2E6BFF] flex-shrink-0" />
                    {ch}
                  </motion.div>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={
                  hasAnimated
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.95 }
                }
                transition={{ duration: 0.6, delay: 0.5, ease: smoothEase }}
                className="rounded-2xl overflow-hidden aspect-[16/8] w-full"
              >
                <img
                  src={item.secondImage}
                  alt={`${item.title} challenge`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.section>

            {/* Features */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={
                hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.5, delay: 0.55, ease: smoothEase }}
            >
              <h2 className="text-white text-2xl sm:text-3xl font-bold mb-3">
                Features of project
              </h2>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6">
                {item.featuresIntro}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {item.features.map((f, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    animate={
                      hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
                    }
                    transition={{
                      duration: 0.4,
                      delay: hasAnimated ? 0.6 + i * 0.1 : 0,
                      ease: smoothEase,
                    }}
                    className="flex gap-4 p-4 rounded-xl border border-white/8"
                    style={{ background: "#1a1a1a" }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                      {featureIcons[i] ?? featureIcons[0]}
                    </div>
                    <div>
                      <h4 className="text-white text-sm font-semibold mb-1">
                        {f.title}
                      </h4>
                      <p className="text-gray-400 text-xs leading-relaxed">
                        {f.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* FAQ */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={
                hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.5, delay: 0.7, ease: smoothEase }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Plus className="w-3 h-3 text-[#2E6BFF]" />
                <span className="text-[#2E6BFF] text-xs font-semibold uppercase tracking-widest">
                  FAQ's
                </span>
              </div>
              <h2 className="text-white text-2xl sm:text-3xl font-bold mb-6">
                Find your answers here
              </h2>
              <div className="space-y-3">
                {item.faqs.map((faq, i) => (
                  <FaqAccordion
                    key={i}
                    faq={faq}
                    index={i}
                    hasAnimated={hasAnimated}
                  />
                ))}
              </div>
            </motion.section>
          </motion.main>
        </div>
      </div>

      <style>{`
        .opacity-0 {
          opacity: 0;
        }
        
        .opacity-100 {
          opacity: 1;
        }
        
        .translate-y-0 {
          transform: translateY(0);
        }
        
        .translate-y-4 {
          transform: translateY(1rem);
        }
      `}</style>
    </div>
  );
};

export default PortfolioSinglePage;
