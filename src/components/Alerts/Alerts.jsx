import React from 'react'
import styles from './styles.module.css'
import { AiFillCheckCircle } from 'react-icons/ai'


const Alerts = ({text,styles2}) => {
 

  return (
    <div className={styles.box}
      style={styles2?{
      background:'#fff',
      color:'#111',
      boxShadow:'0 0 .5rem #00000025'
      }:{}}
    > 
    <i><AiFillCheckCircle color={!styles2?'#0079FF':'green'} fontSize={20}/></i>
    <p>{text}</p>
    </div>
  )
}

export default Alerts