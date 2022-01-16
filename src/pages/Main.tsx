import React, {useEffect, useState} from "react";
import TodoList from "../components/todo/TodoList";
import Calendar from "../components/calendar/Calendar";
import {TodoEntity} from "../components/todo/TodoEntity";

// 로컬스토리지에 데이터 저장
const dataArr = [{
  id: 1,
  text: '자바 공부',
  endDate: '2022-01-01',
  done: false,
}, {
  id: 2,
  text: '자바스크립트 고급강의',
  endDate: '2022-01-05',
  done: true,
}, {
  id: 3,
  text: '컴포넌트 패턴 공부',
  endDate: '2022-01-05',
  done: true,
}, {
  id: 4,
  text: '리액트 공부',
  endDate: '2022-02-13',
  done: false,
}, {
  id: 5,
  text: '리액트 공부',
  endDate: '2022-01-18',
  done: false,
}]
localStorage.setItem("key", JSON.stringify(dataArr));

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
    if(elems !==null){
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
      <Calendar schedule={schedule} onClickDate={onClickDate} />
      <TodoList todoDataArray={todoDataArray} selectDate={selectDate}/>
    </div>
  )
}

export default Main;