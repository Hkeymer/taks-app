// export const API_URLBASE= 'http://localhost:8000/api/tasks/'
export const API_URLBASE= 'https://server-app-tasks.onrender.com/api/tasks/'

const fetchTasks = async (typeGet) => {
        const getTasks = typeGet?typeGet:'allTasks'
        return await fetch(`${API_URLBASE}${getTasks}`)
              .then(res=>res.json()); 
}

export default fetchTasks