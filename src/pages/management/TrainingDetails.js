import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../components/common/headerSlice'
import TrainingDetails from '../../components/trainingDetails'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "TrainingDetails Management"}))
      }, [])


    return(
        <TrainingDetails />
    )
}

export default InternalPage