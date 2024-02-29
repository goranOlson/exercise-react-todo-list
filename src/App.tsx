import './App.css'
import { TodoForm } from './TodoForm';
import { TodoList } from './TodoList';
import { useState } from 'react';

export interface IData {
  id: number;
  todoText: string;
  username: string;
  timestamp?: number;
  date?: string;
  done?: boolean | false;
}

let nextId = 0;  // Key id


export function App() {
  const initData: IData[] = [
    {id: 100, todoText: "First", username: "Bertil", timestamp: 1709216334173,  date: "28/2-24 15:01"},
    {id: 101, todoText: "Second", username: "Åke", timestamp: 1709216334999, date: "28/2-24 15:02"}
  ];

  const [todoList, setTodoList] = useState<IData[]>([]);  // [], initData

  const addPost = (todoPost: IData) => {
    const time = new Date();

    const newPost: IData = {
      id: nextId++,
      todoText: todoPost.todoText,
      username: todoPost.username,
      timestamp: time.valueOf(),
      date: today()  // "29/2-24 09:14"
    };
    // console.log('next: ', next);
    
    setTodoList([newPost, ...todoList]);
  }

  const removePost = (id: number) => {
    // console.log('--> removePost()...' + id);

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

    // return 1;
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

  const sortPosts = (sort: string) => {
    let list;

    if (sort === 'author') {
        list = todoList.sort((a, b) => {
            let i = 0;

            if (a.username > b.username) {
              i = 1;
            }
            else if (a.username < b.username) {
              i = -1;
            }

            return i;
        });
    }
    else if (sort === 'latest') {
        list = todoList.sort((a, b) => {
            let i = 0;

            if (Number(a.timestamp) < Number(b.timestamp)) {
              i = 1;
            }
            else if (Number(a.timestamp) > Number(b.timestamp)) {
              i = -1;
            }

            return i;
        });
    }
    else {
      // Sort by id
      list = todoList.sort((a, b) => {
        let i = 0;

        if (a.id > b.id) {
          i = 1;
        }
        else if (a.id < b.id) {
          i = -1;
        }

        return i;
    });
    }

    if (list) {
      
      // list = [...list];  // Generate new 'list'
      // console.log('>> list - ' + sort, list);
      setTodoList( [...list] );
    }
  }

  const today = () => {
    var d = new Date();

    var datestring = d.getDate()  + "/" + (d.getMonth()+1) + "-" + d.getFullYear().toString().substring(2) + " " +
    d.getHours() + ":" + d.getMinutes();

    return datestring;  // "29/2-24 09:14"
  }


  return (
    <>
      <article className="todo-container">
        <h1>Todo List</h1>
        <TodoForm addPost={addPost} />
        <TodoList 
            todoList={todoList} 
            removePost={removePost} 
            donePost={donePost} 
            moveUp={moveUp}
            moveDown={moveDown}
            sortPosts={sortPosts}
        />
      </article>
    </>
  );
}
