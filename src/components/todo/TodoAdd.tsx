import React, {useState} from 'react';

const TodoAdd = () => {
  const [inputs, setInputs] = useState({
    text: '',
    endDate: '',
    done: false
  });
  const [isOpenPopUp, setIsOpenPopUp] = useState(false);

  const { text, endDate } = inputs;

  const handleModal = (): void => {
    setIsOpenPopUp(!isOpenPopUp);
  }

  const onChange = (e: any): void => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  }

  const add = (): void => {
    console.log("create");
  }

  return (
    <>
      <button className="todo-list__box" type="button" onClick={handleModal}>
        + 추가하기
      </button>

      {isOpenPopUp && (
        <div className="popup">
          <div>
            <h2 className="block text-gray-700 text-sm font-bold mb-2">할 일 추가</h2>
            <input
              className="shadow appearance-none border border-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              name="text"
              placeholder="내용을 입력하세요..."
              onChange={onChange}
              value={text}
            />
            <button onClick={add} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">추가하기</button>
            <button onClick={handleModal} className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">닫기</button>
          </div>
        </div>
      )}
    </>
  );
};

export default TodoAdd;