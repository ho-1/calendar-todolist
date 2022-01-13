import React from 'react';
import {TodoDataEntity} from "./TodoDataEntity";

type TodoItemProps = {
  todoData: TodoDataEntity;
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
      <p>{todoData.text}</p>
      <div>
        <button className="todo-button--edit" onClick={onClickEdit}>수정</button>
        <button className="todo-button--delete" onClick={onClickDelete}>삭제</button>
      </div>
    </li>
  );
};

export default TodoItem;