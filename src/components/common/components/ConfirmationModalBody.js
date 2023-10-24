import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
	CONFIRMATION_MODAL_CLOSE_TYPES,
	MODAL_CLOSE_TYPES,
} from "../../../utils/globalConstantUtil";
import { showNotification } from "../headerSlice";

function ConfirmationModalBody({ extraObject, closeModal }) {
	const dispatch = useDispatch();

	const { message, type, _id, index } = extraObject;

	const proceedWithYes = async () => {
		if (type === CONFIRMATION_MODAL_CLOSE_TYPES.ACCOUNT_DEACTIVE) {
			axios.delete(`/odata/accounts/${index}`).then(res => {
				dispatch(showNotification({ message: "Account deactive! - " + res.status, status: res.status }));
			}).catch(err => {
				dispatch(showNotification({ message: err.message, status: 400 }));
			})
			
		}
		closeModal();
	};

	return (
		<>
			<p className=" text-xl mt-8 text-center">{message}</p>

			<div className="modal-action mt-12">
				<button className="btn btn-outline " onClick={() => closeModal()}>
					Cancel
				</button>

				<button
					className="btn btn-primary w-36"
					onClick={() => proceedWithYes()}
				>
					Yes
				</button>
			</div>
		</>
	);
}

export default ConfirmationModalBody;
