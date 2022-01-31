import React, {useCallback} from "react";
import {TodoEntity} from "./TodoEntity";
import TodoItem from "./TodoItem";
import TodoAdd from "./TodoAdd";
import {WindowScroller, CellMeasurer, CellMeasurerCache, AutoSizer, List, ListRowProps} from 'react-virtualized';

type props = {
  todoDataArray: TodoEntity[] | [],
  selectDate: string | undefined,
  addTodo(text: string, endDate: string): void,
  deleteTodo(id: string): void,
  checkTodo(id: string, isDone: boolean): void
};

const TodoList = ({todoDataArray, selectDate, addTodo, deleteTodo, checkTodo}: props) => {

  const rowRenderer = useCallback(
    ({index, isScrolling, isVisible, key, style}) => {
      return (
        <TodoItem
          todoData={todoDataArray[index]}
          key={key}
          deleteTodo={deleteTodo}
          checkTodo={checkTodo}
          style={style}
        />
      );
    },
    [deleteTodo, checkTodo, todoDataArray, addTodo],
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
          : (

              <WindowScroller>
                {({height, isScrolling, registerChild, onChildScroll, scrollTop}) => (
                  <AutoSizer disableHeight>
                    {({ width }) => (
                      <div ref={registerChild}>
                        <List
                          autoHeight
                          height={height}
                          isScrolling={isScrolling}
                          onScroll={onChildScroll}
                          overscanRowCount={2}

                          rowCount={todoDataArray.length}
                          rowHeight={84}
                          rowRenderer={rowRenderer}

                          scrollToIndex={-1}
                          scrollTop={scrollTop}

                          style={{ outline: 'none' }}
                          width={width}
                        />
                      </div>
                    )}
                  </AutoSizer>
                )}
              </WindowScroller>

            )
        }
      </ul>
    </>
  );
};

export default React.memo(TodoList);