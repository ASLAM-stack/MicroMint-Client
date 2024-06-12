import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../../Component/SectionTitle";
import { TiDelete } from "react-icons/ti";
import Swal from "sweetalert2";
import useAuth from "../../../../Hooks/useAuth";
 

const CheckoutForm = () => {
  const [error, setError] = useState();
  const [clientSecret,setClientSecret] = useState('')
  const [transactionId,setTransactionId] = useState('')
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth()
  const { data: cart = [], refetch } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/cart/${user?.email}`);
      return res.data;
    },
  });
  console.log(cart);
  const totalPrice = cart?.reduce((total, item) => total + item.price, 0);
  const totalCoins = cart?.reduce((total, item) => total + item.coins, 0);
  console.log(totalPrice);
    useEffect(() => {
      axiosSecure.post('/create-payment-intent',{price:totalPrice})
      .then(res =>{
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret)
      })
    },[axiosSecure,totalPrice])
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setError(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setError("");
    }
    //confirm payment
    const {paymentIntent,error:confirmError} = await stripe.confirmCardPayment(clientSecret,{
      payment_method:{
        card:card,
        billing_details:{
          email:user?.email || 'anonymus',
          name:user?.displayName || 'anonymus'
        }
      }
    })
    if (confirmError) {
      console.log("confirm error");
    }
    else{
      console.log("paymentIntent",paymentIntent);
      if (paymentIntent.status === 'succeeded') {
        console.log('transation id:',paymentIntent.id);
        setTransactionId(paymentIntent.id)
        const payment = {
          transactionId:paymentIntent.id,
          email:user?.email,
          price:totalPrice,
          date:new Date(),
          cardId:cart.map(item => item._id),
        }
        const res = await axiosSecure.post('/payment',payment)
        console.log(res.data);
      }
    }
  };
  const handleDelete = async (id) => {
    console.log(id);
    const res = await axiosSecure.delete(`/cart/${id}`);
    console.log(res.data);
    if (res.data.deletedCount > 0) {
      refetch();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Order has been deleted",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <div>
      <div>
        <SectionTitle
          subHeading={"Buy Now"}
          heading={"all order"}
        ></SectionTitle>
        <div className="mt-10 mb-10">
        <div className="stats shadow">
  
  <div className="stat">
    <div className="stat-title">Total Cost</div>
    <div className="stat-value">{totalPrice} $</div>
  </div>
  
</div>
          {cart?.length === 0 ? (
            <div className="text-center text-2xl">
              <h1>No Order</h1>
              <p>Please Order Now</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table table-xs">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {cart?.map((item, index) => (
                    <tr key={item._id}>
                      <th>{index + 1}</th>
                      <td>{item.heading}</td>
                      <td>{item.price}</td>
                      <td>
                        {" "}
                        <TiDelete
                          onClick={() => handleDelete(item._id)}
                          className="text-orange-400 text-2xl cursor-pointer"
                        />{" "}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-primary my-4"
          type="submit"
          disabled={!stripe }
        >
          Pay
        </button>
        <p className="text-red-600">{error}</p>
        {
          transactionId && <p className="text-green-500">You Transaction id:{transactionId}</p>
        }
      </form>
    </div>
  );
};

export default CheckoutForm;
