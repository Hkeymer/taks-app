import { MdSearch } from 'react-icons/md';
import styles from "./styles.module.css";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { isLoadignAction } from '../../redux/actions/actions';
import { pathRoute } from '../../App';


const SearchTasks = () => {
    
  const [title, setTitle] = useState('')
  const history = useNavigate()
  const dispatch = useDispatch()



   const handlesChange = (e) => {
        setTitle(e.target.value)
   }

   const handlesOnSubmit = (e) => {
         e.preventDefault()
         history(`${pathRoute}/Search/Tasks?&query=${title}`)
         dispatch(isLoadignAction(true))
         setTitle('')
   }

  return (
    <div className={styles.conten} >
       <form onSubmit={handlesOnSubmit} className={styles.conten_form} >
       <i><MdSearch fontSize={22.5} color='#777'/></i>
       <input 
       onChange={handlesChange}
       value={title} 
       className={styles.conten_form_input}
        type="text" placeholder='Search Task' />
      </form>
    </div>
  )
}

export default SearchTasks