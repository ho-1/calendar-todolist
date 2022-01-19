import React from 'react';
import {TodoEntity} from "./TodoEntity";

type TodoItemProps = {
  todoData: TodoEntity;
}

const TodoItem = ({ todoData }: TodoItemProps) => {
  // TODO 수정
  const onClickEdit = (e: any): void => {
    console.log("edit");
    console.log(e);
  }
  // TODO 삭제
  const onClickDelete = (e: any): void => {
    console.log("delete");
    console.log(e);
  }

  return (
    <li className="todo-list__box">
      <div className="flex-center-center">
        <input type="checkbox" id="todo0" name="todo0" checked={todoData.done} />
        <p>{todoData.text}</p>
      </div>
      <div>
        <button className="todo-button--edit" onClick={onClickEdit}>수정</button>
        <button className="todo-button--delete" onClick={onClickDelete}>삭제</button>
      </div>
    </li>
  );
};

export default TodoItem;