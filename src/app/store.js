import { configureStore } from "@reduxjs/toolkit";
import headerSlice from "../components/common/headerSlice";
import modalSlice from "../components/common/modalSlice";
import customerSlice from "../components/customers/customerSlice";

const combinedReducer = {
	header: headerSlice,
	modal: modalSlice,
	customer: customerSlice,
};

export default configureStore({
	reducer: combinedReducer,
});
