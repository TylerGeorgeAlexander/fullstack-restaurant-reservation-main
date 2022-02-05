import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { useHistory } from "react-router-dom";
import ReservationsTable from "./ReservationsTable";
import TablesTable from "./TablesTable";

import { previous, next } from "../utils/date-time";
import { todaysDayDate } from "../utils/formatted-dates";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */

function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);

  const [reservationsError, setReservationsError] = useState(null);
 
  const history = useHistory();

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  function clickTodayHandler() {
    let today = todaysDayDate();
    // console.log(today);
    history.push(`/dashboard/date?date=${today}`);
  }

  async function clickPreviousDayHandler() {
    const urlParams = new URLSearchParams(window.location.search);
    let myParam = urlParams.get("date");

    // condition if there is no Params
    if (myParam === null) {
      myParam = todaysDayDate();
    }

    let prevDay = previous(myParam);
    // console.log(prevDay);
    history.push(`/dashboard/date?date=${prevDay}`);
  }

  async function clickNextDayHandler() {
    const urlParams = new URLSearchParams(window.location.search);
    let myParam = urlParams.get("date");

    // condition if there is no Params
    if (myParam === null) {
      myParam = todaysDayDate();
    }

    let nextDay = next(myParam);
    // console.log(nextDay);
    history.push(`/dashboard/date?date=${nextDay}`);
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {date}</h4>
      </div>
      <div className="row">
        <div className="col col-1 m-2">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={clickPreviousDayHandler}
          >
            Previous
          </button>
        </div>
        <div className="col col-1 m-2">
          <button
            type="button"
            className="btn btn-dark"
            onClick={clickTodayHandler}
          >
            Today
          </button>
        </div>
        <div className="col col-1 m-2">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={clickNextDayHandler}
          >
            Next
          </button>
        </div>
      </div>
      <ErrorAlert error={reservationsError } />
      <ReservationsTable reservations={reservations} />
      <TablesTable />
    </main>
  );
}

export default Dashboard;
