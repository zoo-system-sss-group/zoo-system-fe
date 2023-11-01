import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../components/common/headerSlice'
import Training from '../../components/training'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Training"}))
      }, [])


    return(
        <Training />
    )
}

export default InternalPage