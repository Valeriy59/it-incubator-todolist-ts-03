import {FilterValuesType, TodolistsType} from "../App";

type RemoveTodolistAT = {
    type: "REMOVE-TODOLIST",
    todolistId: string
}
type AddTodolistAT = {
    type: "ADD-TODOLIST",
    title: string,
    todolistId: string
}
type ChangeTodolistFilterAT = {
    type: "CHANGE-TODOLIST-FILTER",
    todolistId: string,
    filter: FilterValuesType
}
type ChangeTodolistTitleAT = {
    type: "CHANGE-TODOLIST-TITLE",
    todolistId: string,
    title: string
}
type ActionType = RemoveTodolistAT | AddTodolistAT | ChangeTodolistFilterAT | ChangeTodolistTitleAT

// переносим фиункции модификации тудулиста в редьюсер
export const todolistsReducer = (todolists: Array<TodolistsType>, action: ActionType): Array<TodolistsType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todolists.filter(el => el.id !== action.todolistId)
        case "ADD-TODOLIST":
            const newTodolist: TodolistsType = {id: action.todolistId, title: action.title, filter: 'all'}
            return [...todolists, newTodolist]
        case "CHANGE-TODOLIST-FILTER":
            return todolists.map(el => el.id === action.todolistId ? {...el, filter: action.filter} : el)
        case "CHANGE-TODOLIST-TITLE":
            return todolists.map(el => el.id === action.todolistId ? {...el, title: action.title} : el)
        default:
            return todolists
    }
}

export const RemoveTodolistAC = (id: string): RemoveTodolistAT => ({type: "REMOVE-TODOLIST", todolistId: id})
export const AddTodolistAC = (title: string, id: string): AddTodolistAT => ({type: "ADD-TODOLIST", title: title, todolistId: id})
export const ChangeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterAT => ({type: "CHANGE-TODOLIST-FILTER", todolistId: id, filter: filter})
export const ChangeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleAT => ({type: "CHANGE-TODOLIST-TITLE", todolistId: id, title: title})