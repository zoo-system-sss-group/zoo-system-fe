import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../components/common/headerSlice'
import Animals from '../../components/animals'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Animal Management"}))
      }, [dispatch])


    return(
        <Animals />
    )
}

export default InternalPage