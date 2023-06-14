import React, { useEffect, useState } from "react";
import axios from "axios";

const Todo = () => {
    const [inputData, setInputData] = useState("");
    const [description, setDescription] = useState("");
    const [task, setTask] = useState("");
    const [completed, setCompleted] = useState("");
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [newTitle, setNewTitle] = useState("")

    const getTodos = async () => {
        const response = await axios.get("https://puce-rooster-yoke.cyclic.app/");
        console.log(response.data);
        setData(response.data);
    };
    const addTodos = async () => {
        try {
            const res = await axios.post("https://puce-rooster-yoke.cyclic.app/addtodo", {
                title: inputData,
                description,
                task,
                is_completed: false,
            });
            setInputData(res.data);
            console.log(res.data);
            setInputData("");
            setDescription("");
            setTask("");
            setCompleted("");
            alert(res.data)
            getTodos()
        } catch (error) {
            console.log(error);
        }
    };
    const handleDelete = async (id) => {
        try {
            let res = await axios.delete(`https://puce-rooster-yoke.cyclic.app/delete/${id}`);
            console.log(res.data);
            alert(res.data)
            getTodos()
        } catch (error) {
            console.log(error);
        }
    };
    const handleEdit = async (id) => {

        try {
            let res = await axios.patch(`https://puce-rooster-yoke.cyclic.app/updatetodo/${id},`, { title: newTitle })
            setNewTitle(res.data)
            console.log(res.data)
            setNewTitle("")
            // alert(res.error)
        } catch (error) {
            console.log(error)
        }
    }
    const handleSearch = () => {
        console.log("Hi")
        setSearchQuery();
        getTodos()
    };

    useEffect(() => {
        getTodos();
    }, []);

    // console.log(data)
    return (
        <>
            <div style={{ border: "1px solid black", textAlign: "start", width: "20%", padding: "10px" }} >
                <span>Search :</span>
                <input
                    type="text"
                    placeholder="Search with title, description"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                />
            </div>
            <div style={{ border: "none", width: "40%", margin: "auto",}}>
                {/* <form > */}
                <div style={{ padding: "10px", border: "1px solid grey", margin: "auto", width: "80%",display:"grid",boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",backgroundColor:"lightgreen"}}>
                    <span>Title :</span>
                    <input
                        type="text"
                        placeholder="Add Title"
                        value={inputData}
                        onChange={(e) => setInputData(e.target.value)}
                    />{" "}
                    <br />
                    <span>Description :</span>
                    <input
                        type="text"
                        placeholder="Add Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />{" "}
                    <br />
                    <span>Task :</span>
                    <input
                        type="text"
                        placeholder="Add Task"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                    />{" "}
                    <br />
                    <span>Status :</span>
                    <select
                        name=""
                        id=""
                        value={completed}
                        onChange={(e) => setCompleted(e.target.value)}
                    >
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </select>{" "}
                    <br />
                    <button type="submit" onClick={() => addTodos()}>
                        Add
                    </button>
                    {/* </form> */}
                </div>
            </div>
            <div style={{ border: "none", marginTop: "20px",display: "grid",  gridTemplateColumns: "repeat(3,1fr)",gap:"10px",padding:"15px"}}>
                {data.map((data) => (
                    <div style={{border:"1px solid black",borderRadius:"10px",backgroundColor:"lightblue"}}>
                        <div key={data._id}>
                            <h3>{data.title}</h3>
                            <p>{data.description}</p>
                            <p>{data.task}</p>
                            {/* <input type="time" >{data}</input> */}
                            <div style={{display:"flex", justifyContent:"space-around",marginBottom:"5px"}}>
                            <button style={{backgroundColor:"green",borderRadius:"5px"}} value={newTitle} onClick={() => handleEdit(data._id)}>Edit</button>
                            <button style={{backgroundColor:"red", borderRadius:"5px"}} onClick={() => handleDelete(data._id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Todo;
