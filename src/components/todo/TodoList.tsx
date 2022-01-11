import React from "react";
import {TodoDataInterface} from "./TodoDataInterface";
import TodoItem from "./TodoItem";

type TodoListProps = {
  todoDataArray: TodoDataInterface[] | undefined,
  selectDate: number | undefined,
};

const TodoList = ({ todoDataArray, selectDate }: TodoListProps) => {

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
        {todoDataArray?.map((todoData: TodoDataInterface) =>
          <TodoItem todoData={todoData} />
        )}
      </ul>
      {!selectDate ?
        "" :
        <button className="todo-list__box" type="submit">
          + 추가하기
        </button>
      }
    </>
  );
};

export default TodoList;