import { useEffect } from "react";
import { MODAL_BODY_TYPES } from "../utils/globalConstantUtil";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../components/common/modalSlice";
import AddCustomerModalBody from "../components/customers/components/AddCustomerModalBody";
import ConfirmationModalBody from "../components/common/components/ConfirmationModalBody";

function ModalLayout() {
	const { isOpen, bodyType, size, extraObject, title } = useSelector(
		(state) => state.modal
	);
	const dispatch = useDispatch();

	const close = (e) => {
		dispatch(closeModal(e));
	};

	return (
		<>
			{/* The button to open modal */}

			{/* Put this part before </body> tag */}
			<div className={`modal ${isOpen ? "modal-open" : ""}`}>
				<div
					className={`modal-box max-w-2xl ${size === "lg" ? "max-w-5xl" : ""}`}
				>
					<button
						className="btn btn-sm btn-circle absolute right-2 top-2"
						onClick={() => close()}
					>
						✕
					</button>
					<h3 className="font-semibold text-2xl pb-6 text-center">{title}</h3>

					{/* Loading modal body according to different modal type */}
					{
						{
							[MODAL_BODY_TYPES.CUSTOMER_ADD_NEW]: (
								<AddCustomerModalBody
									closeModal={close}
									extraObject={extraObject}
								/>
							),
							[MODAL_BODY_TYPES.CONFIRMATION]: (
								<ConfirmationModalBody
									extraObject={extraObject}
									closeModal={close}
								/>
							),
							[MODAL_BODY_TYPES.DEFAULT]: <div></div>,
						}[bodyType]
					}
				</div>
			</div>
		</>
	);
}

export default ModalLayout;
