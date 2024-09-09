import React,{ useState } from "react";

function ToDoList(){
    const [tasks,setTask]=useState(["Wake up Early Morning","Go to College","Learn new Things"]);
    const [newTask,setNewTask]=useState("");

    function handleTasks(event){
        setNewTask(event.target.value);
    }

    function addTask(){
        if(newTask.trim()!==""){
            setTask(t=>[...t,newTask]);
            setNewTask("");
        }
    }

    function deleteTask(index){
        setTask(tasks.filter((task,i)=>i!==index));
    }

    function moveUp(index){
        if(index>0){
            const newTasks=[...tasks];
            [newTasks[index],newTasks[index-1]]=[newTasks[index-1],newTasks[index]];
            setTask(newTasks);
        }
    }
    
    function moveDown(index){
        if(index<tasks.length-1){
            const newTasks=[...tasks];
            [newTasks[index],newTasks[index+1]]=[newTasks[index+1],newTasks[index]];
            setTask(newTasks);
        }
    }

    return(
        <div className="Task-container">
            <h2 className="Task-Header">TO Do LIST</h2>
            <input type="text" value={newTask} onChange={(event)=>handleTasks(event)} />
            <button onClick={()=>addTask()} className="Task-add">Add</button>

            <ul className="Task-List">{tasks.map((task,index)=> <li key={index}>
                <span>{task}</span>
                <button className="Task-delete" onClick={()=>deleteTask(index)}>Delete</button>
                <button className="Task-moveUp" onClick={()=>moveUp(index)}>☝️</button>
                <button className="Task-moveDown" onClick={()=>moveDown(index)}>👇</button>
                </li>)}
            </ul>
        </div>
    );
}

export default ToDoList;