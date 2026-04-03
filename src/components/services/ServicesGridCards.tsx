import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { services } from "../../data/Servicesdata";
import type { Service } from "../../data/Servicesdata";
import Breadcrumb from "../Breadcrumb/Breadcrumb";

const smoothEase: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

function ArrowIcon({ active }: { active?: boolean }) {
  return (
    <div
      className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
        active
          ? "bg-[#2979FF] rotate-45"
          : "bg-[#2a2a2a] rotate-0 group-hover:bg-[#2979FF] group-hover:rotate-45"
      }`}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 13L13 3M13 3H6M13 3V10"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function ServiceCard({
  service,
  featured,
  index,
  hasAnimated,
}: {
  service: Service;
  featured?: boolean;
  index: number;
  hasAnimated: boolean;
}) {
  return (
    <Link to={`/services/${service.slug}`} className="block">
      <motion.div
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
        className="group bg-[#1a1a1a] rounded-2xl overflow-hidden cursor-pointer hover:bg-[#1f1f1f] transition-colors duration-200 p-5 h-full"
      >
        {/* Image */}
        <div className="overflow-hidden rounded-xl mb-3">
          <motion.img
            src={service.image}
            alt={service.title}
            className="w-full h-[250px] object-cover rounded-xl"
            initial={{ scale: 1.1 }}
            animate={hasAnimated ? { scale: 1 } : { scale: 1.1 }}
            transition={{
              duration: 0.8,
              delay: hasAnimated ? index * 0.08 + 0.35 : 0,
              ease: smoothEase,
            }}
            whileHover={{ scale: 1.05 }}
          />
        </div>

        {/* Content */}
        <div className="flex items-end justify-between gap-3 pt-4">
          <div className="flex-1">
            <h3 className="text-white font-bold text-[15px] mb-1.5 group-hover:text-[#2979FF] transition-colors duration-200">
              {service.title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {service.description}
            </p>
          </div>
          <ArrowIcon active={featured} />
        </div>
      </motion.div>
    </Link>
  );
}

export default function ServicesGridCards() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  const breadcrumbItems = [
    { label: "Home", path: "/", isLast: false },
    { label: "Services", path: "/services", isLast: true },
  ];

  return (
    <div
      ref={sectionRef}
      className="min-h-screen bg-[#111111] font-['Montserrat'] overflow-x-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-8 sm:pt-10 pb-12 sm:pb-16">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="bg-[#1e1e1e] rounded-[20px] p-6 sm:p-8 lg:p-10 mb-6 sm:mb-8"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 leading-tight">
            <span className="text-white">Explore our </span>
            <span className="text-[#2979FF]">services</span>
          </h1>
          <div className="mt-2">
            <Breadcrumb customItems={breadcrumbItems} />
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              featured={index === 0}
              index={index}
              hasAnimated={hasAnimated}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
