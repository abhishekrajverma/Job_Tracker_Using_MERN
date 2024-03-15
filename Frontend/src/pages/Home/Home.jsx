import HeroSection from "./HeroSection";
import Footer from "../../components/footer";
import Header from "../../components/header";
import PopularCategories from "../../components/Home/PopularCategories";

export default function home() {
  const categories = [
    {
      id: 1,
      title: "Graphics & Design",
      subTitle1: "305 Open Positions",
    },
    {
      id: 2,
      title: "Mobile App Development",
      subTitle2: "500 Open Positions",
    },
    {
      id: 3,
      title: "Frontend Web Development",
      subTitle3: "200 Open Positions",
    },
    {
      id: 4,
      title: "MERN STACK Development",
      subTitle: "1000+ Open Postions",
    },
    {
      id: 5,
      title: "Account & Finance",
      subTitle: "150 Open Positions",
    },
    {
      id: 6,
      title: "Artificial Intelligence",
      subTitle: "867 Open Positions",
    },
    {
      id: 7,
      title: "Video Animation",
      subTitle: "50 Open Positions",
    },
    {
      id: 8,
      title: "Game Development",
      subTitle: "80 Open Positions",
    },
  ];
  return (
    <div data-theme="acid">
      <Header />
      <HeroSection />
      <div className="flex justify-center items-center uppercase">
        <h1 className="text-4xl font-bold my-10">Popular Categories</h1>
      </div>
      <PopularCategories
        name="Night Job"
        picture="https://images.unsplash.com/photo-1431499012454-31a9601150c9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHBhcnQlMjB0aW1lJTIwam9ifGVufDB8fDB8fHww"
        subTitle={categories[0].subTitle1}
      />

      <Footer />
    </div>
  );
}
