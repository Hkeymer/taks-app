import { useNavigate, useParams} from 'react-router-dom'
import Tasks from '../Tasks/Tasks';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { pathRoute } from '../../App';


const ListTasks = () => {
   
  const {refresh} = useSelector(store=>store.reducerTasks)
  const {params} = useParams()
  const history =  useNavigate();
 
  useEffect(()=>{
   if(refresh)history(pathRoute)
  },[refresh])

  return (
    <div>
    <Tasks 
    texts={params}
     />
    </div>
  )
}

export default ListTasks