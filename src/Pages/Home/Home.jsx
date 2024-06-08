
import Step from "./Component/How it's work/Step";
 
import OurFeatures from "./Component/Our Feature/OurFeatures";
import Review from "./Component/Review/Review";
import Slider from "./Component/Slider";
import TopEarn from "./Top Earning/TopEarn";

 

const Home = () => {
    return (
        <div>
             <Slider></Slider>
             <OurFeatures></OurFeatures>
            <Step></Step>
            <TopEarn></TopEarn>
            <Review></Review>
        </div>
    );
};

export default Home;