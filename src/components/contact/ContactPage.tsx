import React, { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Phone, Mail, MapPin, Plus } from "lucide-react";
import Breadcrumb from "../Breadcrumb/Breadcrumb";

const smoothEase: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const ContactPage: React.FC = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  const breadcrumbItems = [
    { label: "Home", path: "/", isLast: false },
    { label: "Contact Us", path: "/contact", isLast: true },
  ];

  const contactInfo = [
    {
      icon: <Phone className="w-5 h-5 text-white" />,
      title: "Phone Number",
      value: "+987 654 3210",
    },
    {
      icon: <Mail className="w-5 h-5 text-white" />,
      title: "Email Us",
      value: "info@domain.com",
    },
    {
      icon: <MapPin className="w-5 h-5 text-white" />,
      title: "Address",
      value: "7676 Arden Avenue, Ginashire",
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      message: "",
    });
    alert("Message sent successfully!");
  };

  return (
    <div
      ref={sectionRef}
      className="min-h-screen bg-[#111111] font-['Montserrat']"
    >
      {/* Header with Breadcrumb - Same as Portfolio pages */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-8 sm:pt-10 pb-12 sm:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="bg-[#1a1a1a] rounded-[20px] p-6 sm:p-8 lg:p-10"
        >
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
              <span className="text-white">Contact </span>
              <span className="text-[#2E6BFF]">us</span>
            </h1>
            <div className="mt-2">
              <Breadcrumb customItems={breadcrumbItems} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pb-16 sm:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={
              hasAnimated ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }
            }
            transition={{ duration: 0.6, delay: 0.2, ease: smoothEase }}
            className="space-y-8"
          >
            {/* Section Label with Plus Icon */}
            <div className="flex items-center gap-2">
              <Plus className="w-3 h-3 text-[#2E6BFF]" />
              <span className="text-white text-sm font-medium">Contact us</span>
            </div>

            {/* Title */}
            <div className="space-y-0">
              <h2 className="text-white text-3xl sm:text-4xl font-bold">
                Let's start
              </h2>
              <h2 className="text-[#2E6BFF] text-3xl sm:text-4xl font-bold">
                Conversation
              </h2>
            </div>

            {/* Contact Cards with Dividers */}
            <div className="space-y-0">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{
                    duration: 0.5,
                    delay: 0.3 + index * 0.1,
                    ease: smoothEase,
                  }}
                >
                  <div className="flex items-start gap-4 py-5">
                    <div className="w-11 h-11 rounded-full bg-[#2E6BFF] flex items-center justify-center flex-shrink-0">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-base mb-1">
                        {info.title}
                      </h3>
                      <p className="text-gray-400 text-sm">{info.value}</p>
                    </div>
                  </div>
                  {/* Divider line between items */}
                  {index < contactInfo.length - 1 && (
                    <div className="h-px bg-white/10" />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={hasAnimated ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.3, ease: smoothEase }}
            className="bg-[#1a1a1a] rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
              Get a <span className="text-[#2E6BFF]">free advise</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* First Name / Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-gray-400 text-xs">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="First Name"
                    className="w-full px-4 py-3.5 bg-[#111111] border border-white/10 rounded-lg text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-[#2E6BFF]/50 transition-colors"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-gray-400 text-xs">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Last Name"
                    className="w-full px-4 py-3.5 bg-[#111111] border border-white/10 rounded-lg text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-[#2E6BFF]/50 transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Email / Mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-gray-400 text-xs">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email Address"
                    className="w-full px-4 py-3.5 bg-[#111111] border border-white/10 rounded-lg text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-[#2E6BFF]/50 transition-colors"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-gray-400 text-xs">Mobile Number</label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    placeholder="Mobile Number"
                    className="w-full px-4 py-3.5 bg-[#111111] border border-white/10 rounded-lg text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-[#2E6BFF]/50 transition-colors"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="text-gray-400 text-xs">your Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Subject"
                  rows={5}
                  className="w-full px-4 py-3.5 bg-[#111111] border border-white/10 rounded-lg text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-[#2E6BFF]/50 transition-colors resize-none"
                  required
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#2E6BFF] hover:bg-[#2558d9] text-white font-medium text-sm px-6 py-3 rounded-lg transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.5, ease: smoothEase }}
          className="mt-16"
        >
          <div className="rounded-2xl sm:rounded-3xl overflow-hidden aspect-[16/6]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.11976397304603!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1703123456789!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(100%) invert(92%)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Office Location"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
