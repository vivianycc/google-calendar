import dayjs from "dayjs";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";

export default function Day({ day, row }) {
  const [dayEvents, setDayEvents] = useState([]);

  const {
    setShowEventModal,
    setSelectedDayIndex,
    filteredEvents,
    setSelectedEvent,
  } = useContext(GlobalContext);

  useEffect(() => {
    const events = filteredEvents.filter(
      (evt) => dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [filteredEvents, day]);

  function isToday() {
    if (day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")) {
      return `bg-blue-600 text-white rounded-full w-7`;
    } else {
      return "";
    }
  }
  return (
    <div className="border border-gray-100 flex flex-col ">
      <header className="flex flex-col items-center">
        {row === 0 && (
          <p className="text-sm mt-1 text-center ">
            {day.format("ddd").toUpperCase()}
          </p>
        )}
        <p className={`text-sm p-1 my-1 text-center ${isToday()}`}>
          {day.format("D")}
        </p>
      </header>
      <div
        className="flex-1 cursor-pointer"
        onClick={() => {
          setSelectedDayIndex(day);
          setShowEventModal(true);
        }}
      >
        {dayEvents.map((evt, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedEvent(evt)}
            className={`bg-${evt.label}-200 p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate`}
          >
            {evt.title}
          </div>
        ))}
      </div>
    </div>
  );
}
