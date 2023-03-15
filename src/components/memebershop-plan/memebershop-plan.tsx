import { MemeberShipPlanProps } from "./subscription-plan.props";
import moment from "moment"

const MemebershopPlan = ({ subscription }: MemeberShipPlanProps) => {
	return (
		<div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:bordder-x-0 md:border-t md:border-b-0 md:pb-0">
			<div className=" space-y-2 py-4">
				<h4 className=" text-lg text-[gray]">Membership & Billing</h4>
				<button className=" h-10 transition-all w-3/5 whitespace-nowrap bg-gray-300 py-2 text-sm text-black shadow-md font-medium hover:bg-gray-200 md:w-4/5">
					Cancel Membership
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
						<p>
							Your Memebership Plan will end{" "}
							{moment(subscription.current_period_end * 1000).format(
								"DD MMM , YYYY"
							)}
						</p>
					</div>
					<div className=" md:text-right">
						<p className=" membershipLink">Manage Payment Info</p>
						<p className=" membershipLink ">Add Backup paymet Method</p>
						<p className=" membershipLink">Billinig Detail</p>
						<p className=" membershipLink">Change Billing day </p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MemebershopPlan;
