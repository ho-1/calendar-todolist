import React, {useState} from "react";
import {TodoEntity} from "./TodoEntity";
import TodoItem from "./TodoItem";
import TodoAdd from "./TodoAdd";

type props = {
  todoDataArray: TodoEntity[] | undefined,
  selectDate: string | undefined,
};

const TodoList = ({ todoDataArray, selectDate }: props) => {




  return (
    <>
      <div>
        <h4>{!selectDate ?
          "" :
          selectDate + " Todo"}</h4>
      </div>

      {/*투두 리스트*/}
      <ul className="todo-list">
        {
          !selectDate
          ? ""
          : ( todoDataArray?.map(i => {
                return i.endDate === selectDate && <TodoItem todoData={i} key={i.id}/>
              })
            )
        }
      </ul>

      {!selectDate || <TodoAdd />}
    </>
  );
};

export default TodoList;