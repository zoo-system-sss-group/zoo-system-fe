import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../components/common/headerSlice'
import Cages from '../../components/cages'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Cage Management"}))
      }, [dispatch])


    return(
        <Cages />
    )
}

export default InternalPage