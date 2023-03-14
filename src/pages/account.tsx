import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { VscAccount } from "react-icons/vsc";
import logo from "../public/logo.svg";
import { MdOutlineSubscriptions } from "react-icons/md";
import { MemebershopPlan } from "src/components";

const Account = () => {
	return (
		<>
			<Head>
				<title>Movie | account</title>
				<meta name="description" content="Configure your account" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<header>
				<div className="flex items-center space-x-2 md:space-x-10">
					<Link href={"/"}>
						<Image
							src={logo}
							alt={"logo"}
							width={56}
							height={56}
							className={"cursor-pointer object-contain"}
						/>
					</Link>
				</div>
				<div className="flex items-center space-x-4 text-sm font-light">
					<Link href="/account">
						<VscAccount className="w-6 h-6 cursor-pointer" />
					</Link>
				</div>
			</header>
			<main className=" mx-auto max-w-6xl px-5 pt-24 pb-12 transition-all md:px-10">
				<div className=" flex flex-col gap-x-4 md:flex-row md:items-center">
					<h1 className=" text-3xl md:text-4xl ">Accaount</h1>
					<div className=" -ml-1 flex items-center gap-x-1.5">
						<MdOutlineSubscriptions className=" w-7 h-7 text-red-500" />
						<p className="text-md font-semibold text-[#555]">
							
							Member since 15 Fabruary
						</p>
					</div>
        </div>
        
        <MemebershopPlan/>

				<div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:bordder-x-0 md:border-t md:border-b-0 md:pb-0">
					<h4 className=" text-lg text-[gray]">Plan Details</h4>
					<div className=" col-span-2 font-medium">Premium</div>
					<p className=" cursor-pointer text-blue-500 hover:underline md:text-right">
						Change Plan
					</p>
        </div>
        
				<div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:bordder-x-0 md:border-t md:border-b-0 md:pb-0">
          <h4 className=" text-lg text-[gray]">Settings</h4>
          <p className="col-span-3 cursor-pointer text-blue-500 hover:underline">Sign out of all</p>
				</div>
			</main>
		</>
	);
};

export default Account;
