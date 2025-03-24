import { TokenValidationLayoutProps } from "./types";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

const TokenValidationPageLayout = ({ children }: TokenValidationLayoutProps) => {
  return (
    <div className="flex min-h-dvh w-full flex-col justify-between">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default TokenValidationPageLayout;