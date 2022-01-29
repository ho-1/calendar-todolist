import React, {useState} from 'react';
import {TodoEntity} from "./TodoEntity";

type props = {
  todoData: TodoEntity,
  deleteTodo(id: string): void,
  checkTodo(id: string, isDone: boolean): void
}

const TodoItem = ({ todoData, deleteTodo, checkTodo }: props) => {
  const { id, text, done } = todoData;

  const [isChecked, serIsChecked] = useState(done);

  const handleCheck = (isDone: boolean): void => {
    serIsChecked(isDone);
    checkTodo(id, isDone);
  }

  const handleDelete = (): void => {
    deleteTodo(id);
  }

  return (
    <li className="todo-list__box" >
      <div className="flex justify-center items-center">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => {
            handleCheck(!isChecked);
          }}
        />
        <p>{text}</p>
      </div>
      <div>
        <button
          className="todo-button--delete"
          onClick={handleDelete}
        >삭제
        </button>
      </div>
    </li>
  );
};

export default React.memo(TodoItem);