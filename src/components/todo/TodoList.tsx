import React, {useCallback} from "react";
import {TodoEntity} from "./TodoEntity";
import TodoItem from "./TodoItem";
import TodoAdd from "./TodoAdd";
import { List } from "react-virtualized";

type props = {
  todoDataArray: TodoEntity[] | [],
  selectDate: string | undefined,
  addTodo(text: string, endDate: string): void,
  deleteTodo(id: string): void,
  checkTodo(id: string, isDone: boolean): void
};

const TodoList = ({todoDataArray, selectDate, addTodo, deleteTodo, checkTodo}: props) => {

  const rowRenderer = useCallback(
    ({index, key, style}) => {
      const todo = todoDataArray[index];
      return (
        <TodoItem
          todoData={todo}
          key={key}
          deleteTodo={deleteTodo}
          checkTodo={checkTodo}
          style={style}
        />
      );
    },
    [deleteTodo, checkTodo, todoDataArray],
  );

  return (
    <>
      <div>
        <h4>{
          (selectDate && selectDate !== "all") && selectDate + " Todo"
        }</h4>
      </div>
      {!selectDate || <TodoAdd selectDate={selectDate} addTodo={addTodo}/>}

      {/*투두 리스트*/}
      <ul className="todo-list">
        {
          !selectDate
          ? ""
          : <List
              width={368}
              height={500}
              rowCount={todoDataArray.length}
              rowHeight={52}
              rowRenderer={rowRenderer}
              list={todoDataArray}
              style={{ outline: 'none' }}
            />
        }
      </ul>
    </>
  );
};

export default React.memo(TodoList);