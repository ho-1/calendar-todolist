import React, {useCallback, useEffect, useState} from "react";
import TodoList from "../components/todo/TodoList";
import Calendar from "../components/calendar/Calendar";
import {TodoEntity} from "../components/todo/TodoEntity";
import {Link} from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';

const Main = () => {
  const [todoDataArray, setTodoDataArray] = useState<TodoEntity[]>(() => {
    const localData: string | null = localStorage.getItem("key");
    if (localData) {
      const data: TodoEntity[] = JSON.parse(localData);
      return data;
    } else {
      return [];
    }
    // const arr = [];
    // for(let i = 0; i < 2500; i++) {
    //   let ob={
    //     id: i+"",
    //     text: "할일입니다" + i,
    //     endDate: "2022-02-01",
    //     done: false,
    //   };
    //   arr.push(ob);
    // }
    // return arr;
  });
  const [viewDatas, setViewDatas] = useState<TodoEntity[]>(() => { // 보여줄 리스트의 배열
    return [];
  });
  const [selectDate, setSelectDate] = useState<string>(); // 사용자가 선택한 날짜
  const [schedule, setSchedule] = useState<Set<string>>(); // 할 일이 있는 날짜의 배열

  useEffect(() => {
    if (todoDataArray) {
      let dates: Set<string> = new Set();
      todoDataArray.forEach((todo) => {
        if (!todo.done) {
          dates.add(todo.endDate);
        }
      })
      setSchedule(dates);
    }
  }, [todoDataArray])

  // 날짜 선택 시 TodoList에 전달되는 viewDatas 배열 데이터 변경
  useEffect(() => {
    const filterDatas = todoDataArray?.filter(todo => todo.endDate === selectDate);
    setViewDatas(filterDatas);
  }, [selectDate, todoDataArray]);
  
  // 날짜 클릭
  const onClickDate = (date: string): void => {
    if (date !== selectDate) {
      // 이전 active 정리
      const active: Element | null = document.querySelector(".active");
      if (active !== null) {
        active.classList.remove("active");
      }
      const clicked: HTMLElement | null = document.getElementById(date);
      // active 추가
      if (clicked !== null) {
        clicked.classList.add("active");
      }
      setSelectDate(date);
    }
  }

  // 추가
  const addTodo = useCallback((text: string, endDate: string): void => {
    const id = uuidv4();
    const newTodo: TodoEntity = {
      id,
      text,
      endDate,
      done: false
    }

    if (todoDataArray) {
      setTodoDataArray([...todoDataArray, newTodo]);
    } else {
      setTodoDataArray([newTodo]);
    }

    localStorage.setItem("key", JSON.stringify([...todoDataArray, newTodo]));
    console.log(`create ${newTodo.text}, ${newTodo.endDate}, ${newTodo.id}`);
  }, [todoDataArray]);

  // 삭제
  const deleteTodo = useCallback((id: string): void => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      const newTodo: TodoEntity[] = todoDataArray.filter((todo) => todo.id !== id);
      setTodoDataArray(newTodo);
      localStorage.setItem("key", JSON.stringify([...newTodo]));
      console.log(id + ' delete');
    }
  }, [todoDataArray]);

  // 체크
  const checkTodo = useCallback((id: string, isDone: boolean): void => {
    let newTodo: TodoEntity[] = [];
    todoDataArray.forEach((todo) => {
      if (todo.id === id) {
        todo.done = isDone;
      }
      newTodo.push(todo);
    });
    setTodoDataArray(newTodo);
    localStorage.setItem("key", JSON.stringify([...newTodo]));
    console.log(id + ' ischeck? ' + isDone);
  }, [todoDataArray]);

  return (
    <div className="wrap">
      <Calendar
        schedule={schedule}
        onClickDate={onClickDate}
      />
      <TodoList
        todoDataArray={viewDatas}
        selectDate={selectDate}
        addTodo={addTodo}
        deleteTodo={deleteTodo}
        checkTodo={checkTodo}
      />
    </div>
  )
}

export default Main;