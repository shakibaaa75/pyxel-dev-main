import HeroSection from "../homeComponents/HeroSection";
import TrustedBySection from "../homeComponents/TrustedBySection";
import ServicesSection from "../homeComponents/ServicesSection";
import PortfolioSection from "../homeComponents/PortfolioSection";
import ToolsSection from "../homeComponents/ToolsSection";
import MethodologyComponent from "../homeComponents/MethodologyComponent";

import ProudMoments from "../homeComponents/ProudMoments";
import CreativeDesignsSection from "../homeComponents/CreativeDesignsSection";
import TeamSection from "../homeComponents/TeamSection";
import TestimonialSection from "../homeComponents/TestimonialSection";
import BlogComponent from "../homeComponents/BlogComponent";

const HomePage = () => {
  return (
    <>
      <HeroSection />
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
    </>
  );
};

export default HomePage;
