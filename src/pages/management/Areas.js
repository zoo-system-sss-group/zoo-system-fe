import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../components/common/headerSlice'
import Areas from '../../components/areas'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Area Management"}))
      }, [])


    return(
        <Areas />
    )
}

export default InternalPage