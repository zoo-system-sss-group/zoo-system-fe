import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../components/common/headerSlice'
import TicketOrders from '../../components/ticketOrders'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Ticket Orders Management"}))
      }, [])


    return(
        <TicketOrders />
    )
}

export default InternalPage