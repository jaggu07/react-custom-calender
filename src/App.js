import React, { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [activeDate, setActiveDate] = useState(new Date());
  const [todayDate, setTodayDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date("10/12/2020"));
  const [endDate, setEndDate] = useState(new Date("12/8/2020"));
  todayDate.setHours("00");
  todayDate.setMinutes("00");
  todayDate.setSeconds("00");

  const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ],
    weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const generateMatrix = (activeDateParam) => {
    var matrix = [];
    // Create header
    matrix[0] = weekDays;
    var year = activeDateParam.getFullYear();
    var month = activeDateParam.getMonth();

    var firstDay = new Date(year, month, 1).getDay();
    var maxDays = nDays[month];
    if (month === 1) {
      // February
      if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        maxDays += 1;
      }
    }
    // More code here
    var counter = 1;
    for (var row = 1; row < 7; row++) {
      matrix[row] = [];
      for (var col = 0; col < 7; col++) {
        matrix[row][col] = -1;
        if (row === 1 && col >= firstDay) {
          // Fill in rows only after the first day of the month

          matrix[row][col] = new Date(year, month, counter);
          counter++;
        } else if (row > 1 && counter <= maxDays) {
          // Fill in rows only if the counter's not greater than
          // the number of days in the month

          matrix[row][col] = new Date(year, month, counter);
          counter++;
          //matrix[row][col] = counter++;
        }
      }
    }

    return matrix;
  };
  const generateCalender = (date) => {
    var rows = [];

    rows = generateMatrix(date).map((row, rowIndex) => {
      var rowItems = row.map((item, colIndex) => {
        return (
          <span
            key={Math.random() * 100}
            style={{
              height: "16px",
              padding: "16px",
              width: "100%",
              textAlign: "center",
              // Highlight header
              // backgroundColor: rowIndex === 0 ? "#ddd" : "#fff",
              // Highlight Sundays
              color: colIndex === 0 ? "#a00" : "#000",
              // Highlight current date
              backgroundColor:
                item >= startDate && item <= endDate ? "lightgreen" : "",
              fontWeight: item === todayDate ? "bold" : ""
            }}
            onClick={() => _onPress(item)}
          >
            {item !== -1
              ? typeof item === "object"
                ? item.getDate()
                : item
              : ""}
          </span>
        );
      });
      const _onPress = (item) => {
        console.log(item, todayDate);
      };

      return (
        <div
          key={Math.random()}
          style={{
            display: "flex"
          }}
        >
          {rowItems}
        </div>
      );
    });
    return rows;
  };
  const changeMonth = (n) => {
    setActiveDate(new Date(activeDate.setMonth(activeDate.getMonth() + n)));
  };
  useEffect(() => {
    console.log("test");
    //generateMatrix();
  });
  const activeDateshow = activeDate;
  return (
    <div className="App">
      <div style={{ display: "flex" }}>
        <div style={{ width: "32%", flex: "0 0 32%" }}>
          {months[activeDate.getMonth() - 1]} &nbsp;
          {activeDate.getFullYear()}
          {generateCalender(
            new Date(
              activeDate.getMonth() +
                "/" +
                activeDate.getDate() +
                "/" +
                activeDate.getFullYear()
            )
          )}
        </div>
        <div style={{ width: "1%", flex: "0 0 1%" }}></div>
        <div style={{ width: "32%", flex: "0 0 32%" }}>
          {months[activeDate.getMonth()]} &nbsp;
          {activeDate.getFullYear()}
          {generateCalender(
            new Date(
              activeDate.getMonth() +
                1 +
                "/" +
                activeDate.getDate() +
                "/" +
                activeDate.getFullYear()
            )
          )}
        </div>
        <div style={{ width: "1%", flex: "0 0 1%" }}></div>
        <div style={{ width: "32%", flex: "0 0 32%" }}>
          {months[activeDate.getMonth() + 1]} &nbsp;
          {activeDate.getFullYear()}
          {generateCalender(
            new Date(
              activeDate.getMonth() +
                2 +
                "/" +
                activeDate.getDate() +
                "/" +
                activeDate.getFullYear()
            )
          )}
        </div>
        <div style={{ width: "1%", flex: "0 0 1%" }}></div>
      </div>
      <button title="Previous" onClick={() => changeMonth(-1)}>
        prev
      </button>
      <button title="Next" onClick={() => changeMonth(+1)}>
        Next
      </button>
    </div>
  );
}
