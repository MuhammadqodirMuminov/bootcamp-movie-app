import Head from "next/head";
import Image from "next/image";
import { useState } from "react";

const Auth = () => {
	const [auth, setAuth] = useState<"signIn" | "signUp">("signIn");

	const toogleSignIn = (state: "signIn" | "signUp") => {
		setAuth(state);
	};

	return (
		<>
			<Head>
				<title>Auth - Movie</title>
				<meta
					name="description"
					content="TO watch the movies sign to app"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/logo.svg" />
			</Head>

			<Image
				src={"/logo.svg"}
				alt={"logo"}
				width={56}
				height={56}
				className={" absolute top-4 left-4 cursor-pointer object-contain"}
			/>

			<form className=" relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6  md:mt-0 md:max-w-md md:mx-14">
				<h1 className="text-4xl font-semibold">
					{auth === "signUp" ? "Sign Up" : "Sign In"}
				</h1>

				<div className=" space-y-8">
					<label className=" inline-block w-full">
						<input type="text" placeholder="Email" className="input" />
					</label>
					<label className=" inline-block w-full">
						<input
							type="password"
							placeholder="Password"
							className="input"
						/>
					</label>

					{auth === "signIn" ? (
						<button
							type="submit"
							className="w-full bg-[#E10856] py-3 font-semibold rounded">
							Sign in
						</button>
					) : (
						<button
							type="submit"
							className="w-full bg-[#E10856] py-3 font-semibold rounded">
							Sign Up
						</button>
					)}

					{auth === "signIn" ? (
						<div className=" text-[gray]">
							Not yet account ?{" "}
							<button
								type="button"
								onClick={() => toogleSignIn("signUp")}
								className="text-white hover:underline">
								Sign Up Now
							</button>
						</div>
					) : (
						<div className=" text-[gray]">
							Already have account ?{" "}
							<button
								type="button"
								onClick={() => toogleSignIn("signIn")}
								className="text-white hover:underline">
								Sign In
							</button>
						</div>
					)}
				</div>
			</form>
		</>
	);
};

export default Auth;
