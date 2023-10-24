import { useState } from "react"
import { useDispatch } from "react-redux"
import { showNotification } from "../../common/headerSlice"
import { addNewCustomer } from "../customerSlice"

const INITIAL_CUSTOMER_OBJ = {
    first_name : "",
    last_name : "",
    email : ""
}

function AddCustomerModalBody({closeModal}){
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [customerObj, setCustomerObj] = useState(INITIAL_CUSTOMER_OBJ)


    const saveNewCustomer = () => {
        if(customerObj.first_name.trim() === "")return setErrorMessage("First Name is required!")
        else if(customerObj.email.trim() === "")return setErrorMessage("Email id is required!")
        else{
            let newCustomerObj = {
                "id": 7,
                "email": customerObj.email,
                "first_name": customerObj.first_name,
                "last_name": customerObj.last_name,
                "avatar": "https://reqres.in/img/faces/1-image.jpg"
            }
            dispatch(addNewCustomer({newCustomerObj}))
            dispatch(showNotification({message : "New Customer Added!", status : 1}))
            closeModal()
        }
    }

    const updateFormValue = ({updateType, value}) => {
        setErrorMessage("")
        setCustomerObj({...customerObj, [updateType] : value})
    }

    return(
        <>

            {/* <InputText type="text" defaultValue={customerObj.first_name} updateType="first_name" containerStyle="mt-4" labelTitle="First Name" updateFormValue={updateFormValue}/> */}

            {/* <InputText type="text" defaultValue={customerObj.last_name} updateType="last_name" containerStyle="mt-4" labelTitle="Last Name" updateFormValue={updateFormValue}/> */}

            {/* <InputText type="email" defaultValue={customerObj.email} updateType="email" containerStyle="mt-4" labelTitle="Email Id" updateFormValue={updateFormValue}/> */}


            {/* <ErrorText styleClass="mt-16">{errorMessage}</ErrorText> */}
            <div className="modal-action">
                <button  className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
                <button  className="btn btn-primary px-6" onClick={() => saveNewCustomer()}>Save</button>
            </div>
        </>
    )
}

export default AddCustomerModalBody