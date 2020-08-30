import React, { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [activeDate, setActiveDate] = useState(new Date());
  const [todayDate, setTodayDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date("10/12/2020"));
  const [endDate, setEndDate] = useState(new Date("12/8/2020"));
  const [count, setCount] = useState(3);

  todayDate.setHours("00");
  todayDate.setMinutes("00");
  todayDate.setSeconds("00");

  const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
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
          <p
            key={Math.random() * 100}
            style={{
              // height: "16px",
              padding: "16px",
              width: "100%",
              textAlign: "center",
              // Highlight header
              // backgroundColor: rowIndex === 0 ? "#ddd" : "#fff",
              // Highlight Sundays
              color:
                item.toString() === todayDate.toString() ||
                (item >= startDate && item <= endDate)
                  ? "white"
                  : "06041d",
              opacity:
                item.toString() === todayDate.toString() ||
                (item >= startDate && item <= endDate)
                  ? "1"
                  : "0.4",
              // Highlight current date
              backgroundColor:
                item >= startDate && item <= endDate
                  ? "lightgreen"
                  : item.toString() === todayDate.toString()
                  ? "grey"
                  : "",

              marginBottom: "0"
            }}
            onClick={() => _onPress(item)}
          >
            {item !== -1
              ? typeof item === "object"
                ? item.getDate()
                : item
              : ""}
          </p>
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
    setActiveDate(
      activeDate.getMonth() + n === 12
        ? new Date(activeDate.getFullYear() + n, 0, 1)
        : activeDate.getMonth() + n === -1
        ? new Date(activeDate.getFullYear() + n, 11, 1)
        : new Date(activeDate.getFullYear(), activeDate.getMonth() + n, 1)
    );
  };

  const numbers = (min, max) => {
    return Array(max - min + 2)
      .join()
      .split(",")
      .map(function (e, i) {
        return min + i;
      });
  };
  useEffect(() => {
    console.log(count);
  });
  // const prevCalender = () => {
  //   return activeDate.getMonth() - 1 === -1
  //     ? new Date(activeDate.getFullYear() - 1, 11, 1)
  //     : new Date(activeDate.getFullYear(), activeDate.getMonth() - 1, 1);
  // };
  // const nextCalender = () => {
  //   return activeDate.getMonth() + 1 === 12
  //     ? new Date(activeDate.getFullYear() + 1, 0, 1)
  //     : new Date(activeDate.getFullYear(), activeDate.getMonth() + 1, 1);
  // };
  const getDisplayCalender = (month) => {
    return activeDate.getMonth() + month === -1
      ? new Date(activeDate.getFullYear() - 1, 11, 1)
      : activeDate.getMonth() + month === 12
      ? new Date(activeDate.getFullYear() + 1, 0, 1)
      : new Date(activeDate.getFullYear(), activeDate.getMonth() + month, 1);
  };
  return (
    <div className="App">
      <div className="p-2">
        <label className={"mr-2"}>Select number of months to display</label>
        <input
          min={0}
          max={12}
          type="number"
          value={count}
          onChange={(e) => setCount(e.target.value)}
        />
        <br />
      </div>
      <div className="d-flex ">
        <button
          className="m-2 btn btn-primary justify-self-start"
          title="Previous"
          onClick={() => changeMonth(-1)}
        >
          prev
        </button>
        <button
          className="m-2 btn btn-primary justify-self-end"
          title="Next"
          onClick={() => changeMonth(+1)}
        >
          Next
        </button>
      </div>
      <div className="row m-0">
        {numbers(-1, count - 3).map((b) => {
          return (
            <div className="col-sm-12 col-md-4 col-l-4 col-xl-4">
              {getDisplayCalender(b).toLocaleString("default", {
                month: "long"
              })}{" "}
              &nbsp;
              {getDisplayCalender(b).getFullYear()}
              {generateCalender(getDisplayCalender(b))}
            </div>
          );
        })}
      </div>
      {/* <div className="row m-0">
        <div className="col-sm-12 col-md-4 col-l-4 col-xl-4">
          {prevCalender().toLocaleString("default", { month: "long" })} &nbsp;
          {prevCalender().getFullYear()}
          {generateCalender(prevCalender())}
        </div>
        <div className="col-sm-12 col-md-4 col-l-4 col-xl-4">
          {activeDate.toLocaleString("default", { month: "long" })} &nbsp;
          {prevCalender().getFullYear()}
          {generateCalender(new Date(activeDate))}
        </div>
        <div className="col-sm-12 col-md-4 col-l-4 col-xl-4">
          {nextCalender().toLocaleString("default", { month: "long" })} &nbsp;
          {nextCalender().getFullYear()}
          {generateCalender(nextCalender())}
        </div>
      </div> */}
    </div>
  );
}
