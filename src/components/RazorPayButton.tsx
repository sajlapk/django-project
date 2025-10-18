import axios from "axios";

interface RazorPayButtonProps {
  amount: number; // Razorpay expects money in paise
  eventName: string;
  buyer_name?: string | null;
  buyer_email?: string | null;
  onSuccess?: (paymentDetails: any) => void; // OPTIONAL
  disabled?: boolean; // OPTIONAL
}

function PaymentButton({ amount, eventName, buyer_name, buyer_email, onSuccess, disabled }: RazorPayButtonProps) {
  const handlePayment = async () => {
    if(disabled){
        // alert("Please fill all fields before proceeding to payment."); // DEBUG
        return;
    }
    
    // const { data: order } =  await axios.post('https://discipl-server.onrender.com/api/payments/create-order', { amount }); // This is used when running from github repo
    const { data: order } = await axios.post("http://localhost:8172/api/payments/create-order", { amount }); // This is used when running on localhost
    //console.log("order: " + order); // DEBUG

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, 
      amount: order.amount,
      currency: order.currency,
      order_id: order.id,
      name: "Discipl",
      description: `Payment for ${eventName}`,
      handler: function (response: any) {
        // alert("Payment successful: " + response.razorpay_payment_id); //DEBUG
        // console.log("Payment Response: ", response) // DEBUG

         // Call onSuccess callback if provided
        if(onSuccess){
            // console.log("onSuccess Response: ", response, order) // DEBUG
            onSuccess({response, order});
        }
    },
      prefill: {
        name: buyer_name || null,
        email: buyer_email || null
      },
      theme: { color: "#3399cc" },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  return( 
    (!disabled?
    <button 
        onClick={handlePayment}
        className="px-6 py-3 rounded-full font-semibold text-white bg-green-500 border border-green-500 hover:bg-white hover:text-green-500 transition-colors"
        >
        Proceed to Pay ₹{amount}
    </button>
    :
    <button 
        onClick={handlePayment}
        className="px-6 py-3 rounded-full font-semibold text-gray-600 bg-white-500 border border-gray-500"
        >
        Proceed to Pay ₹{amount}
    </button>
    )
  );
}

export default PaymentButton;
