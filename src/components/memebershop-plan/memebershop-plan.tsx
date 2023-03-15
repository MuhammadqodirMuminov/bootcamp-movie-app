import { MemeberShipPlanProps } from "./subscription-plan.props";
import moment from "moment";
import { useState } from "react";

const MemebershopPlan = ({ subscription }: MemeberShipPlanProps) => {
	const [isLoading, setIsLoading] = useState(false);

	const openWindow = async () => {
		setIsLoading(true);
		const payload = { user_id: subscription.customer.metadata.user_id };

		const response = await fetch("/api/subscription/manage", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload),
		});

		const data = await response.json();

		window.open(data.portal);
		setIsLoading(false);
	};

	return (
		<div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:bordder-x-0 md:border-t md:border-b-0 md:pb-0">
			<div className=" space-y-2 py-4">
				<h4 className=" text-lg text-[gray]">Membership & Billing</h4>
				<button
					onClick={openWindow}
					className=" h-10 transition-all w-3/5 whitespace-nowrap bg-gray-300 py-2 text-sm text-black shadow-md font-medium hover:bg-gray-200 md:w-4/5">
					{isLoading ? "loading..." : "Cancel Membership"}
				</button>
			</div>
			<div className=" col-span-3 ">
				<div className="flex flex-col justify-between border-b border-white/10 py-4 md:flex-row">
					<div>
						<p className=" font-medium"> {subscription.customer.email}</p>
						<p className=" tex-[gray]"> Password: ******</p>
					</div>
					<div className=" md:text-right">
						<p className={"membershipLink"}> Change Email</p>
						<p className={"membershipLink"}> Change Password</p>
					</div>
				</div>

				<div className=" flex flex-col justify-between pt-4 pb-4 md:flex-row  md:pb-0">
					<div>
						<div className=" flex items-center gap-2">
							<span className="py-2 px-3 bg-white/20 uppercase rounded">
								{
									subscription.customer.invoice_settings
										.default_payment_method.card.brand
								}
							</span>
							**** **** ****{" "}
							{
								subscription.customer.invoice_settings
									.default_payment_method.card.last4
							}
						</div>
						<p className="mt-4">
							Your Memebership Plan will end{" "}
							{moment(subscription.current_period_end * 1000).format(
								"DD MMM , YYYY"
							)}
						</p>
					</div>

					{isLoading ? (
            <>{"Lodaing..."}</>
					) : (
						<div className=" md:text-right">
							<p onClick={openWindow} className=" membershipLink">
								Manage Payment Info
							</p>
							<p onClick={openWindow} className=" membershipLink ">
								Add Backup paymet Method
							</p>
							<p onClick={openWindow} className=" membershipLink">
								Billinig Detail
							</p>
							<p onClick={openWindow} className=" membershipLink">
								Change Billing day{" "}
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default MemebershopPlan;
