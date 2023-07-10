import { useState } from "react";

const useModal = (initialValue=false) => {
   
    const [isOpen, setOpen] = useState(initialValue)
    
    const openModal = ()=>setOpen(true)

    const closeModal= ()=>setOpen(false)

  return [isOpen, openModal ,closeModal]

}

export default useModal