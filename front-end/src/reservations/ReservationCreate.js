import React, { useState } from "react";
import ReservationForm from "./ReservationForm";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";

export default function ReservationCreate() {
  let initialState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 1,
    status: "booked",
  };

  const [reservation, setReservation] = useState(initialState);
  const [error, setError] = useState(null);

  const history = useHistory();

  function cancelHandler(event) {
    event.preventDefault();
    history.push("/");
  }

  function submitHandler(event) {
    event.preventDefault();
    createReservation(reservation)
      .then(() => {
        history.push(
          `/dashboard/date?date=${reservation.reservation_date.slice(0, 10)}`
        );
      })
      .catch(setError);
  }

  function changeHandler({ target: { name, value } }) {
    setReservation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function changeNumberHandler({ target: { name, value } }) {
    setReservation((prevState) => ({
      ...prevState,
      [name]: Number(value),
    }));
  }

  return (
    <ReservationForm
      cancelHandler={cancelHandler}
      submitHandler={submitHandler}
      changeHandler={changeHandler}
      reservation={reservation}
      setReservation={setReservation}
      error={error}
      changeNumberHandler={changeNumberHandler}
    />
  );
}
