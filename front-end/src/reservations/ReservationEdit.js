import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getReservation, updateReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationForm from "./ReservationForm";

export default function ReservationEdit() {
  const [reservation, setReservation] = useState(null);
  // eslint-disable-next-line
  const [error, setError] = useState(null);
  const [reservationError, setReservationError] = useState(null);

  const { reservation_id } = useParams();
  const history = useHistory();

  useEffect(loadReservation, [reservation_id]);

  function loadReservation() {
    const abortController = new AbortController();
    setReservationError(null);
    getReservation(reservation_id, abortController.signal)
      .then(setReservation)
      .catch(setReservationError);
    return () => abortController.abort();
  }

  function cancelHandler(event) {
    event.preventDefault();
    history.go(-1);
  }

  function changeHandler({ target: { name, value } }) {
    setReservation({ ...reservation, [name]: value });
  }

  function changeNumberHandler({ target: { name, value } }) {
    setReservation((prevState) => ({
      ...prevState,
      [name]: Number(value),
    }));
  }

  function viewReservationRedirect() {
    history.push(`/dashboard?date=${reservation.reservation_date}`);
  }

  async function submitHandler(event) {
    event.preventDefault();
    updateReservation(reservation, reservation_id);
    viewReservationRedirect();
  }

  if (!reservation) {
    return <h2>Loading..</h2>;
  }

  return (
    <div>
      <h2>Edit Reservation #</h2>
      <ReservationForm
        cancelHandler={cancelHandler}
        submitHandler={submitHandler}
        changeHandler={changeHandler}
        reservation={reservation}
        setReservation={setReservation}
        error={error}
        changeNumberHandler={changeNumberHandler}
      />
      <ErrorAlert error={reservationError} />
    </div>
  );
}
