const Stripe = require('stripe');
const dotenv = require('dotenv');
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20',
});

const CURRENCY = 'usd'; 

const stripeCheckout = async (req, res) => {
  try {
    let { amount,name,description,image,email } = req.body;
    console.log(req.body);
    amount = Math.round(amount * 100); 
    const params = {
      submit_type: 'donate',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: CURRENCY,
            unit_amount: amount,
            product_data: {
              name: name,
              description: description,
              images: [image],
            },
          },
          quantity: 1,
        }],
        mode: 'payment',
      customer_email: email,
      success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
    };
    const data = await stripe.checkout.sessions.create(params);
    const checkoutSession = data; 
    res.status(200).json({ checkoutSession});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSession = async (req, res) => {
  try {
    const session_id = req.params.session_id;
    const session = await stripe.checkout.sessions.retrieve(session_id);
    res.status(200).json(session);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = { stripeCheckout,getSession };
