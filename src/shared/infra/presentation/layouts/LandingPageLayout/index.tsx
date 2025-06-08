import { LandingPageLayoutProps } from "./types";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const LandingPageLayout = ({ children }: LandingPageLayoutProps) => {
  return (
    <div className="flex min-h-dvh w-full flex-col justify-between">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default LandingPageLayout;
