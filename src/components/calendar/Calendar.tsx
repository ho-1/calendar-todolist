import React, {useEffect, useState} from "react";

type CalendarProps = {
  onClickDate(e: any): void
}

const Calendar = ({ onClickDate }: CalendarProps) => {
  const [year, setYear] = useState<number>(2022);
  const [month, setMonth] = useState<number>(0);
  const [prevDateArr, setPrevDateArr] = useState<Array<number>>([]);
  const [dateArr, setDateArr] = useState<Array<number>>([]);
  const [nextDateArr, setNextDateArr] = useState<Array<number>>([]);
  const today = new Date();

  useEffect(() => {
    // 달력 생성
    const refreshDate = (): void => {
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
    refreshDate();

    // todolist에서 날짜 검색 후 데이터가 하나라도 있으면 가지고 와서 element 에 스타일 추가

  }, [year, month]);

  useEffect(() => {
    setNextDateArr(createNextDateArr(prevDateArr.length, dateArr.length));
  }, [prevDateArr, dateArr]);

  // 이전 달의 날짜배열 생성
  const createPrevDateArr = (thisMonth: Date, lastDate: number): number[] => {
    let list: number[] = [];
    for (let i = 0; i < thisMonth.getDay(); i++) {
      list[i] = lastDate;
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

  // 다음 달의 날짜배열 생성
  const createNextDateArr = (a: number, b:number): number[] => {
    let list: number[] = [];
    let sum = 6*7 - (a + b);
    for(let i = 0; i < sum; i++) {
      list[i] = i + 1;
    }
    return list;
  }

  // 다음달 선택 메소드
  const onClickNextMonth = (): void => {
    console.log("증가");
    if (month === 11) {
      setYear(year + 1)
      setMonth(0);
    } else {
      setMonth(month + 1);
    }
  }

  // 이전달 선택 메소드
  const onClickPrevMonth = (): void => {
    console.log("감소");
    if (month === 0) {
      setYear(year - 1);
      setMonth(11);
    } else {
      setMonth(month - 1);
    }
  }

  return (
    <>
      <div className="timer">
        <h5>
          오늘 : {today.getFullYear()}년 {today.getMonth()+1}월 {today.getDate()}일
        </h5>
      </div>
      <div className="calendar-title">
        <button onClick={onClickPrevMonth}>&lt;</button>
        <h2>{year}년 {month + 1}월</h2>
        <button onClick={onClickNextMonth}>&gt;</button>
      </div>
      <div className="calendar-grid">
        <div className="box">일</div><div className="box">월</div><div className="box">화</div><div className="box">수</div><div className="box">목</div><div className="box">금</div><div className="box">토</div>
        {prevDateArr.map(date => (
          <div className="box date prev" onClick={onClickPrevMonth} key={date}>{date}</div>
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

        {nextDateArr.map(date => (
          <div className="box date prev" onClick={onClickNextMonth} key={date}>{date}</div>
        ))}
      </div>
    </>
  );
};

export default Calendar;