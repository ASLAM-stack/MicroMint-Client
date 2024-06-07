
import Step from "./Component/How it's work/Step";
 
import OurFeatures from "./Component/Our Feature/OurFeatures";
import Slider from "./Component/Slider";

 

const Home = () => {
    return (
        <div>
             <Slider></Slider>
             <OurFeatures></OurFeatures>
            <Step></Step>
        </div>
    );
};

export default Home;