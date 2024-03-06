import { useState } from 'react';
import { IData, IUpdate } from './App'
import { EditForm } from './EditForm';
import './TodoList.css'

export interface ITodoListProps {
    todoList: IData[];
    removePost: (id: number) => void;
    donePost: (id: number) => void;
    moveUp: (id: number) => void;
    moveDown: (id: number) => void;
    sortPosts: (sort: string) => void;
    editPost: (id: number) => void;
    editSave: (item: IUpdate) => void;
    editCancel: (id: number) => void;
}

export function TodoList(props: ITodoListProps): JSX.Element {
    const list = props.todoList;

    const [sorting, setSorting] = useState("");  // newest

    const handleSort: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
        props.sortPosts(event.target.value);
        // document.activeElement.blur();  // Remove focus...?

        setSorting(event.target.value);
    }

    return (
        <section className='block todo-list'>
            <header className='header'>
                <h2>Todos:</h2>
                {list.length > 0 ?
                    <select name="sortOrder" id="sortOrder" onChange={handleSort} value={sorting}>
                        <option value="">Sort order</option>
                        <option value="author">author</option>
                        <option value="newest" selected>newest</option>
                    </select>
                    : "" }
            </header>

            <section className='todo-content'>
                {list.map((item) => {
                    const classesItem = item.done ? "todo-item done" : "todo-item";  // Mark if todo is done

                    return (
                        <div className={classesItem} key={item.id}>
                            <div className='todoText'> 
                                { item.edit
                                    ? <EditForm text={item.todoText} id={item.id}  editSave={props.editSave} editCancel={props.editCancel} />
                                    : item.todoText }
                            </div>
                                
                            <div className='info'>
                                <div className='data'>
                                    <div>{item.username}</div>
                                    <div>{item.date}</div>
                                </div>
                                <div className='controller'>
                                    <i className="fas fa-pen edit" onClick={() => {props.editPost(item.id)} }></i>
                                    <i className="fas fa-arrow-up up" onClick={() => {props.moveUp(item.id)} }></i>
                                    <i className="fas fa-arrow-down down" onClick={() => {props.moveDown(item.id)} }></i>
                                    <i className="fas fa-trash-alt remove" onClick={() => {props.removePost(item.id)} }></i>
                                    <i className="fas fa-check done" onClick={() => {props.donePost(item.id)} }></i>
                                </div>
                            </div>
                        </div> 
                    );
                })}
            </section>
        </section>
    )
}
