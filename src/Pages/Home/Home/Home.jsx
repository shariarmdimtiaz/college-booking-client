import { Helmet } from "react-helmet";
import Banner from "./Banner";
import Statistics from "./Statistics";
import PopularCollege from "../PopularCollege/PopularCollege";
import Gallery from "../Gallery/Gallery";
import Research from "../Research/Research";
import Review from "./Review";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>College Booking | Home</title>
      </Helmet>
      <Banner></Banner>
      <PopularCollege></PopularCollege>
      <Gallery></Gallery>
      <Research></Research>
      <Review></Review>
      <Statistics></Statistics>
    </div>
  );
};

export default Home;
