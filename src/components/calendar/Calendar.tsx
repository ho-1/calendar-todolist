import React, {useEffect, useState} from "react";

type CalendarProps = {
  schedule: Set<string> | undefined
  onClickDate(e: any): void
}

const Calendar = ({ schedule, onClickDate }: CalendarProps) => {
  const today = new Date();
  const [year, setYear] = useState<number>(today.getFullYear());
  const [month, setMonth] = useState<number>(today.getMonth());
  const [prevCalendar, setPrevCalendar] = useState<Array<number>>([]);
  const [calendar, setCalendar] = useState<Array<number>>([]);
  const [nextCalendar, setNextCalendar] = useState<Array<number>>([]);

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

      setPrevCalendar(createPrevCalendar(thisMonth, lastMonthLastDate));
      setCalendar(createNowCalendar(thisMonthLastDate));
    }
    refreshDate();
  }, [year, month]);

  useEffect(() => {
    setNextCalendar(createNextCalendar(prevCalendar.length, calendar.length));
    checkSchedule();

    // 오늘 날짜 표시
    document.querySelector(".today")?.classList.remove("today");
    const todayEle = document.getElementById(today.toISOString().split("T")[0]);
    todayEle?.classList.add("today");
  }, [prevCalendar, calendar]);

  useEffect(() => {
    checkSchedule();
  }, [schedule])

  const checkSchedule = (): void => {
    // class 초기화
    let ele = document.querySelectorAll('.schedule');
    ele.forEach(e => {
      e.classList.remove('schedule');
    })
    // 할 일있는 날 class 추가
    schedule?.forEach(date => {
      let id: HTMLElement | null = document.getElementById(date);
      id?.classList.add('schedule');
    })
  }

  // 이전 달의 날짜배열 생성
  const createPrevCalendar = (thisMonth: Date, lastDate: number): number[] => {
    let list: number[] = [];
    for (let i = 0; i < thisMonth.getDay(); i++) {
      list[i] = lastDate;
      lastDate -= 1;
    }
    list.reverse();
    return list;
  }

  // 선택한 달의 날짜배열 생성
  const createNowCalendar = (thisMonthLastDate: number): number[] => {
    let list: number[] = [];
    for (let i = 0; i < thisMonthLastDate; i++) {
      list[i] = i + 1;
    }
    return list;
  }

  // 다음 달의 날짜배열 생성
  const createNextCalendar = (a: number, b:number): number[] => {
    let list: number[] = [];
    let sum = 6*7 - (a + b);
    for(let i = 0; i < sum; i++) {
      list[i] = i + 1;
    }
    return list;
  }

  // 다음달 선택 메소드
  const onClickNextMonth = (): void => {
    if (month === 11) {
      setYear(year + 1)
      setMonth(0);
    } else {
      setMonth(month + 1);
    }
  }

  // 이전달 선택 메소드
  const onClickPrevMonth = (): void => {
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

        {/*요일*/}
        <div className="box">일</div><div className="box">월</div><div className="box">화</div><div className="box">수</div><div className="box">목</div><div className="box">금</div><div className="box">토</div>

        {/*이전날짜*/}
        {prevCalendar.map(date => (
          <div
            className="box date prev"
            onClick={onClickPrevMonth}
            key={date}
          >
            {date}
          </div>
        ))}

        {/*현재날짜*/}
        {calendar.map(date => (
          <div
            className="box date"
            onClick={onClickDate}
            key={date}
            id={year+"-"+ (month < 9 ? "0"+(month+1) : month+1) +"-"+(date < 10 ? "0"+date : date)}
          >
            {date}
          </div>
        ))}

        {/*다음날짜*/}
        {nextCalendar.map(date => (
          <div
            className="box date prev"
            onClick={onClickNextMonth}
            key={date}
          >
            {date}
          </div>
        ))}
      </div>
    </>
  );
};

export default React.memo(Calendar);