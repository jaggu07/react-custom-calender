import React, { useState } from "react";
import Calender from "./component/Calender";
import "./styles.css";
const App = () => {
  const [startDate, setStartDate] = useState(new Date("10/2/2020"));
  const [endDate, setEndDate] = useState(new Date("11/3/2020"));
  const [count, setCount] = useState(3);

  // const selectFromDate = (date) => {
  //   if (new Date(date) < new Date(endDate)) {
  //     setStartDate(new Date(date));
  //   } else {
  //     alert("From date greater form end date");
  //   }
  // };
  // const selectEndDate = (date) => {
  //   if (new Date(date) > new Date(startDate)) {
  //     setEndDate(new Date(date));
  //   } else {
  //     alert("End date Lesser form from date");
  //   }
  // };
  return (
    <div className="App">
      <div className="p-2">
        <h1>React custom calender with highlighting selected date</h1>
        <div className={"text-left m-auto col-l-4 col-sm-8 col-md-6 col-xl-4"}>
          <label className={"m-2"}>Select number of months to display</label>
          <input
            min={0}
            max={12}
            type="number"
            value={count}
            onChange={(e) => setCount(e.target.value)}
          />
          <br />
          <label className={"m-2"}>Highlight from date</label>
          <input
            type="date"
            value={startDate.toISOString().substr(0, 10)}
            onChange={(e) => {
              setStartDate(new Date(e.target.value));
            }}
          />
          <br />
          <label className={"m-2"}>Highlight till date</label>
          <input
            type="date"
            value={endDate.toISOString().substr(0, 10)}
            onChange={(e) => setEndDate(new Date(e.target.value))}
          />{" "}
        </div>
      </div>

      <>
        <Calender
          fromDate={startDate}
          toDate={endDate}
          monthsToDisplay={count}
          onPrevIcon={
            <button className=" btn btn-primary " title="Previous">
              {"<"}
            </button>
          }
          onNextIcon={
            <button className="btn btn-primary " title="Previous">
              {">"}
            </button>
          }
        />
      </>

      <div className="footerWrapper">
        <p>
          Code By{" "}
          <a
            href="http://jaggu07.github.io/"
            rel="noopener noreferrer"
            target="_blank"
          >
            Jaggu07
          </a>
        </p>
      </div>
    </div>
  );
};

export default App;
