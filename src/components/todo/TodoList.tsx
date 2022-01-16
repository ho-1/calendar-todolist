import React from "react";
import {TodoEntity} from "./TodoEntity";
import TodoItem from "./TodoItem";

type TodoListProps = {
  todoDataArray: TodoEntity[] | undefined,
  selectDate: string | undefined,
};

const TodoList = ({ todoDataArray, selectDate }: TodoListProps) => {



  return (
    <>
      {/*타이틀*/}
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
                return i.endDate === selectDate ? <TodoItem todoData={i} key={i.id}/> : ""
              })
            )
        }
      </ul>

      {/*추가하기 버튼*/}
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