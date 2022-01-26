import React, { useEffect, useState } from "react";
import { getReservation, listTables, updateTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { useParams, useHistory } from "react-router-dom";

export default function SeatSelect() {
  const [reservation, setReservation] = useState([]);
  const [tables, setTables] = useState([]);
  const [table, setTable] = useState("");

  const [error, setError] = useState(null);
  const [reservationError, setReservationError] = useState(null);
  const [tablesError, setTablesError] = useState(null);

  const { reservation_id } = useParams();
  const history = useHistory();

  useEffect(loadReservation, [reservation_id]);

  function loadReservation() {
    const abortController = new AbortController();
    setReservationError(null);
    getReservation(reservation_id, abortController.signal)
      .then(setReservation)
      .catch(setReservationError);
    listTables(abortController.signal).then(setTables).catch(setTablesError);
    return () => abortController.abort();
  }

  function cancelHandler(event) {
    // console.log("cancel test");
    event.preventDefault();
    history.go(-1);
  }

  function changeHandler({ target: {  value } }) {
    setTable(() => ({
     value,
    }));
    // console.log(table) maybe race condition
  }

  function submitHandler(event) {
    // console.log("submit test");
    event.preventDefault();
    console.log(table.value)
    updateTable(table.value, reservation.reservation_id)
      .then(() => {
        history.push(`/dashboard/date?date=${reservation.reservation_date}`);
      })
      .catch(setError);
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <h2>Seat Reservation</h2>
        <h4>
          {reservation.reservation_id} - {reservation.first_name}{" "}
          {reservation.last_name} on {reservation.reservation_date} at{" "}
          {reservation.reservation_time} for {reservation.people}
        </h4>
        <select className="table_id" id="locale" onChange={changeHandler}>
          <option>Select a table</option>
          {tables.map((table) => {
            return (
              <option key={table.table_id} value={table.table_id}>
                {table.table_name} - {table.capacity}
              </option>
            );
          })}
        </select>
        <button
          type="button"
          className="btn btn-secondary m-3"
          onClick={cancelHandler}
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-primary m-3">
          Submit
        </button>
      </form>
      <ErrorAlert error={reservationError || tablesError || error} />
    </div>
  );
}
