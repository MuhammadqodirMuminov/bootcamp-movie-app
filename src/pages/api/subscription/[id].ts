import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripes = new Stripe(process.env.NEXT_SECRET_STRIPE_KEY as string, {
	apiVersion: "2022-11-15",
});

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	if (req.method === "GET") {
		const { id } = req.query;

		const customers = await stripes.customers.list({
			limit: 100,
		});
		const customer = customers.data.find((c) => c.metadata.user_id === id);

		const stripe = require("stripe")(
			"sk_test_51MlCCSHvCQk2Xl7OYfkx2TF2Ns4AuQAWgFuGBAWCtQI1mFtdn5qnVSsJDaH13nsZmpXZGExCTQxcH5a6ettjYn0n00Klo2JWra"
		);

		const subscription = await stripe.subscriptions.list({
			limit: 1,
			customer: customer?.id,
		});

		return res.status(200).json({ subscription });
	}
}

interface Data {
	message?: string;
	subscription?: Stripe.Response<Stripe.ApiList<Stripe.Subscription>>;
}
