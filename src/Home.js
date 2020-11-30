import './Home.css'
import React, { useEffect, useState } from 'react';
import Todo from './Todo';
import FlipMove from 'react-flip-move';
import PostAddRoundedIcon from '@material-ui/icons/PostAddRounded';
import db from './firebase';
import { useStateValue } from './StateProvider';
import firebase from 'firebase';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import { messaging } from './firebase';

const Home = () => {
    const [input, setInput] = useState('');
    const [todos, setTodos] = useState([]);
    const [{ user, mode }] = useStateValue();

    useEffect(() => {
        messaging.requestPermission().then(() => messaging.getToken({ vapidKey: "BKxxoSD25v2O0-iEDxE9Mjpx3t6q4Ef_Sp-30_3JJlsKq6O6sIHwc5cV95L4ExmldPltm9VW8qkYhDPyYk7yaoE" })).then(token => console.log(token));
    }, []);

    useEffect(() => {
        db.collection(user?.uid).orderBy('timestamp').onSnapshot(snapshot => {
            setTodos(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            })))
        })
    }, [user?.uid]);

    const addTodo = e => {
        e.preventDefault();

        db.collection(user?.uid).add({
            done: 0,
            todo: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });

        setInput('');
    }

    const deleteTodo = (id) => {
        db.collection(user?.uid).doc(id).delete();
    }

    const changeDone = (id, done, todo, timestamp) => {
        db.collection(user?.uid).doc(id).set({
            id: id,
            done: done === 0 ? 1 : 0,
            todo: todo,
            timestamp: timestamp,
        });
    }

    return (
        <div className={mode === "dark" ? "home" : "home--light"}>
            <div className={mode === "dark" ? "home__inputContainer" : "home__inputContainer--light"}>
                <div className={mode === "dark" ? "home__inputTitle" : "home__inputTitle--light"}>
                    <PostAddRoundedIcon className="home__inputIcon" />&nbsp;&nbsp;<h2>Add a new TODO!</h2>
                </div>
                <form className={mode === "dark" ? "home__input" : "home__input--light"}>
                    <input
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder="Enter what you want to do ......"
                        autoFocus={true}
                    />
                    <button onClick={addTodo} style={{ backgroundColor: "transparent", border: "none" }}><SendRoundedIcon style={{ fontSize: 21, color: `${mode === "dark" ? "white" : "black"}` }} /></button>
                </form>
            </div>
            {
                todos.length === 0
                    ? <div className="home__noTodosContainer">
                        <h2 className={mode === "dark" ? "home__noTodos" : "home__noTodos--light"}>N</h2>
                        <h2 className={mode === "dark" ? "home__noTodos" : "home__noTodos--light"}>O</h2>
                        <h2 className="home__noTodosBlank">&nbsp;</h2>
                        <h2 className={mode === "dark" ? "home__noTodos" : "home__noTodos--light"}>T</h2>
                        <h2 className={mode === "dark" ? "home__noTodos" : "home__noTodos--light"}>O</h2>
                        <h2 className={mode === "dark" ? "home__noTodos" : "home__noTodos--light"}>D</h2>
                        <h2 className={mode === "dark" ? "home__noTodos" : "home__noTodos--light"}>O</h2>
                        <h2 className={mode === "dark" ? "home__noTodos" : "home__noTodos--light"}>S</h2>
                        <h2 className="home__noTodosBlank">&nbsp;</h2>
                        <h2 className={mode === "dark" ? "home__noTodos" : "home__noTodos--light"}>😲</h2>
                    </div>
                    : <></>
            }
            <FlipMove>
                {
                    todos.map(({ id, data }) => <Todo key={id} id={id} todo={data.todo} done={data.done} timestamp={data.timestamp} changeDone={changeDone} deleteTodo={deleteTodo} />)
                }
            </FlipMove>
        </div>
    )
}

export default Home;
