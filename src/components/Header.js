import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import logo from "../assets/logo.png";
import IconButton from "./IconButton";
import TextButton from "./TextButton";
import dayjs from "dayjs";

export default function Header(props) {
  const context = useContext(GlobalContext);

  function showPrevMonth() {
    props.setCurrentMonth(props.currentMonth - 1);
  }
  function showNextMonth() {
    props.setCurrentMonth(props.currentMonth + 1);
  }

  function resetMonth() {
    props.setCurrentMonth(dayjs().month());
  }

  return (
    <header className="p-3 flex items-center">
      <IconButton name="menu" size="48" />
      <img src={logo} alt="logo" className="w-10 h-10 pr-1" />
      <h1 className="text-2xl text-gray-500 pl-1 pr-8">Calendar</h1>
      <TextButton label="Today" onClick={resetMonth} className="mr-3" />
      <IconButton name="chevron_left" size="32" onClick={showPrevMonth} />
      <IconButton name="chevron_right" size="32" onClick={showNextMonth} />
      <h2 className="p-2 ml-2 text-xl text-gray-600">
        {dayjs().month(props.currentMonth).format("MMMM YYYY")}
      </h2>
    </header>
  );
}
