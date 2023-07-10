import { TYPES } from "../actions/types";

const initialState = {
    tasks_data:[],
    total:0,
    completed:0,
    pending:0,
    componentUpdate:false,
    isLoadingReducers:true,
    display:false,
    isActive:'Tasks',
    isActiveElemet:null,
    updateTask:[],
    typeUpdate:false,
    typeSearch:false,
    onClose:null,
    isCloseMenu:true,
    noData:false,
    refresh:true,
};


export const reducerTasks = (state=initialState,action)=>{
    switch (action.type) {
      
        case TYPES.GET_TASKS_DATA:  
            return{
               ...state,
                tasks_data: action.payload
                }
      case TYPES.GET_TOTAL:  
            return{
               ...state,
                total: action.payload
            }

    case TYPES.GET_COMPLETED:  
            return{
               ...state,
                completed: action.payload
      }
    case TYPES.GET_PENDIGN:  
      return{
         ...state,
          pending: action.payload
      }
      case TYPES.IS_LANDING:  
            return{
               ...state,
               isLoadingReducers: action.payload
        }

      case TYPES.NO_DATA:
             return{
               ...state,
              noData:action.payload
        };
        case TYPES.UPDATE_TASK:  {
            
            const selecTask = typeof action.payload==='object'?[]:state.tasks_data.filter(e=>e.id===action.payload)
              
            return{
               ...state,
                updateTask: selecTask
          }
         }
        case TYPES.TYPE_UPDATE:
           
           return{ 
                  ...state,
                typeUpdate:action.payload
           };
        
        case TYPES.IS_REFRESH:
           
           return{ 
                  ...state,
                refresh:action.payload
        };

        case TYPES.UNDATE_COMPONENT:
               return{
               ...state,
              componentUpdate:action.payload
           };
        case TYPES.IS_ACTIVE_TAGS:
            return{
            ...state,
            isActiveElemet:action.payload
        };
        case TYPES.CLOSE_MENU:
          return{
            ...state,
              isCloseMenu:action.payload
          }
        case TYPES.DISPLAY:
          return{
          ...state,
         display:action.payload
      };
        default:
            return state;
    }
    
}