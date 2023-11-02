import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../components/common/headerSlice'
import DietDetails from '../../components/dietDetails'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "DietDetails Management"}))
      }, [])


    return(
        <DietDetails />
    )
}

export default InternalPage