import dayjs from "dayjs";

export function getMonth(month = dayjs().month()) {
  const year = dayjs().year();
  let currentMonthCount = 0;
  let firstDayOfMonth = dayjs(new Date(year, month, 1)).day();

  let firstDayOfWeek = firstDayOfMonth ? 1 : -6; //monday
  const days = new Array(5).fill(new Array(7)).map((row, i) =>
    row.fill(1).map((day, idx) => {
      currentMonthCount++;
      return dayjs(
        new Date(
          year,
          month,
          currentMonthCount - firstDayOfMonth + firstDayOfWeek
        )
      );
    })
  );
  return days;
}
