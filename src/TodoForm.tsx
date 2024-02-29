
import { useState } from 'react';
import './TodoForm.css'
import { IData } from './App';

interface INewPost {
    addPost: (todoPost: IData) => void;
}

export function TodoForm(props: INewPost) {

    const [todoText, setTodoText] = useState("");
    const [username, setUsername] = useState("");

    const handleOnSubmit:React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        // console.log('Submit: ' + todoText + ', ' + username);

        if (todoText != '') {
            const todoPost: IData = {
                id: 0,
                todoText,
                username
            }

            setTodoText("");
            setUsername("");
            props.addPost(todoPost);
        }
    }

    
    return <>
        <form onSubmit={handleOnSubmit}>
            <div className="block adding">
                    <input type="text" placeholder="Todo text" autoComplete='off'
                        id="todoText"
                        onChange={(e) => setTodoText(e.target.value)}
                        value={todoText}></input>
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