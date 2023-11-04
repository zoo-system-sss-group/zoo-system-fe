import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../components/common/headerSlice'
import DietSchedule from '../../components/dietSchedule'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Animal Diet Schedule"}))
      }, [dispatch])


    return(
        <DietSchedule />
    )
}

export default InternalPage