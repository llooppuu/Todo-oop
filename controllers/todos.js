import { Todo } from '../models/todo.js'
import { fileManager } from '../utils/files.js'

class todoController {
    constructor(){
        this.TODOS = []
    }
    async createTodo(req, res){
        const task = req.body.task
        const newTodo = new Todo(Math.random().toString(), task)

        this.TODOS.push(newTodo)

        await fileManager.writeFile('./data/todos.json', this.TODOS)

        res.json({
            message: 'created new todo object',
            newTodo: newTodo
        })
    }
    async updateTodo(req, res){
        const todoId = req.params.id
        const updatedTask = req.body.task

        const todoIndex = this.TODOS.findIndex((todo) => todo.id === todoId)

        if (todoIndex < 0){
            res.json({
                message: "Could not find the post by the id"
            })
            throw new Error("Could not find todo")
        }
        this.TODOS[todoIndex] = new Todo(this.TODOS[todoIndex].id, updatedTask)

        await fileManager.writeFile('./data/todos.json', this.TODOS)

        res.json({
            message: "Todo updated",
            updatedTask: this.TODOS[todoIndex]
        })
    }
    async deleteTodo(req, res){
        const todoId = req.params.id
        const todoIndex = this.TODOS.findIndex((todo) => todo.id === todoId)

        if (todoIndex < 0){
            res.json({
                message: "Could not find the post by the id"
            })
            throw new Error("Could not find todo")
        }

        this.TODOS.splice(todoIndex, 1)

        await fileManager.writeFile('./data/todos.json', this.TODOS)

        res.json({
            message: 'todo deleted'
        })
    }
    getTodos(req, res){
        res.json({
            todos: this.TODOS
        })
    }
    async initTodos(){
        const todoData = await fileManager.readFile('./data/todos.json')

        if(todoData !== null){
            this.TODOS = todoData
        }
        else{
            this.TODOS = []
        }
    }
}

export const TodoController = new todoController()