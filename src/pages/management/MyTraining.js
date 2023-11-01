import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../components/common/headerSlice'
import MyTraining from '../../components/myTraining'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "My Training"}))
      }, [])


    return(
        <MyTraining />
    )
}

export default InternalPage