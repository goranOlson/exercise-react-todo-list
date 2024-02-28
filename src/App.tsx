import './App.css'
import { CreateTodo } from './Todos';
import { TodoList } from './TodoList';
import { useState } from 'react';



export interface IData {
  id: number;
  todoText: string;
  username: string;
  date?: string;
  done?: boolean | false;
}

let nextId = 0;  // Key id


export function App() {
  const initData: IData[] = [
    {id: 100, todoText: "First", username: "Nisse", date: "28/2-24 15:01"},
    {id: 101, todoText: "Second", username: "Mulle", date: "28/2-24 15:02"}
  ];

  const [todoList, setTodoList] = useState<IData[]>(initData);  // []

  const addPost = (todoPost: IData) => {
    const next: IData = {
      id: nextId++,
      todoText: todoPost.todoText,
      username: todoPost.username,
      date: new Date().toLocaleString().substring(0, 16) // 
    };
  
    setTodoList([next, ...todoList]);
  }

  const removePost = (id: number) => {
    console.log('--> removePost()...' + id);

    setTodoList(
      todoList.filter( (item) => {
        return item.id != id
      })
    );
    // console.log('todoList', todoList);
  }

  const donePost = (id: number) => {
    // Toggle done-flag for css
    setTodoList(
      todoList.filter( (item) => {
        if (item.id === id) {
          console.log('done: ' + item.done);
          item.done = !item.done;
        }
        return item;
      })
    );

    return 1;
  }

  const moveUp = (id: number) => {
    const index = todoList.map( t => t.id).indexOf(id);

    if (index > 0) {
      const target = todoList.splice(index, 1);  // Extract post

      const newList = [
        ...todoList.slice(0, index - 1),
        target[0],
        ...todoList.splice(index - 1)
      ];

      setTodoList(newList);
    }
  }

  const moveDown = (id: number) => {
    const index = todoList.map( t => t.id).indexOf(id);
    
    if (index < todoList.length) {
      const post = todoList.splice(index, 1);  // Extract post

      const newList = [
        ...todoList.slice(0, index + 1),
        post[0],
        ...todoList.splice(index + 1)
      ];
      setTodoList(newList);
    }    
  }

  return (
    <>
      <article className="todo-container">
        <h1>Todo List</h1>

        <CreateTodo addPost={addPost} />
        <TodoList 
            todoList={todoList} 
            removePost={removePost} 
            donePost={donePost} 
            moveUp={moveUp}
            moveDown={moveDown}
        />
      </article>
    </>
  );
}
