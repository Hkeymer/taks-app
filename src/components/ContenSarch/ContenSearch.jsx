import { useLocation } from 'react-router-dom';
import Tasks from '../Tasks/Tasks';
import { getTasksDataAction, isLoadignAction, noDataAction, upDateComponenetAction } from '../../redux/actions/actions';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import fetchTasks from '../fetchTasks';

const useQuery= () => new URLSearchParams(useLocation().search);

const ContenSearch = () => {

const dispatch = useDispatch()
const query = useQuery();
const title = query.get('query');

useEffect(()=>{

  const get_data = ()=>{
    fetchTasks(`search/${title}`)
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

},[title])

  return (
    <div>
    <Tasks />
    </div>
  )
}

export default ContenSearch