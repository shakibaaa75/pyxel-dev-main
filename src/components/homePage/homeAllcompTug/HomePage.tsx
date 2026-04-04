import { lazy, Suspense } from "react";
import HeroSection from "../homeComponents/HeroSection";

// Lazy load everything below the fold
const TrustedBySection = lazy(
  () => import("../homeComponents/TrustedBySection"),
);
const ServicesSection = lazy(() => import("../homeComponents/ServicesSection"));
const PortfolioSection = lazy(
  () => import("../homeComponents/PortfolioSection"),
);
const ToolsSection = lazy(() => import("../homeComponents/ToolsSection"));
const MethodologyComponent = lazy(
  () => import("../homeComponents/MethodologyComponent"),
);
const ProudMoments = lazy(() => import("../homeComponents/ProudMoments"));
const CreativeDesignsSection = lazy(
  () => import("../homeComponents/CreativeDesignsSection"),
);
const TeamSection = lazy(() => import("../homeComponents/TeamSection"));
const TestimonialSection = lazy(
  () => import("../homeComponents/TestimonialSection"),
);
const BlogComponent = lazy(() => import("../homeComponents/BlogComponent"));

const HomePage = () => {
  return (
    <>
      {/* Hero is eager — it's the LCP element */}
      <HeroSection />

      {/* All below-fold sections deferred until after hero renders */}
      <Suspense fallback={null}>
        <TrustedBySection className="bg-[#161616]" />
        <ServicesSection />
        <PortfolioSection />
        <ToolsSection />
        <MethodologyComponent />
        <ProudMoments className="bg-[#161616]" />
        <CreativeDesignsSection className="bg-[#161616]" />
        <TeamSection showAll={true} />
        <TestimonialSection />
        <BlogComponent />
      </Suspense>
    </>
  );
};

export default HomePage;
