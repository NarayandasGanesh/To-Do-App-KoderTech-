import React, { useEffect, useState } from 'react'
import axios from "axios"

const Todo = () => {
    // const[data, setData] = useState([])

    const getTodos = async() => {

        const response = await axios.get('http://localhost:4800/');
        // const data = await response.json();
        console.log(response.data)
    }
    const addTodos = async () => {
        const res = await axios.post("http://localhost:4800/addtodo",{Title:"title",Description: "description", Task: "task", Is_Completed: "is_completed"})
        console.log(res)
    }
    // getTodos()
    useEffect(()=>{
        getTodos()
        addTodos()
    },[])

    // console.log(data)
  return (
    <div>Todo
        <input type="text" placeholder='Enter Title' />
    </div>
    
  )
}

export default Todo