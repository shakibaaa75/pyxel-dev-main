import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

// Skeleton loader
const PageSkeleton = () => (
  <div className="min-h-screen bg-black pt-32 px-8">
    <div className="max-w-[1400px] mx-auto space-y-6">
      <div className="h-12 w-3/4 bg-gray-800 animate-pulse rounded-xl" />
      <div className="h-4 w-1/2 bg-gray-800 animate-pulse rounded" />
      <div className="h-4 w-2/3 bg-gray-800 animate-pulse rounded" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-gray-900 rounded-xl p-6 border border-gray-800 space-y-4"
          >
            <div className="h-48 bg-gray-800 animate-pulse rounded-lg" />
            <div className="h-6 w-3/4 bg-gray-800 animate-pulse rounded" />
            <div className="h-4 w-full bg-gray-800 animate-pulse rounded" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Lazy load pages
const HomePage = lazy(
  () => import("./components/homePage/homeAllcompTug/HomePage"),
);
const AboutPage = lazy(() => import("./components/about/AboutPage"));
const ServicesPage = lazy(() => import("./components/services/ServicesPage"));
const BlogsPage = lazy(() => import("./components/blogs/BlogsPage"));
const FaqPage = lazy(() => import("./components/faq/FaqPage"));
const ContactPage = lazy(() => import("./components/contact/ContactPage"));

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
};

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <main className="min-h-screen">
        <Suspense fallback={<PageSkeleton />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route
              path="*"
              element={
                <div className="min-h-screen bg-black text-white flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-6xl font-bold text-[#2A7DFF] mb-4">
                      404
                    </h1>
                    <p className="text-gray-400">Page not found</p>
                  </div>
                </div>
              }
            />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
