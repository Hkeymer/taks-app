import {VscLoading} from 'react-icons/vsc'
import styles from "./styles.module.css"

const Loading = ({color,margin}) => {
  return (
     <i className={styles.loanding_spinn}
     style={{ 
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      marginTop:margin?margin:'50px'
      }}
      >
     <VscLoading 
     className='loanding_spinn'
     fontSize={'4rem'}
     color={color?color:'#2222'}
     />
    </i>
  )
}

export default Loading