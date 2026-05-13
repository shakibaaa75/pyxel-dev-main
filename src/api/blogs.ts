const API_BASE = import.meta.env.VITE_API_URL 
const SITE_ID = import.meta.env.VITE_SITE_ID 

export interface BlogPost {
  id: string;
  slug: string;
  image: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  tags: string[];
  content: {
    body: string;
  };
}

export interface CMSBlogPost {
  id: string;
  siteId: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;  // Backend sends plain string, not object
  image: string;
  category: string;
  tags: string[];
  readTime: number;
  published: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// Transform CMS data to your frontend format
function transformPost(post: CMSBlogPost): BlogPost {
  return {
    id: post.id,
    slug: post.slug,
    image: post.image,
    title: post.title,
    excerpt: post.excerpt,
    date: new Date(post.publishedAt || post.createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    category: post.category,
    tags: post.tags || [],
    content: {
      body: post.content || post.excerpt || "",
    },
  };
}

export async function fetchBlogs(): Promise<BlogPost[]> {
  const res = await fetch(`${API_BASE}/api/blogs?siteId=${SITE_ID}`);
  if (!res.ok) throw new Error("Failed to fetch blogs");
  const data: CMSBlogPost[] = await res.json();
  return data.map(transformPost);
}

export async function fetchBlogBySlug(slug: string): Promise<BlogPost> {
  const res = await fetch(`${API_BASE}/api/blogs/${slug}?siteId=${SITE_ID}`);
  if (!res.ok) throw new Error("Blog not found");
  const data: CMSBlogPost = await res.json();
  return transformPost(data);
}