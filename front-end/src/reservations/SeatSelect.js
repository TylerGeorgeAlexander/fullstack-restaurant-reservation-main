import React, { useEffect, useState } from "react";
import { getReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { useParams } from "react-router-dom";

export default function SeatSelect() {
  const [reservation, setReservation] = useState([]);

  const [reservationError, setReservationError] = useState(null);

  const { reservation_id } = useParams();

  useEffect(loadReservation, [reservation_id]);

  function loadReservation() {
    const abortController = new AbortController();
    setReservationError(null);
    getReservation(reservation_id, abortController.signal)
      .then(setReservation)
      .catch(setReservationError);
    return () => abortController.abort();
  }

  console.log(reservation);

  return (
    <div>
      <h2>Seat Reservation</h2>
      {reservation.reservation_id}
      <select className="form-control" id="locale">
        <option value="af-ZA">af-ZA</option>
        <option value="af-ZA">af-ZA2</option>
      </select>
      <button>Cancel</button>
      <button>Submit</button>
      <ErrorAlert error={reservationError} />
    </div>
  );
}
