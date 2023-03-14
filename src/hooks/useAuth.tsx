import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	User,
} from "firebase/auth";
import { auth } from "src/firebase";
import { useState } from "react";
import { useRouter } from "next/router";

export const useAuth = () => {
	const [isLoading, setisLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>("");
	const [user, SetUser] = useState<User | null>(null);
	const router = useRouter();

	const signUp = async (email: string, password: string) => {
		setisLoading(true);

		await createUserWithEmailAndPassword(auth, email, password)
			.then((res) => {
				SetUser(res.user);
				router.push("/");
				setisLoading(true);
			})
			.catch((err) => setError(err.message))
			.finally(() => setisLoading(false));
	};

	const signIn = async (email: string, password: string) => {
		setisLoading(true);

		await signInWithEmailAndPassword(auth, email, password)
			.then((res) => {
				SetUser(res.user);
				router.push("/");
				setisLoading(true);
			})
			.catch((err) => setError(err.message))
			.finally(() => setisLoading(false));
	};

	const logOut = async () => {
		setisLoading(true);

		await signOut(auth)
			.then(() => SetUser(null))
			.catch((err) => setError(err.message))
			.finally(() => setisLoading(false));
	};

	return {
		signIn,
		signUp,
		logOut,
		user,
		error,
		isLoading,
		SetUser,
		setisLoading,
	};
};
