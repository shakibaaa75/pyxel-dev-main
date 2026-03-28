import AboutusFirstsec from "./Aboutusfirstsec";
import TrustedBySection from "../homePage/homeComponents/TrustedBySection";
import CreativeDesignsSection from "../homePage/homeComponents/CreativeDesignsSection";
import AboutusSecondsec from "./Aboutussecondsec";
import ProudMoments from "../homePage/homeComponents/ProudMoments";
import TeamSection from "../homePage/homeComponents/TeamSection";
import Button from "../button";
import { ArrowRightIcon } from "lucide-react";
import TestimonialsSection from "./TestimonialsSection";
import FAQAccordion from "./FAQAccordion";
import { Link } from "react-router-dom"; // Add this import

const AboutPage = () => {
  // Custom header with button
  const customTeamHeader = (
    <div className="mb-8 sm:mb-10 lg:mb-12">
      <div className=" p-6 sm:p-8 lg:p-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="space-y-2 sm:space-y-3">
            <div className="font-['Montserrat'] font-semibold text-white text-sm">
              Our Team
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              The minds behind the <span className="text-[#2A7DFF]">magic</span>
            </h2>
          </div>

          <Link to="/team">
            <Button
              size="default"
              variant="primary"
              className="w-full cursor-pointer sm:w-auto"
            >
              Join Our Team
              <ArrowRightIcon className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <AboutusFirstsec />
      <TrustedBySection className="bg-[#111111]" gradientColor="#111111" />{" "}
      <CreativeDesignsSection className="bg-[#111111]" />
      <ProudMoments className="bg-[#111111]" />
      <AboutusSecondsec />
      <TeamSection
        limit={4}
        customHeader={customTeamHeader}
        showDefaultHeader={false}
        bgColor="#111111"
      />
      <TestimonialsSection />
      <FAQAccordion />
    </>
  );
};

export default AboutPage;
