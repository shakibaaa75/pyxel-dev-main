import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface BlogPost {
  id: number;
  image: string;
  title: string;
  excerpt: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    image:
      "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop&q=80",
    title: "How To Choose The Right Website For Your Business?",
    excerpt:
      "A website is one of the biggest marketing tools for your business...",
  },
  {
    id: 2,
    image:
      "https://images.pexels.com/photos/5632397/pexels-photo-5632397.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop&q=80",
    title: "Why Choose A Custom Ecommerce Website Design?",
    excerpt:
      "Great e-commerce websites don't just happen by chance. They are...",
  },
  {
    id: 3,
    image:
      "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop&q=80",
    title: "8 Reasons Why Your Website Needs Search Engine Optimization",
    excerpt:
      "Today's consumers rely on search engines to help them find everything...",
  },
  {
    id: 4,
    image:
      "https://images.pexels.com/photos/3760069/pexels-photo-3760069.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop&q=80",
    title: "The Future Of Web Design: Trends To Watch In 2024",
    excerpt:
      "Web design is constantly evolving with new technologies and user expectations...",
  },
  {
    id: 5,
    image:
      "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop&q=80",
    title: "How To Optimize Your Website For Mobile Users",
    excerpt:
      "With mobile devices accounting for over half of all web traffic...",
  },
  {
    id: 6,
    image:
      "https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop&q=80",
    title: "The Importance Of Website Speed And Performance",
    excerpt:
      "Website speed is crucial for user experience and search engine rankings...",
  },
];

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 8H13M13 8L9 4M13 8L9 12"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 1V11M1 6H11"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function BlogSection() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  const smoothEase: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

  return (
    <div
      ref={sectionRef}
      className="bg-[#161616] flex items-center justify-center py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden"
    >
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: smoothEase }}
        className="max-w-[1400px] mx-auto w-full px-3 sm:px-6 lg:px-8 xl:px-12 relative z-10"
      >
        {/* Label */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[#2979FF] leading-none">
            <PlusIcon />
          </span>
          <span className="text-white text-sm font-semibold tracking-wide">
            Blog
          </span>
        </div>

        {/* Header Row */}
        <div className="flex items-start justify-between flex-wrap gap-5 mb-12">
          <h2 className="text-[clamp(28px,4vw,44px)] font-extrabold text-white leading-[1.15] m-0">
            Latest insights &{" "}
            <span className="text-[#2979FF]">inspiration</span>
          </h2>

          {/* View All Button */}
          <button className="flex items-center gap-2.5 bg-[#2979FF] text-white border-none rounded-[10px] px-6 py-3.5 text-sm font-semibold cursor-pointer whitespace-nowrap transition-all duration-200 hover:bg-[#1a65e0] hover:scale-105">
            View All
            <ArrowIcon />
          </button>
        </div>

        {/* Horizontal Scrollable Cards Container - 3 cards visible at a time */}
        <div
          ref={scrollContainerRef}
          className="flex gap-[30px] overflow-x-auto overflow-y-hidden pb-5 cursor-grab scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            scrollSnapType: "x mandatory",
          }}
          onMouseDown={(e) => {
            const container = e.currentTarget;
            let startX = e.pageX - container.offsetLeft;
            let scrollLeft = container.scrollLeft;

            const onMouseMove = (e: MouseEvent) => {
              const x = e.pageX - container.offsetLeft;
              const walk = (x - startX) * 2;
              container.scrollLeft = scrollLeft - walk;
            };

            const onMouseUp = () => {
              document.removeEventListener("mousemove", onMouseMove);
              document.removeEventListener("mouseup", onMouseUp);
              container.style.cursor = "grab";
            };

            container.style.cursor = "grabbing";
            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);
          }}
        >
          {blogPosts.map((post) => (
            <div
              key={post.id}
              onMouseEnter={() => setHovered(post.id)}
              onMouseLeave={() => setHovered(null)}
              className="cursor-pointer flex-none w-[calc(33.333%-20px)] min-w-[280px] md:min-w-[300px] lg:w-[calc(33.333%-20px)] scroll-snap-align-start"
              style={{
                scrollSnapAlign: "start",
              }}
            >
              {/* Image with fixed dimensions and border radius */}
              <div className="overflow-hidden rounded-t-[28.59px] mb-5 w-full h-[232px] relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover block transition-transform duration-450"
                  style={{
                    transform: hovered === post.id ? "scale(1.06)" : "scale(1)",
                  }}
                />
              </div>

              {/* Title */}
              <h3
                className="text-[17px] font-bold text-white mb-2.5 leading-[1.4] transition-colors duration-200"
                style={{
                  color: hovered === post.id ? "#2979FF" : "#fff",
                }}
              >
                {post.title}
              </h3>

              {/* Excerpt */}
              <p className="text-sm text-[#aaa] mb-5 leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>

              {/* Border before Read More button */}
              <div className="h-px bg-white/10 mb-5 w-full" />

              {/* Read More */}
              <a
                href="#"
                className="inline-flex items-center gap-2 text-[#2979FF] text-sm font-semibold no-underline transition-all duration-200 hover:gap-3"
              >
                Read More
                <ArrowIcon />
              </a>
            </div>
          ))}
        </div>

        <style>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scroll-snap-align-start {
            scroll-snap-align: start;
          }
        `}</style>
      </motion.section>
    </div>
  );
}
