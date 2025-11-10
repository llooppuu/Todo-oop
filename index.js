import express from 'express'
import bodyParser from 'body-parser'
import todoRoutes from './routes/todos.js'
import { TodoController } from './controllers/todos.js'

const app = express()
app.use(bodyParser.json())
app.use(express.urlencoded({extended: true}))

async function startServer(){
    try{
        await TodoController.initTodos()
        app.use("/todos", todoRoutes)
        app.listen(3001,() => {
            console.log(`Server is running at http://localhost:3001`)
        })
    }
    catch(error){
        console.log(error)
    }
}

startServer()