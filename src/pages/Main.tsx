import React, {useEffect, useState} from "react";
import TodoList from "../components/todo/TodoList";
import Calendar from "../components/calendar/Calendar";

const Main = () => {
  const [selectDate, setSelectDate] = useState<number>();

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
      <TodoList selectDate={selectDate}/>
    </div>
  )
}

export default Main;