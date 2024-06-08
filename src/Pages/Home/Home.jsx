
import Step from "./Component/How it's work/Step";
 
import OurFeatures from "./Component/Our Feature/OurFeatures";
import Slider from "./Component/Slider";
import TopEarn from "./Top Earning/TopEarn";

 

const Home = () => {
    return (
        <div>
             <Slider></Slider>
             <OurFeatures></OurFeatures>
            <Step></Step>
            <TopEarn></TopEarn>
        </div>
    );
};

export default Home;