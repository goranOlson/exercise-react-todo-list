
import { useState } from 'react';
import './CreateTodo.css'
import { IData } from './App';

interface INewPost {
    addPost: (todoPost: IData) => void;
}

export function CreateTodo(props: INewPost) {

    const [todoText, setTodoText] = useState("");
    const [username, setUsername] = useState("");

    const handleOnSubmit:React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        console.log('Submit: ' + todoText + ', ' + username);

        const todoPost: IData = {
            todoText,
            username
        }
        props.addPost(todoPost);
    }


    return <>
            <form onSubmit={handleOnSubmit}>
                <div className="adding">
                    <input type="text" placeholder="Todo text"
                        id="todoText" onChange={(e) => setTodoText(e.target.value)} value={todoText}></input>
                    <div className='row-bottom'>
                        <input type="text" placeholder="Username" 
                            id="user"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}></input>
                        <button type='submit'>Create</button>
                    </div>
                </div>
            </form>
    </>
}