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
  edit?: boolean;
}

export interface IUpdate {
  id: number;
  text: string;
}

let nextId = 0;  // Unique key id

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
      date: getDateTime()  // "29/2-24 09:14"
    };

    setTodoList([newPost, ...todoList]);
  }

  const donePost = (id: number) => {  // Toggle done-flag for css
    setTodoList(
      todoList.map( (item) => {
        if (item.id === id) {
          item.done = !item.done;
        }
        return item;
      })
    );
  }

  const moveDown = (id: number) => {
    const index = todoList.map( t => t.id).indexOf(id);
    
    if (index < todoList.length) {
      const post = todoList.splice(index, 1);  // Extract the post

      const newList = [
        ...todoList.slice(0, index + 1),
        post[0],
        ...todoList.splice(index + 1)
      ];
      setTodoList(newList);
    }    
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

  const removePost = (id: number) => {
    setTodoList(
      todoList.filter( (item) => {
        return item.id != id
      })
    );
  }

  const editPost = (id: number) => {
    setTodoList(
      todoList.map( (item) => { 
        if (item.id === id) {
          item.edit = true;
        } else {
          item.edit = false;
        }
        return item;
      })
    );
  }

  const editSave = (changedPost: IUpdate) => {
    setTodoList(
      todoList.map( (t) => {
        if (t.id === changedPost.id) {
          t.todoText = changedPost.text;
          t.edit = false;
        }
        return t;
      })
    );


  }

  const editCancel = (id: number) => {
    setTodoList(
      todoList.map( (t) => {
        if (t.id === id) {
          t.edit = false;
        }
        return t;
      })
    );
  }

   //--- Sorting ---//
   const sortTodoList = (sort: string) => {
    let list;

    switch (sort) {
      case 'author':
        list = sortByAuthor();
        break;
      case 'newest':
        list = sortByNewest();
        break;
      
      default:
        list = sortById();
        break;
    }

    if (list) {
      setTodoList([...list]);
    }
  }

  const sortByAuthor = () => {

    const list = todoList.sort((a, b) => {
      let i = 0;

      if (a.username > b.username) {
        i = 1;
      }
      else if (a.username < b.username) {
        i = -1;
      }
      return i;
    });

    return list;
  }

  const sortById = () => {

    const list = todoList.sort((a, b) => {
      let i = 0;

      if (a.id > b.id) {
        i = 1;
      }
      else if (a.id < b.id) {
        i = -1;
      }
      return i;
    });

    return list;
  }

  const sortByNewest = () => {
    const list = todoList.sort((a, b) => {
      let i = 0;

      if (Number(a.timestamp) < Number(b.timestamp)) {
        i = 1;
      }
      else if (Number(a.timestamp) > Number(b.timestamp)) {
        i = -1;
      }
      return i;
    });

    return list;
  }

  //--- Extra functions ---//
  const getDateTime = () => {
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
            sortPosts={sortTodoList}
            editPost={editPost}
            editSave={editSave}
            editCancel={editCancel}
        />
      </article>
    </>
  );
}
