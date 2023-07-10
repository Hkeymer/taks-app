import React, { useState } from 'react'
import Alerts from './Alerts/Alerts';

const useAlerts = () => {
  
    const [list, setlist] = useState([])

    const createAlerts = (text,data)=>{
          setlist([...list,{text,styles2:data}]);
          setTimeout(()=>{
          setlist((l)=>l.slice(1))
          },2000)
    }


  const alerts = (
    <div style={{
      position:'fixed',
      display:'flex',
      flexDirection:'column',
      gap:'10px',
      bottom:'10px',
      zIndex:'9999999'
    }}>
        {
        list.map((item)=> <Alerts styles2={item.styles2?true:false} text={item.text}/>)
        } 
    </div>
  )

     return [alerts, createAlerts]
}

export default useAlerts