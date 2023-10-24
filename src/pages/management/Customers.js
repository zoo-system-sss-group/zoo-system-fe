import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../components/common/headerSlice'
import Customers from '../../components/customers'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "customers"}))
      }, [])


    return(
        <Customers />
    )
}

export default InternalPage