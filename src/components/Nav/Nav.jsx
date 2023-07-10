import { useEffect, useState, Suspense, lazy } from "react";
import styles from "./styles.module.css";
import { NavLink } from "react-router-dom";
import fetchTasks from "../fetchTasks";
import {useDispatch, useSelector } from "react-redux";
import{IoAdd} from 'react-icons/io5'
import { BsChevronDown, BsClock, BsHouse,BsJournalCheck} from "react-icons/bs";
import { 
  getCompletedAction, 
  getPendingAction,
   getTasksDataAction, 
   getTotalAction,
   isCloseMenuAction, 
   isLoadignAction, 
   isRefreshAction, 
   noDataAction, 
   upDateComponenetAction
} from "../../redux/actions/actions";
import { pathRoute } from "../../App";

const Links = lazy(()=>import('../Links/Links'))

const Nav = ({}) => {
 

const { componentUpdate, isCloseMenu, total} = useSelector(reducer=>reducer.reducerTasks);
const dispatch = useDispatch();   
const [onLine, setOnLine] = useState('Home')
const [display, setDisplay] = useState(false)


const isOnLine = (name)=> {
      if(name){
        setOnLine(name) 
      }
}  

const [cateData, setCateData] = useState([]);


   useEffect(()=>{
       
      const get = async () =>{
         
      const data = await fetchTasks('categoryTable')
      .then(data=>{
       setCateData(data)   
        // setIsBackground(false)
      })
        
        //  ***** COUNTER TASKS TOTAL *****;
       const count_total = await fetchTasks('count/done')
          .then(data=>
          dispatch(getTotalAction(data[0].Amount)))
            //  ***** COUNTER TASKS COMPLETED*****;
      const count_completed = await fetchTasks('count/done/1')
          .then(data=>
          dispatch(getCompletedAction(data[0].Amount))
          )
            //  ***** COUNTER TASKS PENDING*****;
      const count_pending = await fetchTasks('count/done/0')
          .then(data=>
           dispatch(getPendingAction(data[0].Amount))
           )
            ////////////////////////////////;
            dispatch(upDateComponenetAction(false))
      
        };
      
      const handlesCloseMenu = ()=> dispatch(isCloseMenuAction(true))

      if(!isCloseMenu){
          setTimeout(() => {
            document.addEventListener('click',handlesCloseMenu)
          }, 300)
       } 
      
        get();  

     return ()=> document.removeEventListener('click',handlesCloseMenu);

   },[isCloseMenu,componentUpdate])


  const handlesCompleted = async (id,name)=>{
     dispatch(isLoadignAction(true))
     const get = await fetchTasks(`category/${id}`)
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
  
   const activeStyle = {background:'#F1F6F9',color:'#4f92f0'}

  return (
  <div className={window.innerWidth>760?
    styles.nav:
   isCloseMenu?styles.nav_icons:
   styles.nav}>
    <div className={styles.nav_div}>

       <a className={styles.nav_div_title}>
       <h3>AppTasks</h3></a>
       <div className={styles.line}></div>

       <NavLink to={pathRoute} 
       style={onLine==='Home'?activeStyle:{}}
       onClick={()=>isOnLine('Home')} 
       className={styles.nav_div_a}>
        <i><BsHouse/></i> 
       <h4>Home</h4>
       <span>{total!==0&&total}</span>
     </NavLink>
      <section className={styles.nav_div_sectionList} >

      <NavLink to={pathRoute+'/lists/Completed'} 
       onClick={()=>handlesCompleted(1,'Completed')}
       style={onLine==='Completed'?activeStyle:{}}
       className={styles.nav_div_a}><i><BsJournalCheck/></i> <h4>Completed</h4>
      {/* <span>{completed!==0&&completed}</span> */}
       </NavLink>

       <NavLink to={pathRoute+'/lists/Pending'}  
        onClick={()=>handlesCompleted(0,'Pending')}
        style={onLine==='Pending'?activeStyle:{}}
       className={styles.nav_div_a}><i><BsClock/></i><h4>Pending</h4>
     {/* <span>{pending!==0&&pending}</span> */}
       </NavLink>

       <NavLink onClick={(e)=>{
        e.stopPropagation()
        setDisplay(!display)}}
       className={styles.nav_div_a}>
        <i><BsChevronDown /></i>
       <h4>Show {!display?'more':'less'} </h4>
       </NavLink>

        
        <div 
         style={{
          display:display?'flex':'none'
        }}
        className={styles.nav_div_contenList}>
       {cateData.map(item => item.CategoryName!=null&&
          <Suspense fallback={
            <a style={{
              background:'#F7F7F7',
              width:'100%',
              padding:'20px',
              margin:'5px 0'
            }}>

            </a>
          }>
          <Links 
          id={item.id}
          setOnLine={setOnLine}
          onLine={onLine}
          name={item.CategoryName}
          //  isBackground={isBackground}
           activeStyle={activeStyle}/>
          </Suspense>
         )
        }
       </div> 

         </section>
         <div className={styles.addList}>
         <h4>LISTS</h4>
          <i><IoAdd fontSize={20} fontWeight={400} color='#555'/></i>
          </div> 
    

    </div>   
  
  </div>
  )
}

export default Nav