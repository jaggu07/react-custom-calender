import React, { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [activeDate, setActiveDate] = useState(new Date());
  const [todayDate, setTodayDate] = useState(new Date());
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
  const generateMatrix = () => {
    var matrix = [];
    // Create header
    matrix[0] = weekDays;
    var year = activeDate.getFullYear();
    var month = activeDate.getMonth();

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
  var rows = [];

  rows = generateMatrix().map((row, rowIndex) => {
    var rowItems = row.map((item, colIndex) => {
      return (
        <span
          key={Math.random() * 100}
          style={{
            flex: 1,
            height: "16px",
            padding: "16px",
            width: "100%",
            textAlign: "right",
            // Highlight header
            backgroundColor: rowIndex === 0 ? "#ddd" : "#fff",
            // Highlight Sundays
            color: colIndex === 0 ? "#a00" : "#000",
            // Highlight current date
            fontWeight: item.toString() === todayDate.toString() ? "bold" : ""
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
          flex: 1,
          flexDirection: "row",
          padding: 15,
          justifyContent: "space-around",
          alignItems: "center"
        }}
      >
        {rowItems}
      </div>
    );
  });
  const changeMonth = (n) => {
    setActiveDate(new Date(activeDate.setMonth(activeDate.getMonth() + n)));
  };
  useEffect(() => {
    console.log("test");
    //generateMatrix();
  });
  return (
    <div className="App">
      <div>
        {months[activeDate.getMonth()]} &nbsp;
        {activeDate.getFullYear()}
        {rows}
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
