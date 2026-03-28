import React, { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Check, Shield, Clock, Calendar } from "lucide-react";
import Breadcrumb from "../Breadcrumb/Breadcrumb";

const smoothEase: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

interface PricingPlan {
  name: string;
  price: number;
  period: string;
  features: string[];
  isPopular?: boolean;
  buttonVariant: "blue" | "dark";
}

const PricingPage: React.FC = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  // Dynamic breadcrumb items
  const breadcrumbItems = [
    { label: "Home", path: "/", isLast: false },
    { label: "Pricing Plan", path: "/pricing", isLast: true },
  ];

  const plans: PricingPlan[] = [
    {
      name: "Basic Plan",
      price: 29,
      period: "Per Month",
      features: [
        "20 Pages Responsive Website",
        "Unlimited PPC Campaigns",
        "Unlimited Facebook",
        "Unlimited Video Campaigns",
      ],
      buttonVariant: "blue",
    },
    {
      name: "Standard Plan",
      price: 39,
      period: "Per Month",
      features: [
        "20 Pages Responsive Website",
        "Unlimited PPC Campaigns",
        "Unlimited Facebook",
        "Unlimited Video Campaigns",
      ],
      isPopular: true,
      buttonVariant: "dark",
    },
    {
      name: "Premium Plan",
      price: 49,
      period: "Per Month",
      features: [
        "20 Pages Responsive Website",
        "Unlimited PPC Campaigns",
        "Unlimited Facebook",
        "Unlimited Video Campaigns",
      ],
      buttonVariant: "blue",
    },
  ];

  const trustBadges = [
    { icon: <Calendar className="w-4 h-4" />, text: "Get 30 day free trial" },
    { icon: <Shield className="w-4 h-4" />, text: "No any hidden fees pay" },
    { icon: <Clock className="w-4 h-4" />, text: "You can cancel anytime" },
  ];

  return (
    <div
      ref={sectionRef}
      className="min-h-screen bg-[#111111] font-['Montserrat']"
    >
      {/* Hero Header with Dynamic Breadcrumb */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-8 sm:pt-10 pb-12 sm:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="bg-[#1a1a1a] rounded-[20px] p-6 sm:p-8 lg:p-10"
        >
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
              <span className="text-white">Pricing </span>
              <span className="text-[#2E6BFF]">Plan</span>
            </h1>
            <div className="mt-2">
              <Breadcrumb customItems={breadcrumbItems} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              animate={
                hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
              }
              transition={{
                duration: 0.6,
                delay: 0.2 + index * 0.1,
                ease: smoothEase,
              }}
              className={`relative rounded-3xl p-6 sm:p-8 flex flex-col ${
                plan.isPopular ? "bg-[#2E6BFF] scale-105 z-10" : "bg-[#1a1a1a]"
              }`}
            >
              {/* Plan Name Badge - Black pill at top */}
              <div className="mb-6">
                <span className="inline-block bg-[#111111] text-white text-xs font-medium px-4 py-2 rounded-lg">
                  {plan.name}
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-1 mb-2">
                <span
                  className={
                    plan.isPopular
                      ? "text-white/80 text-xl"
                      : "text-gray-400 text-xl"
                  }
                >
                  $
                </span>
                <span className="text-white text-5xl font-bold tracking-tight">
                  {plan.price}
                </span>
                <span
                  className={
                    plan.isPopular
                      ? "text-white/60 text-sm ml-1"
                      : "text-gray-500 text-sm ml-1"
                  }
                >
                  / {plan.period}
                </span>
              </div>

              {/* Divider line */}
              <div
                className={`h-px w-full mb-6 ${plan.isPopular ? "bg-white/20" : "bg-white/10"}`}
              />

              {/* Features */}
              <ul className="space-y-4 mb-6 flex-1">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${plan.isPopular ? "bg-white/20" : "bg-[#2E6BFF]/10"}`}
                    >
                      <Check
                        className={`w-3 h-3 ${plan.isPopular ? "text-white" : "text-[#2E6BFF]"}`}
                      />
                    </div>
                    <span
                      className={
                        plan.isPopular
                          ? "text-white/90 text-sm"
                          : "text-gray-300 text-sm"
                      }
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-3 rounded-xl font-semibold text-sm transition-colors ${
                  plan.buttonVariant === "dark"
                    ? "bg-[#111111] text-white hover:bg-[#1a1a1a]"
                    : "bg-[#2E6BFF] text-white hover:bg-[#2558d9]"
                }`}
              >
                Let's Get Started
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6, ease: smoothEase }}
          className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-16 mt-12 sm:mt-16"
        >
          {trustBadges.map((badge, index) => (
            <div key={index} className="flex items-center gap-2 text-gray-400">
              <span className="text-[#2E6BFF]">{badge.icon}</span>
              <span className="text-sm">{badge.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default PricingPage;
