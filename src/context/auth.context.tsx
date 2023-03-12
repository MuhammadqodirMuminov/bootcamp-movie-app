import { onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from "next/router";
import { createContext, useMemo, ReactNode, useEffect, useState } from "react";
import { auth } from "src/firebase";
import { useAuth } from "src/hooks/useAuth";

interface authContextState {
	user: User | null;
	error: string;
	isLoading: boolean;
	signUp: (email: string, password: string) => Promise<void>;
	signIn: (email: string, password: string) => Promise<void>;
	logOut: () => Promise<void>;
}

export const AuthContext = createContext<authContextState>({
	user: null,
	error: "",
	isLoading: false,
	signIn: async () => {},
	signUp: async () => {},
	logOut: async () => {},
});

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
	const {
		user,
		error,
		isLoading,
		signIn,
		signUp,
		logOut,
		SetUser,
		setisLoading,
	} = useAuth();
	const [initialLoader, setInitialLoader] = useState<boolean>(true);
	const router = useRouter();

	const value = useMemo(
		() => ({ user, isLoading, logOut, error, signIn, signUp }),

		// eslint-disable-next-line
		[user, error, isLoading]
	);

	useEffect(
		() =>
			onAuthStateChanged(auth, (user) => {
				if (user) {
					setisLoading(false);
					SetUser(user);
				} else {
					SetUser(null);
					router.push("/auth");
					setisLoading(true);
				}

				setInitialLoader(false);
			}),
		//eslint-disable-next-line
		[]
	);

	return (
		<AuthContext.Provider value={value}>
			{!initialLoader ? children : "Loader..."}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;
