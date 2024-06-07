import { GiTakeMyMoney } from "react-icons/gi";
import FeatureCard from "./FeatureCard";
import { SiCreatereactapp } from "react-icons/si";
import { LiaPeopleCarrySolid } from "react-icons/lia";
import { RiSecurePaymentLine } from "react-icons/ri";
import { MdSupportAgent } from "react-icons/md";
import { FaGift } from "react-icons/fa";
import SectionTitle from "../../../../Component/SectionTitle";
 
 

 

const OurFeatures = () => {
    return (
       <div id="feature" className="mt-24">
        <SectionTitle subHeading={'Join Us'} heading={"our Features"}></SectionTitle>
         <div className="container grid lg:grid-cols-3 md:grid-cols-2 gap-5 grid-cols-1 p-4 md:p-0">
            <FeatureCard icon={<GiTakeMyMoney />} title={'Earn Coins by Completing Tasks'} discription={'Earn Coins on MicroMint by completing tasks, allowing you to monetize your skills flexibly. Exchange coins for rewards or currency.'}></FeatureCard>
            <FeatureCard icon={<SiCreatereactapp />} title={'Create and Manage Tasks'} discription={'Create and manage tasks on Micromint: Streamline your freelance projects with easy task creation, assignment, and tracking.'}>
            </FeatureCard>
            <FeatureCard icon={<LiaPeopleCarrySolid />} title={'Best Quality Freelacers'} discription={'Micromint connects you with top-tier freelancers, ensuring high-quality work and reliability for your projects.'}></FeatureCard>
            <FeatureCard icon={<RiSecurePaymentLine />} title={'Secure Payments'} discription={'Secure Payments for Micromint ensures safe, seamless transactions, protecting freelancers and clients from fraud and disputes.'}></FeatureCard>
            <FeatureCard icon={<FaGift />} title={'Earn Rewaed'} discription={'Register on Micromint, the freelance marketplace, and earn rewards instantly upon registration.'}></FeatureCard>
            <FeatureCard icon={<MdSupportAgent />} title={'Support 24/7'} discription={'Round-the-clock support for Micromint, ensuring seamless assistance to freelancers and clients alike, fostering a thriving marketplace'}></FeatureCard>
        </div>
       </div>
    );
};

export default OurFeatures;