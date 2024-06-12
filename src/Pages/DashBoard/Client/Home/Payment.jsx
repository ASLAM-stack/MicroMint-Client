import SectionTitle from "../../../../Component/SectionTitle";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from "./CheckoutForm";
 
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Getway_Pk)

const Payment = () => {
    return (
        <div className="p-4">
            <SectionTitle subHeading={'Buy Now'} heading={'Add More Coins'}></SectionTitle>
            <div>
            <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
            </div>
        </div>
    );
};

export default Payment;