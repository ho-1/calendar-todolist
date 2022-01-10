import React, { useState } from "react";

type TodoListProps = {
  selectDate: number | undefined,
};

const TodoList = ({ selectDate }: TodoListProps) => {


  const onClickEdit = (id: number): void => {
    console.log("edit: " + id);
  }

  const onClickDelete = (id: number): void => {
    console.log("delete: " + id);
  }

  return (
    <>
      <div>
        <h4>{!selectDate ? "" : selectDate + " Todo"}</h4>
      </div>
      <ul className="todo-list">
        <li className="todo-list__box">
          <p>context 추가하기</p>
          <div>
            <button className="todo-button--edit" onClick={() => onClickEdit(1)}>수정</button>
            <button className="todo-button--delete" onClick={() => onClickDelete(1)}>삭제</button>
          </div>
        </li>
        <li className="todo-list__box">
          <p>typescript 공부</p>
          <div>
            <button className="todo-button--edit">수정</button>
            <button className="todo-button--delete">삭제</button>
          </div>
        </li>
      </ul>
      <button className="todo-list__box" type="submit">
        + 추가하기
      </button>
    </>
  );
};

export default TodoList;