import { PageLayout } from "components/layout/PageLayout";
import { HeroSection } from "components/features/Landing/HeroSection";
import { FeatureSection } from "components/features/Landing/FeatureSection";
import { GetStartedSection } from "components/features/Landing/GetStartedSection";

const Home: React.FC = (props) => {
  return (
    <PageLayout className={"bg-white w-full"}>
      <div className={"p-4 md:p-8 mx-auto max-w-screen-lg w-full"}>
        <HeroSection />
        <FeatureSection />
        <GetStartedSection />
      </div>
    </PageLayout>
  );
};

export default Home;
