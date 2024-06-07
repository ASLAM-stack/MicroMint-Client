
import StepClient from "./Component/How it's work/StepClient";
import { StepWorker } from "./Component/How it's work/StepsWorker";
import OurFeatures from "./Component/Our Feature/OurFeatures";
import Slider from "./Component/Slider";

 

const Home = () => {
    return (
        <div>
             <Slider></Slider>
             <OurFeatures></OurFeatures>
             <StepWorker></StepWorker>
             <StepClient></StepClient>
        </div>
    );
};

export default Home;