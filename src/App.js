import React, { useState } from "react";
import "./styles.css";

export default function App() {
  const [activeDate, setActiveDate] = useState(new Date());
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
  ];

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
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
          matrix[row][col] = counter++;
        } else if (row > 1 && counter <= maxDays) {
          // Fill in rows only if the counter's not greater than
          // the number of days in the month
          matrix[row][col] = counter++;
        }
      }
    }
    console.log(matrix);
    return matrix;
  };
  var rows = [];
  rows = generateMatrix().map((row, rowIndex) => {
    var rowItems = row.map((item, colIndex) => {
      return (
        <p
          key={Math.random() * 100}
          style={{
            flex: 1,
            height: 18,
            textAlign: "center",
            // Highlight header
            backgroundColor: rowIndex === 0 ? "#ddd" : "#fff",
            // Highlight Sundays
            color: colIndex === 0 ? "#a00" : "#000",
            // Highlight current date
            fontWeight: item === activeDate.getDate() ? "bold" : ""
          }}
          onPress={() => this._onPress(item)}
        >
          {item !== -1 ? item : ""}
        </p>
      );
    });
    return (
      <div
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

  return (
    <div className="App">
      <div>
        {months[activeDate.getMonth()]} &nbsp;
        {activeDate.getFullYear()}
        {rows}
      </div>
      <h1>Hello CodeSandbox {activeDate.toDateString()}</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
