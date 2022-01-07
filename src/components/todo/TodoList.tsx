import React, { useState } from "react";

type TodoListProps = {
  selectDate: number | undefined,
};

const TodoList = ({ selectDate }: TodoListProps) => {
  const [open, setOpen] = useState(false);

  const onToggle = () => setOpen(!open);

  // 선택된 날짜의 todolist 받아오기

  function DateInput() {
    if (!selectDate) {
      return <input type="date" />
    } else {
      return <input type="date" disabled/>
    }
  }

  return (
    <>
      <div>
        <h4>{!selectDate ? "" : selectDate + " Todo"}</h4>
      </div>
      <ul className="todo-list">
        <li>context 추가하기</li>
      </ul>
      <div className="todo-form">
        <button onClick={onToggle}>{open ? "X" : "열기"}</button>
        {open && <DateInput />}
        {open && <input type="text" />}
      </div>
    </>
  );
};

export default TodoList;