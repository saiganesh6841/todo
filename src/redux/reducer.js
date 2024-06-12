


const initialState={

    tasks:[]
}

export function reducer(state=initialState,action){


    switch(action.type){
        case "ADD_TASK":
            return{...state,tasks: [...state.tasks, action.payload]}

        case "DELETE_TASK":
            return {...state,tasks: state.tasks.filter(task => task.id !== action.payload)}
        case "UPDATE_TASK" :
            const { id, updatedTask } = action.payload;
            return {
                ...state,
                tasks: state.tasks.map(task => task.id === id ? updatedTask : task)
            };
        default:
            return state
    }
       

}