import PricingPage from "./PricingPage";
import CreativeDesignsSection from "../homePage/homeComponents/CreativeDesignsSection";
import ToolsSection from "../homePage/homeComponents/ToolsSection";

const PricingAllsec = () => {
  return (
    <>
      <PricingPage />
      <CreativeDesignsSection className="bg-[#111111]" />
      <ToolsSection backgroundColor="#111111" />
    </>
  );
};

export default PricingAllsec;
