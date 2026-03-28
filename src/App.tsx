import { Suspense, lazy, useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Link,
} from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

const PageSkeleton = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="min-h-screen bg-black pt-20 sm:pt-32 px-4 sm:px-8">
      <div className="max-w-[1400px] mx-auto space-y-6">
        <div className="h-8 sm:h-12 w-3/4 bg-gray-800 animate-pulse rounded-xl" />
        <div className="h-3 sm:h-4 w-1/2 bg-gray-800 animate-pulse rounded" />
        <div className="h-3 sm:h-4 w-2/3 bg-gray-800 animate-pulse rounded" />
        <div
          className={`grid grid-cols-1 ${!isMobile ? "md:grid-cols-3" : ""} gap-4 sm:gap-6 mt-8 sm:mt-12`}
        >
          {[...Array(isMobile ? 2 : 3)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-800 space-y-4"
            >
              <div className="h-40 sm:h-48 bg-gray-800 animate-pulse rounded-lg" />
              <div className="h-5 sm:h-6 w-3/4 bg-gray-800 animate-pulse rounded" />
              <div className="h-3 sm:h-4 w-full bg-gray-800 animate-pulse rounded" />
              <div className="h-3 sm:h-4 w-2/3 bg-gray-800 animate-pulse rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const HomePage = lazy(
  () => import("./components/homePage/homeAllcompTug/HomePage"),
);
const AboutPage = lazy(() => import("./components/about/AboutPage"));
const ServicesPage = lazy(() => import("./components/services/ServicesPage"));
const ServiceSinglePage = lazy(
  () => import("./components/services/Servicesinglepage"),
);
const BlogsPage = lazy(() => import("./components/blogs/BlogsPage"));
const BlogSinglePage = lazy(() => import("./components/blogs/BlogSinglePage"));
const FaqPage = lazy(() => import("./components/faq/FaqPage"));
const ContactPage = lazy(() => import("./components/contact/ContactPage"));
const PortfolioArchivePage = lazy(
  () => import("./components/portfolio/Portfolioarchivepage"),
);
const PortfolioSinglePage = lazy(
  () => import("./components/portfolio/Portfoliosinglepage"),
);
const TeamPage = lazy(() => import("./components/team/TeamPgae"));
const PricingAllsec = lazy(() => import("./components/pricing/PricingAllsec"));

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
};

const PrefetchLinks = () => {
  useEffect(() => {
    if ("connection" in navigator && (navigator as any).connection?.saveData)
      return;
    ["/blogs", "/services", "/team", "/pricing"].forEach((link) => {
      const tag = document.createElement("link");
      tag.rel = "prefetch";
      tag.href = link;
      document.head.appendChild(tag);
    });
  }, []);
  return null;
};

const App = () => {
  useEffect(() => {
    if (!document.querySelector('meta[name="viewport"]')) {
      const meta = document.createElement("meta");
      meta.name = "viewport";
      meta.content =
        "width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes";
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <BrowserRouter>
      <PrefetchLinks />
      <ScrollToTop />
      <Header />
      <main className="min-h-screen">
        <Suspense fallback={<PageSkeleton />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:slug" element={<ServiceSinglePage />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/blogs/:slug" element={<BlogSinglePage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/portfolio" element={<PortfolioArchivePage />} />
            <Route path="/portfolio/:slug" element={<PortfolioSinglePage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/pricing" element={<PricingAllsec />} />
            <Route
              path="*"
              element={
                <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
                  <div className="text-center">
                    <h1 className="text-4xl sm:text-6xl font-bold text-[#2A7DFF] mb-4">
                      404
                    </h1>
                    <p className="text-gray-400 text-sm sm:text-base">
                      Page not found
                    </p>
                    <Link
                      to="/"
                      className="inline-block mt-6 px-6 py-3 bg-[#2A7DFF] text-white rounded-lg hover:bg-[#1e5fcc] transition-colors"
                    >
                      Go Back Home
                    </Link>
                  </div>
                </div>
              }
            />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <style>{`
        * { -webkit-tap-highlight-color: transparent; }
        @media (max-width: 768px) {
          body { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; text-rendering: optimizeLegibility; }
          input, select, textarea { font-size: 16px !important; }
        }
        html { scroll-behavior: smooth; }
        @media (max-width: 768px) { html { scroll-behavior: auto; } }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
        }
      `}</style>
    </BrowserRouter>
  );
};

export default App;
