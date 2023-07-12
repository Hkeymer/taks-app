import React,{useEffect, useRef, useState} from 'react'
import styles from "./styles.module.css"
import {BiEdit} from 'react-icons/bi'
import { useDispatch } from 'react-redux'
import { displayAction, isLoadignAction, typeUpdateAction, upDateComponenetAction, upDateTaskAction } from '../../redux/actions/actions'
import { RiDeleteBin6Line } from 'react-icons/ri'
import {MdOutlineCheckBox,MdOutlineCheckBoxOutlineBlank} from'react-icons/md'
import {CiMenuKebab} from 'react-icons/ci'
import fetchTasks, { API_URLBASE } from '../fetchTasks'
import useModal from '../useModal'
import Modal from '../Modal/Modal'
import useAlerts from '../useAlerts'
import Loading from '../Loading/Loading'
import { useNavigate } from 'react-router-dom'
import { pathRoute } from '../../App'




const Cart = ({title,description,done,date,id,CategoryID}) => {

  const [tags, setTags] = useState([])
  const dispatch = useDispatch(); 
  const history = useNavigate();
  const [isLoading, setisLoading] = useState(false)
  const [isOpen, openModal, closeModal] = useModal();
  const [alerts, newAlerst] = useAlerts()
  const [idCaegory, setIdCaegory] = useState(CategoryID)
  const [doneSatate, setDoneSatate] = useState(done)
  const refDiv = useRef();

   useEffect(()=>{
    
    const handlesRef = () => closeModal()
    // ////////////////////////;

    const handlesTags = () => {
      fetchTasks('categoryTable')
       .then(data=>{
          setTags(data)
          setisLoading(false)   
      })
       .catch(err=>console.log(err))
      }

    if(isOpen) {
      handlesTags()
      setTimeout(()=>document.addEventListener('click',handlesRef),300)
    }
      
    return () => document.removeEventListener('click',handlesRef);

   },[isOpen])
   
   
  const hanclesCompleted = async (newdone)=>{

     setDoneSatate(newdone)
     if(newdone){
      newAlerst("¡You have completed a new task!",true)
     }
     const get = await fetch(`${API_URLBASE}${newdone}/${id}`,{method:'PUT'})

  };

   const deteleTask = ()=>{
         if(window.confirm('Are you sure you want to delete it?')){
         fetch(`${API_URLBASE}delete/${id}`,{method:'DELETE'})
         dispatch(upDateComponenetAction(true))
         dispatch(isLoadignAction(true))
         history(pathRoute)
        }
   };

   const updateTask = ()=>{
         dispatch(upDateTaskAction(id))
         dispatch(typeUpdateAction(true))
         dispatch(displayAction(true))
   };
   
 const truncate = (string , num) => string?.length > num ?`${string.substring(0,num-1)}`:string


const handlesClick = (e)=> e.stopPropagation();


const updatecheked = (taksID,categoryID,name)=>{
   fetch(API_URLBASE+`update/${taksID}/${categoryID}`,{method:'PUT'})
   setIdCaegory(categoryID)
   newAlerst(`Successfully saved to "${name}" list`) 
}

 const handlesOpenModal= ()=>{
      setisLoading(true)
      openModal()
 }

  return (
    <div  className={styles.conten} >
      <div className={styles.conten_divSection} >
         {/* S E C T I O N #### L E F T */}
      <section className={styles.conten_section1}>
      <button style={{
        backgroundColor:'transparent',
        border:'none'
        }} 
      onClick={()=>hanclesCompleted(!doneSatate)}> {
      !doneSatate? <button className={styles.conten_section1_button} > 
      <MdOutlineCheckBoxOutlineBlank/></button>:  
      <button className={styles.conten_section1_button} style={{
        backgroundColor:doneSatate&&'#AEE2FF'
      }}>
       <MdOutlineCheckBox/>
      </button>
      }
      </button>
       {alerts}
      <h4 className={styles.conten_section1_title}>{title}</h4>
      <p className={styles.conten_section1_description}>{description}</p>
      </section>
      {/* S E C T I O N #### R I G H T */}
      <section className={styles.conten_section2} >
      <span> 
       <button className={styles.conten_section_Tags_btn}
         onClick={handlesOpenModal}
         style={{background:isOpen&&'#1111'}}>
         <CiMenuKebab fontSize={17}/>
      </button>

      </span>

      <Modal open={isOpen} >
      {isOpen&&<div
      ref={refDiv}
      onClick={handlesClick}>
       <ul className={styles.conten_section_Tags_ul}>
      <div className={styles.conten_section_Tags_ul_div}>
      <p>Save in...</p>
      </div>
     {
      isLoading? <Loading /> : 
      tags.map(item=>item.CategoryName!=null&&
        <li
        className={styles.conten_section_Tags_ul_li}
        key={item.id}> 
        <label>{item.CategoryName}</label>
        <input
        onClick={()=>updatecheked(id,item.id,item.CategoryName)}
        type="checkbox"
        style={{cursor:'pointer'}}
        checked={idCaegory ===item.id?true:false}
        />
        </li>)
     } 
      </ul>
      </div>}
      </Modal>

      <button onClick={updateTask}
      className={styles.conten_section2_btn}>
      <BiEdit/></button>
      <button onClick={deteleTask}
      className={styles.conten_section2_btn_delete}>
      <RiDeleteBin6Line/></button>
      <span className={styles.conten_section2_span}>{truncate(date,11)}</span>
      </section>
      </div>
      </div>
   
  )
}

export default Cart