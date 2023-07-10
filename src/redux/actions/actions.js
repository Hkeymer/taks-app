import { TYPES } from "./types.js"

export const getTasksDataAction = (data)=>({type:TYPES.GET_TASKS_DATA,payload:data});
export const getTotalAction = (data)=>({type:TYPES.GET_TOTAL,payload:data});
export const getCompletedAction = (data)=>({type:TYPES.GET_COMPLETED,payload:data});
export const getPendingAction = (data)=>({type:TYPES.GET_PENDIGN,payload:data});
export const noDataAction = (data)=>({type:TYPES.NO_DATA,payload:data});
export const serchTasksAction = (data)=>({type:TYPES.SEARCH_TASKS,payload:data});
export const typeSearchAction = (data)=>({type:TYPES.TYPE_SEARCH,payload:data});
export const upDateTaskAction = (id)=>({type:TYPES.UPDATE_TASK,payload:id});
export const typeUpdateAction = (data)=>({type:TYPES.TYPE_UPDATE,payload:data});
export const upDateComponenetAction = (data)=>({type:TYPES.UNDATE_COMPONENT,payload:data});
export const displayAction = (data)=>({type:TYPES.DISPLAY,payload:data});
export const isLoadignAction = (data)=>({type:TYPES.IS_LANDING,payload:data});
export const isActiveTagsAction = (id)=>({type:TYPES.IS_ACTIVE_TAGS,payload:id});
export const isCloseMenuAction = (data)=>({type:TYPES.CLOSE_MENU,payload:data});
export const isRefreshAction = (data)=>({type:TYPES.IS_REFRESH,payload:data});


