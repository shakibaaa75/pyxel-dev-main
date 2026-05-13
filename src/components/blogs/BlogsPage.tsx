// import { useRef, useEffect, useState } from "react";
// import { motion, useInView } from "framer-motion";
// import { Link } from "react-router-dom";
// import { blogPosts } from "../../data/BlogPost";
// import Breadcrumb from "../Breadcrumb/Breadcrumb";

// function ArrowIcon({ className = "" }: { className?: string }) {
//   return (
//     <svg
//       className={className}
//       width="16"
//       height="16"
//       viewBox="0 0 16 16"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path
//         d="M3 8H13M13 8L9 4M13 8L9 12"
//         stroke="currentColor"
//         strokeWidth="1.8"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//     </svg>
//   );
// }

// const smoothEase: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

// function BlogCard({
//   post,
//   index,
//   hasAnimated,
// }: {
//   post: any;
//   index: number;
//   hasAnimated: boolean;
// }) {
//   const [isHovered, setIsHovered] = useState(false);
//   const [imageLoaded, setImageLoaded] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   return (
//     <Link
//       to={`/blogs/${post.slug}`}
//       className="block no-underline"
//       onMouseEnter={() => !isMobile && setIsHovered(true)}
//       onMouseLeave={() => !isMobile && setIsHovered(false)}
//     >
//       <motion.div
//         initial={{ opacity: 0, y: 50, scale: 0.95 }}
//         animate={
//           hasAnimated
//             ? { opacity: 1, y: 0, scale: 1 }
//             : { opacity: 0, y: 50, scale: 0.95 }
//         }
//         transition={{
//           duration: 0.6,
//           delay: hasAnimated ? index * 0.08 + 0.3 : 0,
//           ease: smoothEase,
//         }}
//         className={`
//           bg-[#1a1a1a] rounded-[20px] overflow-hidden flex flex-col
//           transition-all duration-500 ease-out cursor-pointer
//           ${!isMobile && "hover:-translate-y-1"}
//         `}
//       >
//         {/* Image */}
//         <div className="block overflow-hidden">
//           <div className="w-full h-[200px] md:h-[220px] overflow-hidden bg-gray-800 relative">
//             {!imageLoaded && (
//               <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-700 animate-pulse" />
//             )}
//             <motion.img
//               src={post.image}
//               alt={post.title}
//               className={`w-full h-full object-cover transition-all duration-700 ease-out
//                 ${imageLoaded ? "opacity-100" : "opacity-0"}
//               `}
//               style={{
//                 transform: isHovered && !isMobile ? "scale(1.06)" : "scale(1)",
//               }}
//               loading="lazy"
//               onLoad={() => setImageLoaded(true)}
//               onError={() => {
//                 console.error("Image failed to load:", post.image);
//                 setImageLoaded(true);
//               }}
//               initial={{ scale: 1.1 }}
//               animate={hasAnimated ? { scale: 1 } : { scale: 1.1 }}
//               transition={{
//                 duration: 0.7,
//                 delay: hasAnimated ? index * 0.08 + 0.35 : 0,
//                 ease: smoothEase,
//               }}
//             />
//           </div>
//         </div>

//         {/* Content */}
//         <motion.div
//           className="p-4 md:p-6 flex flex-col flex-1"
//           initial={{ y: 20, opacity: 0 }}
//           animate={hasAnimated ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
//           transition={{
//             duration: 0.5,
//             delay: hasAnimated ? index * 0.08 + 0.45 : 0,
//             ease: smoothEase,
//           }}
//         >
//           {/* Title */}
//           <h3
//             className="text-[15px] md:text-[17px] font-bold leading-[1.45] mb-4 md:mb-5 transition-colors duration-300 line-clamp-2"
//             style={{
//               color: !isMobile && isHovered ? "#2979FF" : "#ffffff",
//             }}
//           >
//             {post.title}
//           </h3>

//           {/* Divider */}
//           <div className="h-px bg-white/10 mb-3 md:mb-4 w-full" />

//           {/* Footer Row */}
//           <div className="flex items-center justify-between mt-auto">
//             <span className="text-gray-500 text-xs md:text-sm">
//               {post.date}
//             </span>
//             <div className="group inline-flex items-center gap-1 md:gap-2 text-[#2979FF] text-xs md:text-sm font-semibold transition-all duration-300">
//               Read More
//               <motion.span
//                 className={`
//                   rounded-full w-6 h-6 md:w-7 md:h-7 flex items-center justify-center flex-shrink-0
//                   transition-all duration-300
//                   ${!isMobile && isHovered ? "bg-[#2979FF] rotate-0" : "bg-white -rotate-45"}
//                 `}
//                 whileHover={!isMobile ? { scale: 1.1 } : {}}
//                 whileTap={!isMobile ? { scale: 0.95 } : {}}
//               >
//                 <ArrowIcon
//                   className={`w-3 h-3 md:w-4 md:h-4 transition-colors duration-300 ${
//                     !isMobile && isHovered ? "text-white" : "text-[#2979FF]"
//                   }`}
//                 />
//               </motion.span>
//             </div>
//           </div>
//         </motion.div>
//       </motion.div>
//     </Link>
//   );
// }

// export default function BlogsPage() {
//   const [hasAnimated, setHasAnimated] = useState<boolean>(false);
//   const sectionRef = useRef<HTMLDivElement>(null);
//   const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

//   useEffect(() => {
//     if (isInView && !hasAnimated) {
//       setHasAnimated(true);
//     }
//   }, [isInView, hasAnimated]);

//   // Custom breadcrumb items for blogs page
//   const breadcrumbItems = [
//     { label: "Home", path: "/", isLast: false },
//     { label: "Blogs", path: "/blogs", isLast: true },
//   ];

//   return (
//     <div
//       ref={sectionRef}
//       className="relative w-full bg-[#111111] min-h-screen font-['Montserrat'] overflow-x-hidden"
//     >
//       <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10 pt-8 sm:pt-10 pb-12 sm:pb-16">
//         {/* Header Section - Now matching BlogSinglePage design */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
//           transition={{ duration: 0.6, ease: smoothEase }}
//           className="bg-[#1e1e1e] rounded-[20px] p-6 sm:p-8 lg:p-10 mb-6 sm:mb-8"
//         >
//           {/* Main Heading */}
//           <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 leading-tight">
//             <span className="text-white">Latest </span>
//             <span className="text-[#2A7DFF]">blog</span>
//           </h1>
//           {/* Breadcrumb under title - same as BlogSinglePage */}
//           <div className="mt-2">
//             <Breadcrumb customItems={breadcrumbItems} />
//           </div>
//         </motion.div>

//         {/* Blogs Grid with staggered animations like TeamSection */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
//           {blogPosts.map((post, index) => (
//             <BlogCard
//               key={post.id}
//               post={post}
//               index={index}
//               hasAnimated={hasAnimated}
//             />
//           ))}
//         </div>
//       </div>

//       <style>{`
//         @media (max-width: 768px) {
//           .line-clamp-2 {
//             display: -webkit-box;
//             -webkit-line-clamp: 2;
//             -webkit-box-orient: vertical;
//             overflow: hidden;
//           }

//           /* Improve touch targets */
//           a, button {
//             cursor: pointer;
//             -webkit-tap-highlight-color: transparent;
//           }

//           /* Disable hover effects on mobile */
//           .hover\\:-translate-y-1:hover {
//             transform: none !important;
//           }
//         }

//         /* Performance optimization for animations */
//         .opacity-0 {
//           opacity: 0;
//         }

//         .opacity-100 {
//           opacity: 1;
//         }

//         .translate-y-0 {
//           transform: translateY(0);
//         }

//         .translate-y-4 {
//           transform: translateY(1rem);
//         }
//       `}</style>
//     </div>
//   );
// }
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { fetchBlogs, type BlogPost } from "../../api/blogs";
import Breadcrumb from "../Breadcrumb/Breadcrumb";

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

const smoothEase: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <Link
      to={`/blogs/${post.slug}`}
      className="block no-underline"
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
    >
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.6,
          delay: index * 0.08 + 0.3,
          ease: smoothEase,
        }}
        className={`
          bg-[#1a1a1a] rounded-[20px] overflow-hidden flex flex-col 
          transition-all duration-500 ease-out cursor-pointer
          ${!isMobile && "hover:-translate-y-1"}
        `}
      >
        <div className="block overflow-hidden">
          <div className="w-full h-[200px] md:h-[220px] overflow-hidden bg-gray-800 relative">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-700 animate-pulse" />
            )}
            <motion.img
              src={post.image}
              alt={post.title}
              className={`w-full h-full object-cover transition-all duration-700 ease-out
                ${imageLoaded ? "opacity-100" : "opacity-0"}
              `}
              style={{
                transform: isHovered && !isMobile ? "scale(1.06)" : "scale(1)",
              }}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageLoaded(true)}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 0.7,
                delay: index * 0.08 + 0.35,
                ease: smoothEase,
              }}
            />
          </div>
        </div>

        <motion.div
          className="p-4 md:p-6 flex flex-col flex-1"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: index * 0.08 + 0.45,
            ease: smoothEase,
          }}
        >
          <h3
            className="text-[15px] md:text-[17px] font-bold leading-[1.45] mb-4 md:mb-5 transition-colors duration-300 line-clamp-2"
            style={{
              color: !isMobile && isHovered ? "#2979FF" : "#ffffff",
            }}
          >
            {post.title}
          </h3>

          <div className="h-px bg-white/10 mb-3 md:mb-4 w-full" />

          <div className="flex items-center justify-between mt-auto">
            <span className="text-gray-500 text-xs md:text-sm">
              {post.date}
            </span>
            <div className="group inline-flex items-center gap-1 md:gap-2 text-[#2979FF] text-xs md:text-sm font-semibold transition-all duration-300">
              Read More
              <motion.span
                className={`
                  rounded-full w-6 h-6 md:w-7 md:h-7 flex items-center justify-center flex-shrink-0 
                  transition-all duration-300
                  ${!isMobile && isHovered ? "bg-[#2979FF] rotate-0" : "bg-white -rotate-45"}
                `}
              >
                <ArrowIcon
                  className={`w-3 h-3 md:w-4 md:h-4 transition-colors duration-300 ${
                    !isMobile && isHovered ? "text-white" : "text-[#2979FF]"
                  }`}
                />
              </motion.span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Link>
  );
}

export default function BlogsPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchBlogs()
      .then(setPosts)
      .catch((err) => {
        console.error("Failed to fetch blogs:", err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  const breadcrumbItems = [
    { label: "Home", path: "/", isLast: false },
    { label: "Blogs", path: "/blogs", isLast: true },
  ];

  if (loading) {
    return (
      <div className="bg-[#111111] min-h-screen flex items-center justify-center">
        <div className="text-white">Loading blogs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#111111] min-h-screen flex items-center justify-center">
        <div className="text-red-400 text-center px-4">
          <h2 className="text-2xl font-bold mb-4">Error Loading Blogs</h2>
          <p className="text-gray-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-[#2979FF] text-white rounded-lg hover:bg-[#1a65e0] transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={sectionRef}
      className="relative w-full bg-[#111111] min-h-screen font-['Montserrat'] overflow-x-hidden"
    >
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10 pt-8 sm:pt-10 pb-12 sm:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="bg-[#1e1e1e] rounded-[20px] p-6 sm:p-8 lg:p-10 mb-6 sm:mb-8"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 leading-tight">
            <span className="text-white">Latest </span>
            <span className="text-[#2A7DFF]">blog</span>
          </h1>
          <div className="mt-2">
            <Breadcrumb customItems={breadcrumbItems} />
          </div>
        </motion.div>

        {posts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-20"
          >
            <div className="text-gray-500 text-lg mb-4">No blog posts yet</div>
            <p className="text-gray-600 text-sm mb-6">
              Check back later for new content
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-[#2979FF] text-sm font-semibold hover:gap-3 transition-all"
            >
              <ArrowIcon className="rotate-180" />
              Back to Home
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {posts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
