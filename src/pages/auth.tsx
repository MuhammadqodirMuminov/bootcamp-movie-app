import { Formik, Form } from "formik";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useContext } from "react";
import { TextFeild } from "src/components";
import { AuthContext } from "src/context/auth.context";
import * as Yup from "yup";
import logo from "../public/logo.svg";

const Auth = () => {
	const [auth, setAuth] = useState<"signIn" | "signUp">("signIn");
	const { error, isLoading, signIn, signUp, user } = useContext(AuthContext);
	const router = useRouter();

	if (user) router.push("/");
	if (!isLoading) return <>{null}</>;
	const toogleSignIn = (state: "signIn" | "signUp") => {
		setAuth(state);
	};

	const onSubmit = async (formdata: { email: string; password: string }) => {
		if (auth === "signIn") {
			signIn(formdata.email, formdata.password);
		} else {
			signUp(formdata.email, formdata.password);
		}
	};

	const validation = Yup.object({
		email: Yup.string()
			.email("Enter a valid email")
			.required("Email is required"),
		password: Yup.string()
			.min(6, "6 is min character")
			.required("Password is required"),
	});

	return (
		<div className=" bg-black md:bg-transparent flex flex-col h-screen w-screen md:items-center md:justify-center ">
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
				src={
					"http://s3-us-west-2.amazonaws.com/techvibes/wp-content/uploads/2017/04/24135159/Netflix-Background.jpg"
				}
				alt="bg"
				className=" object-cover -z-10 opacity-60 !hidden md:!inline"
				fill
			/>

			<Image
				src={logo}
				alt={"logo"}
				width={56}
				height={56}
				className={" absolute top-4 left-4 cursor-pointer object-contain"}
			/>

			<div className=" relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6  md:mt-0 md:max-w-md md:mx-14">
				<h1 className="text-4xl font-semibold">
					{auth === "signUp" ? "Sign Up" : "Sign In"}
				</h1>

				{error ? (
					<p className="text-center text-red-500 font-bold">{error}</p>
				) : null}

				<div className=" space-y-8">
					<Formik
						validationSchema={validation}
						initialValues={{ email: "", password: "" }}
						onSubmit={onSubmit}>
						<Form className=" space-y-8">
							<TextFeild
								name="email"
								placeholder="Email"
								type={"text"}
							/>
							<TextFeild
								name="password"
								placeholder="Password"
								type={"password"}
							/>

							<button
								type="submit"
								className="w-full bg-[#E10856] py-3 mt-4 font-semibold rounded">
								{auth === "signIn" ? "Sign In" : "Sign Up"}
							</button>
						</Form>
					</Formik>

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
			</div>
		</div>
	);
};

export default Auth;
