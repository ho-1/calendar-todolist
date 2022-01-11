import React, {useEffect, useState} from "react";
import TodoList from "../components/todo/TodoList";
import Calendar from "../components/calendar/Calendar";
import {TodoDataInterface} from "../components/todo/TodoDataInterface";


const Main = () => {
  const [todoDataArray, setTodoDataArray] = useState<TodoDataInterface[]>();
  const [selectDate, setSelectDate] = useState<number>();

  useEffect(() => {

    // 임시 값
    setTodoDataArray([{
      id: 1,
      text: '자바 공부',
      endDate: '2022-01-01',
    }, {
      id: 2,
      text: '컴포넌트 패턴 공부',
      endDate: '2022-01-05',
    }]);

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
      <Calendar onClickDate={onClickDate}/>
      <TodoList todoDataArray={todoDataArray} selectDate={selectDate}/>
    </div>
  )
}

export default Main;