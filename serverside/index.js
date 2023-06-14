const express = require("express")
const connection = require("./Config/db")
const TodoModel = require("./model/todo.model")
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cors())


// app.get("/", async(req,res) => {
//     let findQuery = req.query
//     try {
//         const myTodos = await TodoModel.find(findQuery)
//         res.send(myTodos)
//     } catch (error) {
//         console.log(error)
//         res.send({"err": "Something went wrong"})
//     }
//     res.send("Welcome To KoderTroop Homepage")
// })

app.get("/", async (request, response) => {

    const search = request.query.search
//    console.log(search)
    try {
        if(!search){
            const todoSearch = await TodoModel.find()
           
            response.status(200).send(todoSearch);
        }else{
            let todoSearch = await TodoModel.find({title: {$regex: search, $options: "i" }})
            if (todoSearch.length == 0) {
                todoSearch = await TodoModel.find({description: {$regex: search, $options: "i" }})
            }
            // console.log(todoSearch)
            response.status(200).send(todoSearch);
        }
    } catch (error) {
        response.send({ "Message": "Failed", "Error": error });
    }
});


app.post("/addtodo",async(req,res) => {
    const todo = req.body
    console.log(todo)
    const model = new TodoModel(todo)
    await model.save()
    console.log(model)
    res.send("Todo has been Sucessfully Added ")
})

app.patch("/updatetodo/:id",async(req,res) => {
    const TodoId = req.params.id;
    const payload = req.body
    try {
        await TodoModel.findByIdAndUpdate({_id:TodoId},payload)
        res.send(`Todo Updated sucessfully of this ${TodoId}`)
    } catch (error) {
        console.log("Failed to updated todo")
        console.log(error)
        res.send({"err":"Something went wrong"})
    }
})

app.delete("/delete/:id",async(req,res) => {
    let DeleteTodoId = req.params.id
    try {
        await TodoModel.findByIdAndDelete(DeleteTodoId)
        res.send(`Sucessfully Deleted the ${DeleteTodoId}` )
    } catch (error) {
        console.log(error)
        res.send({"msg":"SomeThing Went Wrong"})
    }
})
app.listen(4800,async() => {
    try {
        await connection
        console.log("Connected To database")
    } catch (error) {
        console.log(error)
        console.log("Not Connected to Database")
    }
    console.log("server is running on port 4800")
})