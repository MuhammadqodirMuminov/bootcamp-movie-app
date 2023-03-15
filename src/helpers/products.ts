import { collection, getDocs } from "firebase/firestore";
import { db } from "src/firebase";
import { IProducts } from "src/interfaces/app.interface";

export const getdata = async (user_id: string) => {
	let newProducts: IProducts[] = [];
	const querySnapshot = await getDocs(collection(db, "products"));

	querySnapshot.forEach((doc) => {
		
		if (doc.data().user_id == user_id) {
			newProducts.push(doc.data() as IProducts);
		}
	});

	return newProducts;
};
