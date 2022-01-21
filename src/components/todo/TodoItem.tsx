import React, {useState} from 'react';
import {TodoEntity} from "./TodoEntity";

type props = {
  todoData: TodoEntity;
}

const TodoItem = ({ todoData }: props) => {
  const [isChecked, serIsChecked] = useState(todoData.done);

  const handleCheck = (e: any): void => {
    serIsChecked(!isChecked);
    console.log(todoData.id +" "+ isChecked);
  }

  const handleDelete = (e: any): void => {
    console.log("delete");
    console.log(e.target);
  }

  return (
    <li className="todo-list__box">
      <div className="flex justify-center items-center">
        <input type="checkbox" id="todo0" name="todo0" onChange={handleCheck} checked={isChecked} />
        <p>{todoData.text}</p>
      </div>
      <div>
        <button className="todo-button--delete" onClick={handleDelete}>삭제</button>
      </div>
    </li>
  );
};

export default TodoItem;