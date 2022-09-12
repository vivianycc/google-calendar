import React, { useEffect, useState, useReducer } from "react";
import "./App.css";
import { GlobalContext } from "./context/GlobalContext";
import dayjs from "dayjs";
import { getMonth } from "./util";
import Sidebar from "./components/Sidebar";
import Month from "./components/Month";
import Header from "./components/Header";
import EventModal from "./components/EventModal";
import { useMemo } from "react";

function savedEventsReducer(state, { type, payload }) {
  switch (type) {
    case "push":
      return [...state, payload];

    case "update":
      return state.map((evt) => (evt.id === payload.id ? payload : evt));

    case "delete":
      console.log("delete");
      return state.filter((evt) => evt.id !== payload.id);

    default:
      throw new Error();
  }
}

function initEvents() {
  const storageEvents = localStorage.getItem("savedEvents");
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
  return parsedEvents;
}

function App() {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const [currentMonthIndex, setCurrentMonthIndex] = useState(dayjs().month());
  const [smallMonthIndex, setSmallMonthIndex] = useState(null);
  const [selectedDayIndex, setSelectedDayIndex] = useState(dayjs());
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [labels, setLabels] = useState([]);
  const [savedEvents, dispatchEvents] = useReducer(
    savedEventsReducer,
    [],
    initEvents
  );
  const filteredEvents = useMemo(() => {
    return savedEvents.filter((evt) =>
      labels
        .filter((lbl) => lbl.checked)
        .map((lbl) => lbl.label)
        .includes(evt.label)
    );
  }, [savedEvents, labels]);

  useEffect(() => {
    localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
  }, [savedEvents]);

  useEffect(() => {
    setLabels((prevLabels) => {
      return [...new Set(savedEvents.map((evt) => evt.label))].map((label) => {
        const currentLabel = prevLabels.find((lbl) => lbl.label === label);
        return {
          label,
          checked: currentLabel ? currentLabel.checked : true,
        };
      });
    });
  }, [savedEvents]);

  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIndex));
  }, [currentMonthIndex]);

  useEffect(() => {
    if (!showEventModal) {
      setSelectedEvent(null);
    }
  }, [showEventModal]);

  function updateLabel(label) {
    setLabels(labels.map((lbl) => (lbl.label === label.label ? label : lbl)));
  }

  return (
    <GlobalContext.Provider
      value={{
        currentMonthIndex,
        currentMonth,
        setCurrentMonthIndex,
        smallMonthIndex,
        setSmallMonthIndex,
        selectedDayIndex,
        setSelectedDayIndex,
        showEventModal,
        setShowEventModal,
        dispatchEvents,
        savedEvents,
        selectedEvent,
        setSelectedEvent,
        setLabels,
        labels,
        updateLabel,
        filteredEvents,
      }}
    >
      <React.Fragment>
        {showEventModal && <EventModal />}
        <div className="h-screen flex flex-col">
          <Header
            setCurrentMonth={setCurrentMonthIndex}
            currentMonth={currentMonthIndex}
          />
          <div className="flex flex-1">
            <Sidebar />
            <Month month={currentMonth} />
          </div>
        </div>
      </React.Fragment>
    </GlobalContext.Provider>
  );
}

export default App;
