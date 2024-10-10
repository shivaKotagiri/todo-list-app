import React, { useState, useEffect } from "react";

function ToDoList() {
    const [tasks, setTasks] = useState(["Wake up Early Morning", "Go to College", "Learn new Things"]);
    const [newTask, setNewTask] = useState("");
    const [editIndex, setEditIndex] = useState(null);
    const [editTask, setEditTask] = useState("");
    const [error, setError] = useState("");

    function persistData(newTasks) {
        try {
            localStorage.setItem('tasks', JSON.stringify(newTasks));
        } catch (error) {
            console.error("Could not save tasks to localStorage", error);
        }
    }

    function handleTasks(event) {
        setNewTask(event.target.value);
    }

    function addTask() {
        if (newTask.trim() === "") {
            setError("Task cannot be empty!"); 
            return;
        }
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        setNewTask("");
        setError(""); 
        persistData(updatedTasks);
    }

    function handleKeyPress(event) {
        if (event.key === "Enter") {
            addTask();
        }
    }

    function deleteTask(index) {
        const updatedTasks = tasks.filter((task, i) => i !== index);
        setTasks(updatedTasks);
        persistData(updatedTasks);
    }

    function moveUp(index) {
        if (index > 0) {
            const newTasks = [...tasks];
            [newTasks[index], newTasks[index - 1]] = [newTasks[index - 1], newTasks[index]];
            setTasks(newTasks);
            persistData(newTasks);
        }
    }

    function moveDown(index) {
        if (index < tasks.length - 1) {
            const newTasks = [...tasks];
            [newTasks[index], newTasks[index + 1]] = [newTasks[index + 1], newTasks[index]];
            setTasks(newTasks);
            persistData(newTasks);
        }
    }

    function editTodo(index) {
        setEditIndex(index);
        setEditTask(tasks[index]); 
    }

    function saveEdit(index) {
        if (editTask.trim() === "") {
            setError("Edited task cannot be empty!");
            return;
        }
        const updatedTasks = [...tasks];
        updatedTasks[index] = editTask; 
        setTasks(updatedTasks);
        setEditIndex(null); 
        setError(""); 
        persistData(updatedTasks);
    }

    useEffect(() => {
        try {
            const localTask = localStorage.getItem('tasks');
            
            if (localTask && localTask !== "undefined") {
                setTasks(JSON.parse(localTask)); 
            } else {
                localStorage.removeItem('tasks'); 
                setTasks([]); 
            }
        } catch (error) {
            console.error("Could not load tasks from localStorage", error);
        }
    }, []);    

    return (
        <div className="Task-container">
            <h2 className="Task-Header">TO Do LIST</h2>
            <input type="text" value={newTask} onChange={handleTasks} onKeyPress={handleKeyPress} placeholder="Add a new task"/>
            <button onClick={addTask} className="Task-add">Add</button>
            
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <ul className="Task-List">
                {tasks.map((task, index) => (
                    <li key={index} style={{ backgroundColor: editIndex === index ? "#f0f0f0" : "transparent" }}>
                        { 
                            (editIndex === index)? (
                                <>
                                    <input type="text" value={editTask} onChange={(e) => setEditTask(e.target.value)}/>
                                    <button onClick={() => saveEdit(index)} className="Task-save">Save</button>
                                </>
                             ):(
                                <>
                                    <span>{task}</span>
                                    <button className="Task-moveUp" onClick={() => moveUp(index)}>☝️</button>
                                    <button className="Task-moveDown" onClick={() => moveDown(index)}>👇</button>
                                    <button className="Task-edit" onClick={() => editTodo(index)}>Edit</button>
                                    <button className="Task-delete" onClick={() => deleteTask(index)}>Delete</button>
                                </>
                            )
                        }
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ToDoList;
