import React, { useState, useContext, useEffect } from "react";
import dayjs from "dayjs";
import { GlobalContext } from "../context/GlobalContext";
import { getMonth } from "../util";
import IconButton from "./IconButton";

export default function SmallCalendar() {
  const {
    currentMonthIndex,
    setCurrentMonthIndex,
    smallMonthIndex,
    setSmallMonthIndex,
    selectedDayIndex,
    setSelectedDayIndex,
  } = useContext(GlobalContext);

  const [localMonthIndex, setLocalMonthIndex] = useState(currentMonthIndex);

  const currentMonth = getMonth(localMonthIndex);

  useEffect(() => {
    setLocalMonthIndex(currentMonthIndex);
  }, [currentMonthIndex]);

  useEffect(() => {
    setSmallMonthIndex(localMonthIndex);
  }, [localMonthIndex]);
  function showPrevMonth() {
    setLocalMonthIndex(localMonthIndex - 1);
  }
  function showNextMonth() {
    setLocalMonthIndex(localMonthIndex + 1);
  }

  function goToMonth(day) {
    setCurrentMonthIndex(smallMonthIndex);
    setSelectedDayIndex(day);
  }

  function dayButtonStyleClass(day) {
    const currentDay = dayjs().format("DD-MM-YY");
    const mappedDay = day.format("DD-MM-YY");
    const selectedDay = selectedDayIndex && selectedDayIndex.format("DD-MM-YY");
    if (mappedDay === currentDay) {
      return "bg-blue-600 text-white";
    } else if (mappedDay === selectedDay) {
      return "bg-blue-100 text-blue-600";
    } else {
      return "";
    }
  }
  return (
    <div className="p-5">
      <header className="flex items-center justify-between h-8 mb-2 text-gray-800">
        <span>{dayjs().month(localMonthIndex).format("MMMM YYYY")}</span>
        <div className="flex items-center gap-1">
          <IconButton size="24" name="chevron_left" onClick={showPrevMonth} />
          <IconButton size="24" name="chevron_right" onClick={showNextMonth} />
        </div>
      </header>

      <div className="grid grid-cols-7 grid-rows-5 gap-1 items-center">
        {currentMonth[0].map((day) => (
          <div key={day} className="text-xs text-center">
            {day.format("dd").charAt(0)}
          </div>
        ))}
        {currentMonth.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <button
                key={idx}
                className={`w-7 h-7 text-xs rounded-full hover:bg-gray-100 ${dayButtonStyleClass(
                  day
                )}`}
                onClick={() => goToMonth(day)}
              >
                {/* ??????????????? ()=>goToMonth() ??????????????????????????????????????? ??? smallMonthIndex ????????????????????? currentMonthIndex ????????? localMonthIndex ?????? ????????????*/}
                {day.format("D")}
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
