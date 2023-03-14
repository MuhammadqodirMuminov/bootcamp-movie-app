import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_SECRET_STRIPE_KEY as string, {
	apiVersion: "2022-11-15",
});

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const { method } = req;

	if (method === "POST") {
		try {
			const { email } = req.body;

			await stripe.customers.create({ email });

			return res.status(200).json({ message: "success" });
		} catch (error) {
			const result = error as Error;

			return res.status(400).json({ message: result.message });
		}
	} else {
		res.status(400).json({ message: "Invalid method" });
	}
}

interface Data {
	message?: string;
}
