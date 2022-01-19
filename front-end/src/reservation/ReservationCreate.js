import React, { useState } from "react";
import Form from "./Form";
import { useHistory } from "react-router-dom";
import { today } from "../utils/date-time";

export default function ReservationCreate() {
  let initialState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: today(),
    reservation_time: "",
    people: "1",
  };

  const [reservation, setReservation] = useState(initialState);

  const history = useHistory();

  function cancelHandler(event) {
    // console.log("cancel test");
    event.preventDefault();
    history.push("/");
  }
  function submitHandler(event) {
    // console.log("submit test");
    event.preventDefault();
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
    <Form
      cancelHandler={cancelHandler}
      submitHandler={submitHandler}
      changeHandler={changeHandler}
      reservation={reservation}
      setReservation={setReservation}
    />
  );
}
