




let nextTaskId = 0;

export function addTask(task) {
    return {
      type: "ADD_TASK",
      payload: { ...task, id: nextTaskId++ }
    };
  }
  
  export function deleteTask(id) {
    return {
      type: "DELETE_TASK",
      payload: id,
    };
  }
  
  export function updateTask(id, updatedTask) {
    return {
      type: "UPDATE_TASK",
      payload: { id, updatedTask },
    };
  }