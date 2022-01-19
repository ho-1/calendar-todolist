import React from 'react';
import './App.css';
import Main from "./pages/Main";
import { Route, Routes } from "react-router-dom";
import AllTodo from './pages/AllTodo';

const App = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/allTodo" element={<AllTodo />} />
    </Routes>
  );
}

export default App;
