import React from 'react';
import './App.css';
import Main from "./pages/Main";
import { Route, Routes } from "react-router-dom";
import AllTodo from './pages/AllTodo';

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

const App = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/allTodo" element={<AllTodo />} />
    </Routes>
  );
}

export default App;
