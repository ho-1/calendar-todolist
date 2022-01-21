import React, {useEffect, useState} from "react";
import TodoList from "../components/todo/TodoList";
import Calendar from "../components/calendar/Calendar";
import {TodoEntity} from "../components/todo/TodoEntity";
import { Link, Outlet } from 'react-router-dom';

const Main = () => {
  const [todoDataArray, setTodoDataArray] = useState<TodoEntity[]>();
  const [selectDate, setSelectDate] = useState<string>();
  const [schedule, setSchedule] = useState<Set<string>>();

  useEffect(() => {
    // 로컬스토리지에서 데이터 불러옴
    const localData = localStorage.getItem("key");

    if (localData) {
      const data: TodoEntity[] = JSON.parse(localData);
      // endDate 값만 따로 모음
      let dates: Set<string> = new Set();
      data.forEach((todo) => {
        if (!todo.done) {
          dates.add(todo.endDate);
        }
      })

      setTodoDataArray(data);
      setSchedule(dates);
    }
  }, []);

  // 날짜 클릭
  const onClickDate = (e: any): void => {
    let elems: Element | null = document.querySelector(".active");
    let ele: HTMLElement | null = document.getElementById(e.target.id);
    // 이전 active 정리
    if(elems !== null){
      elems.classList.remove("active");
    }
    // active 추가
    if (ele !== null) {
      ele.classList.add("active");
    }
    setSelectDate(e.target.id);
  }

  return (
    <div className="wrap">
      <Outlet />
      <Link to="/allTodo">모든 목록</Link>
      <Calendar schedule={schedule} onClickDate={onClickDate} />
      <TodoList todoDataArray={todoDataArray} selectDate={selectDate}/>
    </div>
  )
}

export default Main;