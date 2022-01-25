import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { useHistory } from "react-router-dom";

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
  function clickPreviousDayHandler() {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get("date");

    let prevDay = previous(myParam);
    // console.log(prevDay);
    history.push(`/dashboard/date?date=${prevDay}`);
  }
  function clickNextDayHandler() {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get("date");

    let nextDay = next(myParam);
    // console.log(nextDay);
    history.push(`/dashboard/date?date=${nextDay}`);
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date</h4>
      </div>
      <div className="row">
        <div className="col">
          <button
            type="button"
            className="btn btn-primary"
            onClick={clickPreviousDayHandler}
          >
            Previous
          </button>
        </div>
        <div className="col">
          <button
            type="button"
            className="btn btn-primary"
            onClick={clickTodayHandler}
          >
            Today
          </button>
        </div>
        <div className="col">
          <button
            type="button"
            className="btn btn-primary"
            onClick={clickNextDayHandler}
          >
            Next
          </button>
        </div>
      </div>
      <ErrorAlert error={reservationsError} />
      {JSON.stringify(reservations)}
    </main>
  );
}

export default Dashboard;
