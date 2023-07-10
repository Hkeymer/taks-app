import React from 'react'
import styles from './styles.module.css'
import {AiOutlineClose} from 'react-icons/ai'

const Modal = ({children,open}) => {
  return (
    <div className={styles.modal}
      style={{display:open?'flex':'none'}} >
        <div className={styles.modal_div}>
        {children}
       <button className={styles.modal_btn} >
       <AiOutlineClose fontSize={22} color='#444'/>
       </button>
        </div>
    </div>
  )
}

export default Modal