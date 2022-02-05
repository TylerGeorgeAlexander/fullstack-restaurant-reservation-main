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
    event.preventDefault();
    history.go(-1);
  }

  function changeHandler({ target: { value } }) {
    setTable(() => ({
      value,
    }));
  }

  function submitHandler(event) {
    event.preventDefault();
    console.log(table.value);
    updateTable(table.value, reservation.reservation_id)
      .then(() => {
        history.push(
          `/dashboard/date?date=${reservation.reservation_date.slice(0, 10)}`
        );
      })
      .catch(setError);
  }
  if (!reservation.reservation_date) {
    return <h2>Loading..</h2>;
  }
  return (
    <div>
      <form onSubmit={submitHandler}>
        <h2>Seat Reservation</h2>
        <h4>
          {reservation.reservation_id} - {reservation.first_name}{" "}
          {reservation.last_name} on {reservation.reservation_date.slice(0, 10)}{" "}
          at {reservation.reservation_time} for {reservation.people}
        </h4>
        <select name="table_id" id="locale" onChange={changeHandler}>
          <option value="">Select a table</option>
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
        <button disabled={!table} type="submit" className="btn btn-primary m-3">
          Submit
        </button>
      </form>
      <ErrorAlert error={reservationError || tablesError || error} />
    </div>
  );
}
