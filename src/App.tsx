import './App.css'
import { CreateTodo } from './CreateTodo';
import { TodoList } from './TodoList';

export interface IData {
  todoText: string;
  username: string;
  // date: string;
}

const addPost = (todoPost: IData) => {
  console.log('todoPost', todoPost);
}

export function App() {
  return (
    <>
      <article className="todo-container">
        <h1>Todo List</h1>

        <CreateTodo addPost={addPost} />
        <TodoList />

      </article>
    </>
  );
}
