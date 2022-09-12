import React from "react";
import Day from "./Day";

export default function Month({ month }) {
  return (
    <div className="flex-1 grid grid-rows-5 grid-cols-7 text-gray-800">
      {month.map((row, i) => {
        return (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <Day day={day} key={idx} row={i} />
            ))}
          </React.Fragment>
        );
      })}
    </div>
  );
}
