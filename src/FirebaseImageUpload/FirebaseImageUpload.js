import { imageDb } from "./Config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

export const FirebaseImageUpload = async ({ folder, img }) => {
	const imgRef = ref(imageDb, `${folder}/${v4()}`);
	var link = null;
	await uploadBytes(imgRef, img)
		.then((value) => getDownloadURL(value.ref))
		.then((url) => {
			link = url;
		})
		.catch((err) => {
			throw err;
		});
	return link;
};
