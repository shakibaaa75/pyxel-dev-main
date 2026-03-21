import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom"; // ← NEW
import { blogPosts } from "../../data/BlogPost"; // ← NEW

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
          <Link
            to="/blogs"
            className="flex items-center gap-2.5 bg-[#2979FF] text-white border-none rounded-[10px] px-6 py-3.5 text-sm font-semibold cursor-pointer whitespace-nowrap transition-all duration-200 hover:bg-[#1a65e0] hover:scale-105 no-underline"
          >
            View All
            <ArrowIcon />
          </Link>
        </div>

        {/* Horizontal Scrollable Cards */}
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
              className="flex-none w-[calc(33.333%-20px)] min-w-[280px] md:min-w-[300px]"
              style={{ scrollSnapAlign: "start" }}
            >
              {/* Image */}
              <Link to={`/blogs/${post.slug}`} className="block">
                <div className="overflow-hidden rounded-t-[28.59px] mb-5 w-full h-[232px]">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover block transition-transform duration-450"
                    style={{
                      transform:
                        hovered === post.id ? "scale(1.06)" : "scale(1)",
                    }}
                  />
                </div>
              </Link>

              {/* Title */}
              <h3
                className="text-[17px] font-bold mb-2.5 leading-[1.4] transition-colors duration-200"
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

              {/* Divider */}
              <div className="h-px bg-white/10 mb-5 w-full" />

              {/* Read More — now a Link */}
              <Link
                to={`/blogs/${post.slug}`}
                className="inline-flex items-center gap-2 text-[#2979FF] text-sm font-semibold no-underline transition-all duration-200 hover:gap-3"
              >
                Read More
                <ArrowIcon />
              </Link>
            </div>
          ))}
        </div>

        <style>{`
          .scrollbar-hide::-webkit-scrollbar { display: none; }
          .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
      </motion.section>
    </div>
  );
}
