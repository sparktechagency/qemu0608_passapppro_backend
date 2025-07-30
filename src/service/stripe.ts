import Stripe from 'stripe';
import {STRIPE_SECRET_KEY} from "../config/env/payment.env";

export const stripe = new Stripe(STRIPE_SECRET_KEY);

export default stripe;