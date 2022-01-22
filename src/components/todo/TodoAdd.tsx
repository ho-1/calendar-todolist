import React, {useState, useContext, useEffect} from 'react';
import {TodoEntity} from "./TodoEntity";

type props = {
  selectDate: string,
  addTodo(text: string, endDate: string): void
};

const TodoAdd = ({ selectDate, addTodo }: props) => {
  const [inputs, setInputs] = useState({
    text: '',
    endDate: '',
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setInputs({
      ...inputs,
      endDate: selectDate
    })
  }, [selectDate])

  const onChange = (e: any): void => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  }

  const add = (): void => {
    addTodo(inputs.text, inputs.endDate);
    setInputs({
      text: '',
      endDate: selectDate,
    })
    setIsOpen(false);
  }

  return (
    <>
      <button className="todo-list__box" type="button" onClick={() => setIsOpen(true)}>
        + 추가하기
      </button>

      {isOpen && (
        <div className="popup">
          <div>
            <h2 className="block text-gray-700 text-sm font-bold mb-2">할 일 추가</h2>
            <input
              className="shadow appearance-none border border-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              name="text"
              placeholder="내용을 입력하세요..."
              onChange={onChange}
              value={inputs.text}
            />
            <button onClick={add} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">추가하기</button>
            <button onClick={() => setIsOpen(false)} className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">닫기</button>
          </div>
        </div>
      )}
    </>
  );
};

export default TodoAdd;