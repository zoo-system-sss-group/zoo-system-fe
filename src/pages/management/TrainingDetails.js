import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../components/common/headerSlice'
import TrainingDetails from '../../components/trainingDetails'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Training Detail Management"}))
      }, [dispatch])


    return(
        <TrainingDetails />
    )
}

export default InternalPage