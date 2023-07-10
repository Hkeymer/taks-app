import React from 'react'
import styles from './styles.module.css'
import { Link } from 'react-router-dom'
import { getTasksDataAction, isLoadignAction, isRefreshAction, noDataAction } from '../../redux/actions/actions'
import fetchTasks from '../fetchTasks'
import { useDispatch } from 'react-redux'
import { BiListMinus } from 'react-icons/bi'
import { pathRoute } from '../../App'

const Links = ({id,name, setOnLine,onLine,activeStyle}) => {

    const dispatch = useDispatch();   

    const handlesList = async (id,name)=>{
        dispatch(isLoadignAction(true))
        const get = await fetchTasks(`tags/${id}`)
        .then(res=>{
          if(res.length>0){
            dispatch(getTasksDataAction(res))
            dispatch(noDataAction(false))
            dispatch(isLoadignAction(false))
          }else{
            dispatch(isLoadignAction(false))
            dispatch(noDataAction(true))
          }
          }
         )
         setOnLine(name)
         dispatch(isRefreshAction(false))
  }


  return (
    <Link 
    className={styles.link}
    to={`${pathRoute}/lists/${name}`}
    onClick={()=>handlesList(id,name)}
    style={onLine===name?activeStyle:{}}
     >
     <i><BiListMinus/></i> 
     <h4>{name}</h4>
    </Link>
  )
}

export default Links