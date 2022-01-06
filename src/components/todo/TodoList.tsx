import React from "react";

type TodoListProps = {
  selected: number | undefined;
};

const TodoList = ({ selected }: TodoListProps) => {

  return (
    <>
      <div>
        <h4>{!selected ? "" : selected + " Todo"}</h4>
      </div>
      <div>

        <button>추가하기</button>
      </div>
    </>
  );
};

export default TodoList;