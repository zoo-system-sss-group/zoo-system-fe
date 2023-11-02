import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../components/common/headerSlice'
import News from '../../components/news'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "News Management"}))
      }, [dispatch])


    return(
        <News />
    )
}

export default InternalPage