import React, { useState } from "react";
import ReservationForm from "./ReservationForm";
import { useHistory } from "react-router-dom";
import { today } from "../utils/date-time";
import { createReservation } from "../utils/api";

export default function ReservationCreate() {
  let initialState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "1",
  };

  const [reservation, setReservation] = useState(initialState);
  const [error, setError] = useState(null);

  const history = useHistory();

  function cancelHandler(event) {
    // console.log("cancel test");
    event.preventDefault();
    history.push("/");
  }

  function submitHandler(event) {
    // console.log("submit test");
    event.preventDefault();
    console.log(reservation)
    createReservation(reservation).then(() => {
      history.push("/");
    });
  }

  function changeHandler({ target: { name, value } }) {
    setReservation((prevState) => ({
      ...prevState,
      [name]: value,
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
    />
  );
}
