import styles from "./styles.module.css"
import Cart from '../Carts/Cart'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../Loading/Loading'
import NewTask from '../NewTask/NewTask'
import SearchTasks from '../SearchTasks/SearchTasks'
import { GrMenu } from "react-icons/gr"
import { IoAdd } from "react-icons/io5"
import { displayAction, isCloseMenuAction } from "../../redux/actions/actions"



const Tasks = ({noDisplay,texts}) =>{
  
  const { display, isCloseMenu,tasks_data,isLoadingReducers, noData} = useSelector(reducer=>reducer.reducerTasks)
  const dispatch = useDispatch()


  return (
     <div className={window.innerWidth>760?styles.conten:isCloseMenu?styles.conten_icons:styles.conten}>
      
      {/* #### S E C T I O N #### B O X */}
      <section className={styles.section_box}>
       <i onClick={()=>dispatch(isCloseMenuAction(false))} className={styles.section_box_iMenu}>
         <GrMenu fontSize={24} color="#222"/></i>
        <SearchTasks/>
      <i onClick={()=>dispatch(displayAction(true))} className={styles.section_box_i}>
        <IoAdd fontSize={22.5}/></i>
      </section>
    
      {/* #### S E C T I O N #### C A R S */}
      <section className={styles.section_cars} >

        <div style={{display:noDisplay?'none':'flex'}} 
        className={styles.section_cars_div}>
          <span> </span>
        <span style={{marginRight:'20px'}}>{texts}</span>
        </div>
       {/* #### S E C T I O N #### T A B L E*/}
        {isLoadingReducers?(<Loading/>):
        (<div> {noData?<div style={{
          display:'flex',
          alignItems:'center',
          justifyContent:'center',
          height:'300px'
          }}>
        <span>No data</span></div>:
        tasks_data.map(task => 
        <Cart 
        key={task.id}
        title={task.title}
        description={task.description}
        done={task.done}
        date={task.date}
        CategoryID={task.CategoryID}
        CategoryName={task.CategoryName}
        id={task.id} 
        />)}
        </div>)}
      </section>

         {/* #### S E C T I O N #### C R E A T E */}
      <section style={{display:display?'flex':'none'}}  
       className={styles.section_create} >
        <NewTask/>
      </section>

    </div>
  )
}

export default Tasks