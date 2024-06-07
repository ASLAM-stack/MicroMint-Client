import SectionTitle from "../../../../Component/SectionTitle";
import StepClient from "./StepClient";
import StepWorker from "./StepsWorker";

 

const Step = () => {
    return (
        <div id="how_It_Work" className="container">
            <div className="mt-24">
                <SectionTitle subHeading={'Explore Now'} heading={"How it's work"}></SectionTitle>
               <div className="grid md:grid-cols-2 grid-cols-1 gap-5 p-4">
               <div>
                <h1 className="text-2xl font-semibold">Steps Of <span className="text-[#5bbb7b]">Freelancer</span></h1>
                    <StepWorker></StepWorker>
                </div>
                <div>
                    <h1 className="text-2xl font-semibold">Steps Of <span className="text-[#5bbb7b]">Client</span></h1>
                    <StepClient></StepClient>
                </div>
               </div>
            </div>
        </div>
    );
};

export default Step;