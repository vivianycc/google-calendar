import React from "react";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

export default function Labels() {
  const { labels, updateLabel } = useContext(GlobalContext);
  return (
    <React.Fragment>
      <p className="text-gray-500 font-bold mt-10 ml-3 ">
        {labels.map((label, idx) => (
          <label key={idx} className="items-center mt-3 block">
            <input
              type="checkbox"
              checked={label.checked}
              onChange={() =>
                updateLabel({ label: label.label, checked: !label.checked })
              }
              className={`form-checkbox h-5 w-5 text-${label.label}-400 rounded focus:ring-0 cursor`}
            />
            <span className="ml-2 text-gray-700 capitalize">{label.label}</span>
          </label>
        ))}
      </p>
    </React.Fragment>
  );
}
