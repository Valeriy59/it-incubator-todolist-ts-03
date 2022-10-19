import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    changeTitle: (newTitle: string) => void
}
// component which can change its title on double mouse click
// create local state to edit title
export const EditableSpan = (props: EditableSpanPropsType) => {
    // set old title to local state. input shows local state
    const [title, setTitle] = useState(props.title)
    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const onEditMode = () => {
        setIsEditMode(true)
    }
    const offEditMode = () => {
        setIsEditMode(false)
        props.changeTitle(title) // callback to transfer title to Todolist
    }

    // set title to local state
    const onChangeSetLocalState = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return (
        isEditMode
        ? <input value={title} autoFocus onBlur={offEditMode} onChange={onChangeSetLocalState}/>
        : <span onDoubleClick={onEditMode}>{props.title}</span>
    )
}