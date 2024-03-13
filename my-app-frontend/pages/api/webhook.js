import { mongooseConnect } from "@/lib/mongoose";
const stripe = require('stripe')(process.env.STRIPE_SK);
import {buffer} from 'micro';

export default async function handler(req,res){

    await mongooseConnect();
    const sig = req.headers['stripe-signature'];
    const endpointSecret = "whsec_15300e7d2281c83252bdd56d36afa9a4e51a7a02bee7fcbd61282a49ed1fde31";
    let event;
  
    try {
      event = stripe.webhooks.constructEvent(await buffer(req), sig, endpointSecret);
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
  
    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntentSucceeded = event.data.object;
        // Then define and call a function to handle the event payment_intent.succeeded
        console.log(paymentIntentSucceeded);
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
}
export const config = {
    api : {bodyParser:false,}
}