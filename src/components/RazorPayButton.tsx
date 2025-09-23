import axios from "axios";

interface RazorPayButtonProps {
  amount: number; // Razorpay expects money in paise
  eventName: string;
   onSuccess?: (paymentDetails: any) => void; // Optional onSuccess prop as ticket fee does not need feedback
    disabled?: boolean; // Optional disabled prop
}

function PaymentButton({ amount, eventName, onSuccess, disabled }: RazorPayButtonProps) {
  const handlePayment = async () => {
    if(disabled){
        alert("Please fill all fields before proceeding to payment.");
        return;
    }
    
    const { data: order } =  await axios.post('https://discipl-server.onrender.com/api/payments/create-order', { amount });  // API used to do payment through razorpay

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, 
      amount: order.amount * 100,   // Convert to paise
      currency: order.currency,
      order_id: order.id,
      name: "Discipl",
      description: `Payment for ${eventName}`,
      handler: function (response: any) {
         // Call onSuccess callback if provided
        if(onSuccess){
            onSuccess(response);
        }
    },
      prefill: {
        name: "Test User",
        email: "test@example.com",
        contact: "9999999999",
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
