import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";
import todoList from "./TodoList";

//data -> CRUD
//create +
//read (+,+,+)// filter => //sort, pagination
//update +
//delete +

//CLI
//GUI-!!!!!!
//VUI

export type FilterValuesType = "all" | "active" | "completed"

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [todoListId: string]: TaskType[]
}

function App() {
    // BLL:
    const todoListId_1 = v1()
    const todoListId_2 = v1()
    const [todoLists, setTodoLists] = useState<TodoListType[]>([
        {id: todoListId_1, title: "What to learn", filter: "all"},
        {id: todoListId_2, title: "What to buy", filter: "all"},
    ])
    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListId_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS/TS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: false},
            {id: v1(), title: "RTK", isDone: false},
        ],
        [todoListId_2]: [
            {id: v1(), title: "Water", isDone: true},
            {id: v1(), title: "Beer", isDone: true},
            {id: v1(), title: "Toilet paper", isDone: false},
            {id: v1(), title: "Buckwheat", isDone: false},
            {id: v1(), title: "Meet", isDone: false},
        ]
    })
    //
    // const todoListTitle: string = "What to learn"
    // const [tasks, setTasks] = useState<Array<TaskType>>([
    //     {id: v1(), title: "HTML&CSS" , isDone: true},
    //     {id: v1(), title: "JS/TS" , isDone: true},
    //     {id: v1(), title: "React" , isDone: false},
    //     {id: v1(),  title: "Redux" , isDone: false},
    //     {id: v1(),  title: "RTK" , isDone: false},
    // ])
    // console.log(tasks)
    // const [filter, setFilter] = useState<FilterValuesType>("all")


    console.log(v1())
    const removeTask = (taskId: string, todoListId: string) => {
        // const copyTasks = {...tasks}
        // copyTasks[todoListId] = copyTasks[todoListId].filter((t) => t.id !== taskId)
        // setTasks(copyTasks)

        // то же самое что и вверху
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter((t) => t.id !== taskId)})

    }
    const addTask = (title: string, todoListId: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
    }
    const changeTaskStatus = (taskId: string, newTaskStatus: boolean, todoListId: string) => {
        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, isDone: newTaskStatus} : t)
        })
    }

    const changeTodoListFilter = (filter: FilterValuesType, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter: filter} : tl))
    }

    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id === todoListId))
        delete tasks[todoListId]
    }
    //GUI:
    const getFilteredTasks = (t: Array<TaskType>, f: FilterValuesType) => {
        let tasksForTodoList = t;
        if (f === "active") {
            tasksForTodoList = t.filter(t => !t.isDone)
        }
        if (f === "completed") {
            tasksForTodoList = t.filter(t => t.isDone)
        }
        return tasksForTodoList
    }
    const todoListComponent = todoLists.map(tl => {
        return (
            <TodoList
                key={tl.id}
                todoListId={tl.id}
                tasks={getFilteredTasks(tasks[tl.id], tl.filter)}
                title={tl.title}
                filter={tl.filter}
                removeTask={removeTask}
                changeTodoListFilter={changeTodoListFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                removeTodoList = {removeTodoList}
            />
        );
    })

    return (
        <div className="App">
            {todoListComponent}
        </div>
    );
}

export default App;
