import React from 'react';
import {TodoDataInterface} from "./TodoDataInterface";

const TodoItem = ({ todoData }: any) => {
  return (
    <li className="todo-list__box">
      <p>{todoData.text}</p>
      <div>
        <button className="todo-button--edit">수정</button>
        <button className="todo-button--delete">삭제</button>
      </div>
    </li>
  );
};

export default TodoItem;