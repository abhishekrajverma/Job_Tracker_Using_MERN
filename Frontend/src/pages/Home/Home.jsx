import HeroSection from "./HeroSection";
import Footer from "../../components/footer";
import Header from "../../components/header";
import PopularCategories from "./PopularCategories";
import HowItWorks from "./HowItsWork";

export default function home() {
  return (
    <div data-theme="acid">
      <Header />
      <HeroSection />
      <HowItWorks />
      <Footer />
    </div>
  );
}
