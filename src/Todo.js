import './Todo.css';
import React, { forwardRef, useState } from 'react';
import { IconButton } from '@material-ui/core';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import db from './firebase';
import { useStateValue } from './StateProvider';
import SendRoundedIcon from '@material-ui/icons/SendRounded';

const Todo = forwardRef(({ id, todo, done, timestamp, changeDone, deleteTodo }, ref) => {
    const [editingMode, setEditingMode] = useState(false);
    const [input, setInput] = useState('');
    const [{ user, mode }] = useStateValue();

    const showEditTodo = (id) => {
        setEditingMode(true);
        setInput(todo);
    }

    const editTodo = e => {
        e.preventDefault();

        db.collection(user?.uid).doc(id).set({
            id: id,
            todo: input,
            done: done,
            timestamp: timestamp,
        });

        setInput('');
        setEditingMode(false);
    }

    return (
        <div ref={ref} className={mode === "dark" ? "todo" : "todo--light"}>
            <input
                className="todo__checkbox"
                type="checkbox"
                checked={done}
                onClick={() => changeDone(id, done, todo, timestamp)}
            />
            {
                editingMode
                    ? <form className={mode === "dark" ? "home__input" : "home__input--light"}>
                        <input
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            placeholder="Edit what you want to do ......"
                            autoFocus={true}
                        />
                        <button onClick={editTodo} style={{ backgroundColor: "transparent", border: "none" }}><SendRoundedIcon style={{ fontSize: 21, color: `${mode === "dark" ? "white" : "black"}` }} /></button>
                    </form>
                    : <h3 className={mode === "dark" ? "todo__text" : "todo__text--light"}>{todo}</h3>
            }
            <div className="todo__options">
                <IconButton onClick={() => showEditTodo(id)}>
                    <EditRoundedIcon className={mode === "dark" ? "todo__editIcon" : "todo__editIcon--light"} />
                </IconButton>
                <IconButton onClick={() => deleteTodo(id)}>
                    <DeleteRoundedIcon className="todo__deleteIcon" />
                </IconButton>
            </div>
        </div>
    )
});

export default Todo;
