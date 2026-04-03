import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
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
import Breadcrumb from "../Breadcrumb/Breadcrumb";

const smoothEase: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const featureIcons = [
  <Award className="w-5 h-5 text-gray-400" />,
  <Trophy className="w-5 h-5 text-gray-400" />,
];

// ─── Sidebar ──────────────────────────────────────────────────────────────────
function PortfolioSidebar({
  detailRows,
  onContactClick,
}: {
  detailRows: { icon: React.ReactNode; label: string; value: string }[];
  onContactClick: () => void;
}) {
  return (
    <div className="flex flex-col gap-4 sticky top-24">
      {/* Project Details */}
      <div className="rounded-2xl overflow-hidden border border-white/8">
        <div className="bg-[#2E6BFF] px-5 py-3">
          <h3 className="text-white font-semibold text-sm font-['Montserrat']">
            Project Details
          </h3>
        </div>
        <div className="px-5 py-4" style={{ background: "#1a1a1a" }}>
          {detailRows.map((row, i) => (
            <div key={i}>
              <div className="py-3">
                <div className="flex items-center gap-2 mb-0.5">
                  {row.icon}
                  <span className="text-white text-xs font-semibold font-['Montserrat']">
                    {row.label}
                  </span>
                </div>
                <p className="text-gray-400 text-xs pl-6 break-words font-['Montserrat']">
                  {row.value}
                </p>
              </div>
              {i < detailRows.length - 1 && <div className="h-px bg-white/5" />}
            </div>
          ))}
          <div className="h-px bg-white/5" />
          <div className="pt-3 flex items-center gap-2">
            <Share2 className="w-4 h-4 text-gray-400" />
            <span className="text-white text-xs font-semibold font-['Montserrat']">
              Share:
            </span>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div
        className="rounded-2xl px-5 py-6 border border-white/8 flex flex-col items-center text-center gap-3"
        style={{ background: "#1a1a1a" }}
      >
        <div className="w-12 h-12 rounded-full bg-[#2E6BFF]/15 flex items-center justify-center">
          <div className="relative">
            <Mail className="w-5 h-5 text-[#2E6BFF]" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-[#1a1a1a]" />
          </div>
        </div>
        <p className="text-gray-400 text-xs leading-relaxed font-['Montserrat']">
          We are always available to discuss with you
        </p>
        <p className="text-white text-xs font-medium font-['Montserrat']">
          info@domain.com
        </p>
        <button
          onClick={onContactClick}
          className="flex items-center gap-2 bg-[#2E6BFF] hover:bg-[#1e5fcc] transition-colors text-white text-xs font-semibold px-5 py-2.5 rounded-full font-['Montserrat']"
        >
          Contact Us <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}

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
        className="w-full flex items-center justify-between px-4 sm:px-5 py-3 sm:py-4 text-left"
      >
        <span className="text-white text-sm sm:text-base font-medium font-['Montserrat'] pr-4">
          {faq.question}
        </span>
        <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-[#2E6BFF]">
          {open ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.35, ease: smoothEase }}
        className="overflow-hidden"
      >
        <p className="px-4 sm:px-5 pb-4 text-gray-400 text-sm font-['Montserrat'] leading-relaxed">
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
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  const item = portfolioItems.find((p) => p.slug === slug);

  useEffect(() => {
    if (!item) navigate("/portfolio");
  }, [item, navigate]);

  if (!item) return null;

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
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-8 sm:pt-10 pb-6 sm:pb-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="bg-[#1e1e1e] rounded-[20px] p-6 sm:p-8 lg:p-10 mb-6 sm:mb-8"
        >
          <div className="space-y-3 sm:space-y-4 md:space-y-6">
            {/* Main Heading */}
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight tracking-tight font-['Montserrat']">
              {item.title}
            </h1>

            {/* Dynamic Breadcrumb - using Breadcrumb component */}
            <div className="mt-2">
              <Breadcrumb customItems={breadcrumbItems} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Body ── */}
      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pb-16 sm:pb-20">
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-10">
          {/* Sidebar - Always visible on all screen sizes, stacks on mobile */}
          <motion.aside
            initial={{ opacity: 0, x: -24 }}
            animate={
              hasAnimated ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }
            }
            transition={{ duration: 0.6, delay: 0.2, ease: smoothEase }}
            className="w-full lg:w-[280px] xl:w-[300px] flex-shrink-0"
          >
            <div className="lg:sticky lg:top-24">
              <PortfolioSidebar
                detailRows={detailRows}
                onContactClick={() => navigate("/contact")}
              />
            </div>
          </motion.aside>

          {/* ── MAIN CONTENT ── */}
          <motion.main
            initial={{ opacity: 0, y: 24 }}
            animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.6, delay: 0.25, ease: smoothEase }}
            className="flex-1 min-w-0 space-y-8 sm:space-y-10"
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
              className="rounded-xl sm:rounded-2xl overflow-hidden aspect-video w-full"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
                loading="lazy"
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
              <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 font-['Montserrat']">
                Project overview
              </h2>
              <div className="space-y-3 sm:space-y-4 text-gray-400 text-sm sm:text-base leading-relaxed font-['Montserrat']">
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
              <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-bold mb-3 font-['Montserrat']">
                The challenge of project
              </h2>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-4 sm:mb-5 font-['Montserrat']">
                {item.challengeIntro}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-5 sm:mb-7">
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
                    className="flex items-center gap-2 text-gray-300 text-sm font-['Montserrat']"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#2E6BFF] flex-shrink-0" />
                    <span className="break-words">{ch}</span>
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
                className="rounded-xl sm:rounded-2xl overflow-hidden aspect-video w-full"
              >
                <img
                  src={item.secondImage}
                  alt={`${item.title} challenge`}
                  className="w-full h-full object-cover"
                  loading="lazy"
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
              <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-bold mb-3 font-['Montserrat']">
                Features of project
              </h2>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6 font-['Montserrat']">
                {item.featuresIntro}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
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
                    className="flex gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border border-white/8"
                    style={{ background: "#1a1a1a" }}
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                      {featureIcons[i] ?? featureIcons[0]}
                    </div>
                    <div>
                      <h4 className="text-white text-sm sm:text-base font-semibold mb-1 font-['Montserrat']">
                        {f.title}
                      </h4>
                      <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-['Montserrat']">
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
                <span className="text-[#2E6BFF] text-xs font-semibold uppercase tracking-widest font-['Montserrat']">
                  FAQ's
                </span>
              </div>
              <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 font-['Montserrat']">
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
        
        @media (max-width: 768px) {
          .sticky {
            position: sticky;
          }
        }
      `}</style>
    </div>
  );
};

export default PortfolioSinglePage;
