import { configureStore } from "@reduxjs/toolkit";
import headerSlice from "../components/common/headerSlice";
import modalSlice from "../components/common/modalSlice";

const combinedReducer = {
	header: headerSlice,
	modal: modalSlice,
};

export default configureStore({
	reducer: combinedReducer,
});
