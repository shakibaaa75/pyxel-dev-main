import { useState } from "react";
import { Link } from "react-router-dom";
import { blogPosts } from "../../data/BlogPost";

function ArrowIcon() {
  return (
    <svg
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

export default function BlogsPage() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="bg-[#111111] min-h-screen">
      {/* Hero / Banner — styled like BlogSinglePage title card */}
      <div className="pt-24 pb-0 px-4 sm:px-8 lg:px-16">
        <div className="max-w-[1300px] mx-auto">
          <div className="bg-[#1e1e1e] rounded-[20px] p-8 sm:p-10 mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Latest <span className="text-[#2979FF]">blog</span>
            </h1>
            {/* Date • Category style breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-[#2979FF]">blog</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="max-w-[1300px] mx-auto px-4 sm:px-8 lg:px-16 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              onMouseEnter={() => setHovered(post.id)}
              onMouseLeave={() => setHovered(null)}
              className="bg-[#1a1a1a] rounded-[20px] overflow-hidden flex flex-col transition-transform duration-300 hover:-translate-y-1"
            >
              {/* Image */}
              <Link
                to={`/blogs/${post.slug}`}
                className="block overflow-hidden"
              >
                <div className="w-full h-[220px] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500"
                    style={{
                      transform:
                        hovered === post.id ? "scale(1.06)" : "scale(1)",
                    }}
                  />
                </div>
              </Link>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                {/* Title */}
                <Link to={`/blogs/${post.slug}`} className="no-underline">
                  <h3
                    className="text-[17px] font-bold leading-[1.45] mb-5 transition-colors duration-200"
                    style={{
                      color: hovered === post.id ? "#2979FF" : "#ffffff",
                    }}
                  >
                    {post.title}
                  </h3>
                </Link>

                {/* Divider */}
                <div className="h-px bg-white/10 mb-4 w-full" />

                {/* Footer Row */}
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-gray-500 text-sm">{post.date}</span>
                  <Link
                    to={`/blogs/${post.slug}`}
                    className="inline-flex items-center gap-2 text-[#2979FF] text-sm font-semibold no-underline transition-all duration-200 hover:gap-3"
                  >
                    Read More
                    <span className="bg-[#2979FF] text-white rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0">
                      <ArrowIcon />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
