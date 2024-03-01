import { IData } from './App'
import './TodoList.css'

export interface ITodoListProps {
    todoList: IData[];
    removePost: (id: number) => void;
    donePost: (id: number) => void;
    moveUp: (id: number) => void;
    moveDown: (id: number) => void;
    sortPosts: (sort: string) => void;
    editPost: (id: number) => void;
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

    const handleSort: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
        // console.log('sortOrder: ' + event.target.value);
        props.sortPosts(event.target.value);
        // document.activeElement.blur();  // Remove focus
    }

    const handleClickEdit: React.MouseEventHandler<HTMLElement> = (event) => {
        console.log('--> handleClickUpdate() ' + event.currentTarget.id);
        props.editPost(parseInt(event.currentTarget.id));
    }

    return (
        <section className='block todo-list'>
            <header className='header'>
                <h2>Todos:</h2>
                <select name="sortOrder" id="sortOrder" onChange={handleSort}>
                    {/* <option value="">Sort order</option> */}
                    <option value="author">author</option>
                    <option value="latest" selected>latest</option>
                </select>
            </header>

            <section className='todo-content'>
                {list.map((item) => {
                    { console.log(item) }
                    const stringId: string = item.id.toString();  // Set id on controllers
                    const classesItem = item.done ? "todo-item done" : "todo-item";  // Mark if todo is done

                    return (
                        <div className={classesItem} key={item.id}>
                            <div className='todoText'>{item.todoText} {item.edit ? 'EDIT' : null}</div>
                            <div className='info'>
                                <div className='data'>
                                    <div>{item.username}</div>
                                    <div>{item.date}</div>
                                </div>
                                <div className='controller'>
                                    <i className="fas fa-pen edit" onClick={handleClickEdit} id={stringId}></i>
                                    <i className="fas fa-arrow-up up" onClick={handleOnClickUp} id={stringId}></i>
                                    <i className="fas fa-arrow-down down" onClick={handleOnClickDown} id={stringId}></i>
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
