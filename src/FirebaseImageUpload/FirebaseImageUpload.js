import React, { useEffect, useState } from "react";
import { imageDb } from "./Config";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

function FirebaseImageUpload() {
	const [img, setImg] = useState("");
	const [imgUrl, setImgUrl] = useState([]);

	const handleClick = () => {
		if (img !== null) {
			const imgRef = ref(imageDb, `files/${v4()}`);
			uploadBytes(imgRef, img).then((value) => {
				getDownloadURL(value.ref).then((url) => {
					console.log(url);
					setImgUrl((data) => [...data, url]);
				});
			});
		}
	};

	useEffect(() => {
		listAll(ref(imageDb, "files")).then((imgs) => {
			imgs.items.forEach((val) => {
				getDownloadURL(val).then((url) => {
					setImgUrl((data) => [...data, url]);
				});
			});
		});
        console.log('i fire once');
	}, []);

	return (
		<div className="">
			<input type="file" onChange={(e) => setImg(e.target.files[0])} />
			<button onClick={handleClick}>Upload</button>
			<br />
			{imgUrl.map((data, k) => (
				<div key={k}>
					<img src={data} height="200px" width="200px" alt="" />
				</div>
			))}
		</div>
	);
}

export default FirebaseImageUpload;
