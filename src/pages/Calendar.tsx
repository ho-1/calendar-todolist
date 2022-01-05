import React, {useEffect, useState} from "react";

const Calendar = () => {
  const [year, setYear] = useState<number>(2022);
  const [month, setMonth] = useState<number>(0);
  const dayArray = ["일", "월", "화", "수", "목", "금", "토"];
  const [prevDateArr, setPrevDateArr] = useState<Array<number>>([]);
  const [dateArr, setDateArr] = useState<Array<number>>([]);
  const today = new Date();

  useEffect(() => {
    refreshDate();
  }, [year, month]);

  const refreshDate = () => {
    let lastMonthLastDate: number;
    if (month === 0) {
      lastMonthLastDate = new Date(year - 1, 12, 0).getDate();
    } else {
      lastMonthLastDate = new Date(year, month, 0).getDate();
    }
    const thisMonth = new Date(year, month);
    const thisMonthLastDate = new Date(year, month + 1, 0).getDate();

    setPrevDateArr(createPrevDateArr(thisMonth, lastMonthLastDate));
    setDateArr(createThisDateArr(thisMonthLastDate));
  }

  // 이전 달의 날짜배열 생성
  const createPrevDateArr = (thisMonth: Date, lastDate: number): number[] => {
    let list: number[] = [];
    for (let n = 0; n < thisMonth.getDay(); n++) {
      list[n] = lastDate;
      lastDate -= 1;
    }
    list.reverse();
    return list;
  }

  // 선택한 달의 날짜배열 생성
  const createThisDateArr = (thisMonthLastDate: number): number[] => {
    let list: number[] = [];
    for (let i = 0; i < thisMonthLastDate; i++) {
      list[i] = i + 1;
    }
    return list;
  }

  // 다음달 선택 메소드
  const clickNextMonth = (): void => {
    console.log("증가");
    if (month === 11) {
      setYear(year + 1)
      setMonth(0);
    } else {
      setMonth(month + 1);
    }
  }

  // 이전달 선택 메소드
  const clickPrevMonth = (): void => {
    console.log("감소");
    if (month === 0) {
      setYear(year - 1);
      setMonth(11);
    } else {
      setMonth(month - 1);
    }
  }

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
    console.log(e.target.id);
  }

  return (
    <div className="wrap">
      <h5>오늘 : {today.getFullYear()}년 {today.getMonth()+1}월 {today.getDate()}일</h5>
      <div className="calendar-title">
        <h2>{year}년 {month + 1}월</h2>
        <div>
          <button onClick={clickNextMonth}>+</button>
          <button onClick={clickPrevMonth}>-</button>
        </div>
      </div>
      <div className="calendar-grid">
        {dayArray.map(day => (
          <div className="box" key={day}>{day}</div>
        ))}

        {prevDateArr.map(date => (
          <div className="box date prev" onClick={clickPrevMonth} key={date}>{date}</div>
        ))}

        {dateArr.map(date => (
          <div
            className="box date"
            onClick={onClickDate}
            key={date}
            id={year+""+ (month < 9 ? "0"+(month+1) : month+1) +""+(date < 10 ? "0"+date : date)}
          >
            {date}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Calendar;