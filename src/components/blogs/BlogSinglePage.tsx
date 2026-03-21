import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { blogPosts } from "../../data/BlogPost";
import type { BlogPost } from "../../data/BlogPost";

// Types
interface FormData {
  comment: string;
  name: string;
  email: string;
  website: string;
  saveInfo: boolean;
}

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

function QuoteIcon() {
  return (
    <svg
      width="28"
      height="22"
      viewBox="0 0 28 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 22V13.4C0 9.93333 0.9 7.06667 2.7 4.8C4.5 2.53333 7.13333 1.06667 10.6 0.399998L11.8 2.6C9.4 3.13333 7.56667 4.16667 6.3 5.7C5.03333 7.23333 4.4 9 4.4 11H8.8V22H0ZM16.4 22V13.4C16.4 9.93333 17.3 7.06667 19.1 4.8C20.9 2.53333 23.5333 1.06667 27 0.399998L28.2 2.6C25.8 3.13333 23.9667 4.16667 22.7 5.7C21.4333 7.23333 20.8 9 20.8 11H25.2V22H16.4Z"
        fill="white"
        fillOpacity="0.9"
      />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="9" cy="9" r="9" fill="#2979FF" fillOpacity="0.15" />
      <path
        d="M5.5 9L7.8 11.3L12.5 6.5"
        stroke="#2979FF"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SocialIcon({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    Instagram: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
    Facebook: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
    YouTube: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
      </svg>
    ),
    LinkedIn: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  };
  return icons[name] || null;
}

export default function BlogSinglePage() {
  const { slug } = useParams<{ slug: string }>();
  const [formData, setFormData] = useState<FormData>({
    comment: "",
    name: "",
    email: "",
    website: "",
    saveInfo: false,
  });

  // Find the post by slug
  const post = blogPosts.find((p) => p.slug === slug);

  useEffect(() => {
    console.log("BlogSinglePage loaded");
    console.log("Slug:", slug);
    console.log("Post found:", !!post);
  }, [slug, post]);

  // If post not found
  if (!post) {
    return (
      <div className="bg-[#161616] min-h-screen flex items-center justify-center">
        <div className="text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Post Not Found</h2>
          <p className="text-[#aaa] mb-4">
            The blog post you're looking for doesn't exist.
          </p>
          <Link
            to="/blogs"
            className="px-6 py-3 bg-[#2979FF] text-white rounded-lg inline-block"
          >
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#161616] min-h-screen pt-20">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title Section */}
        <div className="bg-[#1e1e1e] rounded-[20px] p-8 sm:p-10 mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>{post.date}</span>
            <span>•</span>
            <span className="text-[#2979FF]">{post.category}</span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="rounded-[20px] overflow-hidden mb-8 h-[300px] md:h-[420px]">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="space-y-6">
          <p className="text-gray-300 text-base leading-relaxed">
            {post.content.intro1}
          </p>
          <p className="text-gray-300 text-base leading-relaxed">
            {post.content.intro2}
          </p>

          {/* Quote */}
          <div className="bg-[#2979FF] rounded-[16px] p-7">
            <div className="flex gap-4">
              <QuoteIcon />
              <p className="text-white text-base leading-relaxed font-medium">
                {post.content.quote}
              </p>
            </div>
          </div>

          <p className="text-gray-300 text-base leading-relaxed">
            {post.content.body}
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-white">
            {post.content.subheading}
          </h2>
          <p className="text-gray-300 text-base leading-relaxed">
            {post.content.subIntro}
          </p>

          {/* Bullets */}
          <ul className="space-y-3">
            {post.content.bullets.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-300">
                <span className="mt-0.5">
                  <CheckCircleIcon />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <p className="text-gray-300 text-base leading-relaxed">
            {post.content.closing}
          </p>

          <div className="h-px bg-white/10 my-6" />

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-white font-semibold">Tags:</span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="bg-[#2979FF] text-white text-xs px-4 py-1.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex gap-3 pt-4">
            <a
              href="#"
              className="text-gray-400 hover:text-[#2979FF] transition-colors"
            >
              <SocialIcon name="Instagram" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-[#2979FF] transition-colors"
            >
              <SocialIcon name="Facebook" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-[#2979FF] transition-colors"
            >
              <SocialIcon name="YouTube" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-[#2979FF] transition-colors"
            >
              <SocialIcon name="LinkedIn" />
            </a>
          </div>
        </div>

        {/* Comment Form */}
        <div className="mt-12 mb-16">
          <h3 className="text-white text-xl font-bold mb-2">Leave a Reply</h3>
          <p className="text-gray-500 text-sm mb-6">
            Your email address will not be published. Required fields are marked
            *
          </p>

          <div className="space-y-4">
            <textarea
              rows={5}
              placeholder="Comment *"
              value={formData.comment}
              onChange={(e) =>
                setFormData({ ...formData, comment: e.target.value })
              }
              className="w-full bg-[#1e1e1e] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#2979FF] transition-colors placeholder:text-gray-500"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Name *"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="bg-[#1e1e1e] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#2979FF] transition-colors placeholder:text-gray-500"
              />
              <input
                type="email"
                placeholder="Email *"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="bg-[#1e1e1e] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#2979FF] transition-colors placeholder:text-gray-500"
              />
              <input
                type="text"
                placeholder="Website"
                value={formData.website}
                onChange={(e) =>
                  setFormData({ ...formData, website: e.target.value })
                }
                className="bg-[#1e1e1e] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#2979FF] transition-colors placeholder:text-gray-500"
              />
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.saveInfo}
                onChange={(e) =>
                  setFormData({ ...formData, saveInfo: e.target.checked })
                }
                className="accent-[#2979FF] w-4 h-4"
              />
              <span className="text-gray-400 text-sm">
                Save my name, email, and website in this browser for the next
                time I comment.
              </span>
            </label>

            <button className="bg-[#2979FF] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#1a65e0] transition-all inline-flex items-center gap-2 mt-2">
              Post Comment <ArrowIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
