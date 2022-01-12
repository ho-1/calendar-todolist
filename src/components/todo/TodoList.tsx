import React from "react";
import {TodoDataInterface} from "./TodoDataInterface";
import TodoItem from "./TodoItem";

type TodoListProps = {
  todoDataArray: TodoDataInterface[] | undefined,
  selectDate: string | undefined,
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
            // eslint-disable-next-line array-callback-return
          : ( todoDataArray?.map(i => {
                return i.endDate === selectDate ? <TodoItem todoData={i}/> : ""
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