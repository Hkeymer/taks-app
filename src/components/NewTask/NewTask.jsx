import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css"
import { displayAction, isLoadignAction, typeUpdateAction, upDateComponenetAction} from "../../redux/actions/actions";
import { useEffect, useRef, useState} from "react";
import {BsPinAngle, BsPinAngleFill } from 'react-icons/bs'
import { useNavigate } from "react-router-dom";
import { API_URLBASE } from "../fetchTasks";
import { pathRoute } from "../../App";

const NewTask = () => {

  const dispatch = useDispatch(); 
  const history = useNavigate()
  const refInput = useRef();
  const [pin, setPin] = useState(false)
  const {display,updateTask,typeUpdate} = useSelector(r=>r.reducerTasks)
  const [form, setForm] = useState({
    title:'',
    description:''
  })


 useEffect(()=>{
    const myRef = ()=>{
          display&&refInput.current?.focus()
          if (typeUpdate) {
            setForm({
             title:updateTask[0].title,
             description:updateTask[0].description
            })
         }else{
          setForm({
            title:'',
            description:''
          })
         }
      
        }
          myRef();
        return ()=> {
              myRef();
          }  
 },[display,typeUpdate,updateTask])

  const close = ()=>{
    dispatch(displayAction(false))
    dispatch(typeUpdateAction(false))
  }
 


  const handlesSubmit = (e)=>{
     
    e.preventDefault();

    const {title, description} = form;
     
     if(!description) {      
      fetch(`${API_URLBASE}create/${title}/No description`,{
        method:'POST',
        headers:{'Content-Type': 'application/json'}
        })
     }
    
     if(typeUpdate){
        fetch(`${API_URLBASE}update/${updateTask[0].id}`,{
        method:'PUT',
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify(form)
        }) 
      } 
      else{
       fetch(`${API_URLBASE}create/${title}/${description}`,{
        method:'POST',
        headers:{'Content-Type': 'application/json'}
        })

     }
    
    setForm({
      title:'',
      description:''
    })

    dispatch(upDateComponenetAction(true))
    // dispatch(isLoadignAction(true))
    history(pathRoute)
    if (!pin) {
        close();
    };
       
 };   
     

     
    
 
  return (
    <div className={styles.conten}>
         <form onSubmit={handlesSubmit}
         className={styles.conten_form}>
          
          <div className={styles.conten_form_div}>
          <label className={styles.conten_form_div_label} htmlFor="">
          New task</label>
          <button type='button' onClick={close}
          className={styles.conten_form_div_btnClose} >
          x</button>
         </div>
         
          <input ref={refInput} 
           onChange={e=>setForm({
              ...form,
              title:e.target.value
             })}
          value={form.title}
          className={styles.conten_form_input}
          type="text" placeholder='Title'/>

          <textarea className={styles.conten_form_input} 
          onChange={e=>setForm({
            ...form,
            description:e.target.value
          })}
          value={form?.description}
          style={{borderBottom:'1px solid #2222'}}
          placeholder='Descriction' 
          cols="72" rows="10"></textarea>

          <div className={styles.conten_form_div2}>
            
          <button className={styles.conten_form_btnSubmit}>
           New task</button>
           {pin?(<button type="button" onClick={()=>setPin(false)}
            style={{background:'#1111'}}
           className={styles.conten_form_div2_btn}>
          <BsPinAngleFill className={styles.conten_form_div2_btn_i}/>
          </button>):
          (<button type="button" onClick={()=>setPin(true)}
          className={styles.conten_form_div2_btn} >
          <BsPinAngle className={styles.conten_form_div2_btn_i}/>
          </button>)}

          </div>

        </form>
    </div>
  )
}

export default NewTask