import { IData } from './App'
import './TodoList.css'

export interface ITodoListProps {
    todoList: IData[];
    removePost: (id: number) => void;
    donePost: (id: number) => void;
    moveUp: (id: number) => void;
    moveDown: (id: number) => void;
}

export function TodoList(props: ITodoListProps): JSX.Element {
    const list = props.todoList;

    const handleOnRemoveClick: React.MouseEventHandler<HTMLButtonElement>  = (event) => {
        props.removePost(parseInt(event.currentTarget.id));
    };

    const handleOnClickDone: React.MouseEventHandler<HTMLButtonElement>  = (event) => {
        props.donePost(parseInt(event.currentTarget.id));
    }

    const handleOnClickUp: React.MouseEventHandler<HTMLButtonElement>  = (event) => {
        props.moveUp(parseInt(event.currentTarget.id));
    }

    const handleOnClickDown: React.MouseEventHandler<HTMLButtonElement>  = (event) => {
        props.moveDown(parseInt(event.currentTarget.id));
    }

    return (
        <section className='block todo-list'>
            <h2>Todos:</h2>
            <section className='todo-content'>
                {list.map((item) => {
                    const stringId: string = item.id.toString();  // Set id on controllers
                    const classesItem = item.done ? "todo-item done" : "todo-item";  // Mark if todo is done

                    return (
                        <div className={classesItem} key={item.id}>
                            <div className='todoText'>{item.todoText}</div>
                            <div className='info'>
                                <div className='data'>
                                    <div>{item.username}</div>
                                    <div>{item.date}</div>
                                </div>
                                <div className='controller'>
                                    <i className="fa fa-arrow-up up" onClick={handleOnClickUp} id={stringId}></i>
                                    <i className="fa fa-arrow-down down" onClick={handleOnClickDown} id={stringId}></i>
                                    <i className="fas fa-trash-alt remove" onClick={handleOnRemoveClick} id={stringId}></i>
                                    <i className="fas fa-check done" onClick={handleOnClickDone} id={stringId}></i>
                                </div>
                            </div>
                        </div> 
                    );
                })}
            </section>
        </section>
    )
}
