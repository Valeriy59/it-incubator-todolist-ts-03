import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem, Typography} from "@material-ui/core";
import {CheckBox, HighlightOff} from "@material-ui/icons";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todoListId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todoListId: string, taskId: string) => void
    changeFilter: (todoListId: string, value: FilterValuesType) => void
    addTask: (todoListId: string, title: string) => void
    changeTaskStatus: (todoListId: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    removeTodoList: (todoListId: string) => void
    changeTaskTitle: (todoListId: string, taskId: string, title: string) => void
    changeTodolistTitle: (todoListId: string, title: string) => void
}

export function Todolist(props: PropsType) {

    const addTask = (title: string) => {
        props.addTask(props.todoListId, title);
    }
    const onAllClickHandler = () => props.changeFilter(props.todoListId, "all");
    const onActiveClickHandler = () => props.changeFilter(props.todoListId, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.todoListId, "completed");
    const removeTodoListOnHandler = () => props.removeTodoList(props.todoListId)
    const changeTodolistTitle = (title: string) => props.changeTodolistTitle(props.todoListId, title)
    return <div style={{width: "300px"}}>
        <Typography variant={"h5"} align={"center"} style={{justifyContent: "space-between", marginBottom: "20px"}} >

                {/*{props.title}*/}
                <EditableSpan title={props.title} changeTitle={changeTodolistTitle}/>
                <IconButton onClick={removeTodoListOnHandler}><HighlightOff/></IconButton>

        </Typography>
        <AddItemForm addItem={addTask}/>
        <List>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(props.todoListId, t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todoListId, t.id, e.currentTarget.checked);
                    }
                    const changeTaskTitle = (title: string) => props.changeTaskTitle(props.todoListId, t.id, title)
                    return <ListItem
                        style={{
                            padding: '0px',
                            justifyContent: 'space-between',
                            // textDecoration: t.isDone ? "is-done" : ""
                        }}
                        key={t.id}
                        className={t.isDone ? "is-done" : ""}
                    >
                        <Checkbox
                            color={'primary'}
                            onChange={onChangeHandler}
                            checked={t.isDone}
                           />
                        <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                        <IconButton onClick={onClickHandler}><HighlightOff/></IconButton>
                    </ListItem>
                })
            }
        </List>
        <div>
            <ButtonGroup
                variant={'contained'}
                size={'small'}
                fullWidth
                disableElevation>
                <Button
                    color={props.filter === 'all' ? "secondary" : "primary"}
                    style={{marginRight: "3px"}}
                    onClick={onAllClickHandler}>All
                </Button>
                <Button
                    color={props.filter === 'active' ? "secondary" : "primary"}
                    style={{marginRight: "3px"}}
                    onClick={onActiveClickHandler}>Active
                </Button>
                <Button
                    color={props.filter === 'completed' ? "secondary" : "primary"}
                    style={{marginRight: "3px"}}
                    onClick={onCompletedClickHandler}>Completed
                </Button>
            </ButtonGroup>
        </div>
    </div>
}
