import React from "react";
import SmallCalendar from "./SmallCalendar";
import CreateEventButton from "./CreateEventButton";
import Labels from "./Labels";

export default function Sidebar() {
  return (
    <aside className="w-64">
      <CreateEventButton />
      <SmallCalendar />
      <Labels />
    </aside>
  );
}
