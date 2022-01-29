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
  });
  const [viewData, setViewData] = useState<TodoEntity[]>();
  const [selectDate, setSelectDate] = useState<string>();
  const [schedule, setSchedule] = useState<Set<string>>();

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

  // 날짜 클릭
  const onClickDate = (e: any): void => {
    let active: Element | null = document.querySelector(".active");
    let clicked: HTMLElement | null = document.getElementById(e.target.id);
    // 이전 active 정리
    if (active !== null) {
      active.classList.remove("active");
    }
    // active 추가
    if (clicked !== null) {
      clicked.classList.add("active");
    }
    setSelectDate(e.target.id);
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
  }, []);

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
      <Link to="/allTodo">모든 목록</Link>
      <Calendar
        schedule={schedule}
        onClickDate={onClickDate}
      />
      <TodoList
        todoDataArray={todoDataArray}
        selectDate={selectDate}
        addTodo={addTodo}
        deleteTodo={deleteTodo}
        checkTodo={checkTodo}
      />
    </div>
  )
}

export default Main;