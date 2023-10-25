import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../components/common/headerSlice'
import Accounts from '../../components/accounts'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Account Management"}))
      }, [])


    return(
        <Accounts />
    )
}

export default InternalPage