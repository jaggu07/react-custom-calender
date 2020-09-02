import React, { useState, useEffect } from "react";
import "./Calender.css";

const Calender = ({ fromDate, toDate, monthsToDisplay = 3 }) => {
  const [activeDate, setActiveDate] = useState(new Date());
  const [todayDate] = useState(new Date());
  const [startDate, setStartDate] = useState(fromDate);
  const [endDate, setEndDate] = useState(toDate);
  const [count, setCount] = useState(monthsToDisplay);

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
        if ((row === 1 && col >= firstDay) || (row > 1 && counter <= maxDays)) {
          // Fill in rows only after the first day of the month

          matrix[row][col] = new Date(year, month, counter);
          counter++;
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
              //Highlight header
              //backgroundColor: rowIndex === 0 ? "#ddd" : "#fff",
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
                startDate &&
                new Date(item) >= new Date(startDate) &&
                endDate &&
                new Date(item) <= new Date(endDate)
                  ? "lightgreen"
                  : item.toString() === todayDate.toString()
                  ? "grey"
                  : "",
              fontWeight:
                item.toString() === todayDate.toString() ? "bold" : "",
              marginBottom: "0",
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
            display: "flex",
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

  const generateArray = (min, max) => {
    return Array(max - min + 2)
      .join()
      .split(",")
      .map(function (e, i) {
        return min + i;
      });
  };

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

  useEffect(() => {
    setStartDate(fromDate);
    setEndDate(toDate);
    setCount(monthsToDisplay);
  }, [fromDate, toDate, monthsToDisplay]);
  return (
    <>
      <div className="row m-0">
        <div className="col-6 justify-content-start">
          <button
            className="m-2 btn btn-primary float-left"
            title="Previous"
            onClick={() => changeMonth(-1)}
          >
            prev
          </button>
        </div>
        <div className="col-6 justify-content-end">
          <button
            className="m-2 btn btn-primary float-right"
            title="Next"
            onClick={() => changeMonth(+1)}
          >
            Next
          </button>
        </div>
      </div>
      <div className="row m-0">
        {generateArray(-1, count - 3).map((ele) => {
          return (
            <div
              className="col-sm-12 col-md-12 col-l-4 col-xl-4"
              key={Math.random() * 100}
            >
              {getDisplayCalender(ele).toLocaleString("default", {
                month: "long",
              })}
              &nbsp;
              {getDisplayCalender(ele).getFullYear()}
              {generateCalender(getDisplayCalender(ele))}
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
    </>
  );
};
export default Calender;