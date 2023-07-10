import { useDispatch, useSelector } from 'react-redux';
import Tasks from '../Tasks/Tasks';
import { getTasksDataAction, isLoadignAction, noDataAction, upDateComponenetAction } from '../../redux/actions/actions';
import fetchTasks from '../fetchTasks';
import { useEffect } from 'react';

const Home = () => {

  const { componentUpdate } = useSelector(store=>store.reducerTasks)
  const dispatch = useDispatch()
 
  useEffect(()=>{

  const get_data = ()=>{
    fetchTasks()
    .then(res=>{
    if(res.length>0){
       dispatch(getTasksDataAction(res))
       dispatch(isLoadignAction(false))
       dispatch(noDataAction(false))
     }else{
      dispatch(isLoadignAction(false))
      dispatch(noDataAction(true))
     }
     dispatch(upDateComponenetAction(false))
    })
    }

    get_data()

     return ()=> dispatch(getTasksDataAction([]))

},[componentUpdate])
   
  return (
    <div>
       <Tasks
        texts={'Tasks'} 
        // count={10}
        />
    </div>
  )
}

export default Home