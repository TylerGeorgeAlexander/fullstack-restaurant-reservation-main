import React, { useState } from "react";
import { today } from "../utils/date-time";
export default function Form({
  onSubmit,
  onCancel,
  initialState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: today(),
    reservation_time: "",
    people: "1",
  },
}) {
    const [resevervation, setReservation] = useState(initialState);


  return (
    <div>
      <form className="form-inline py-3" onSubmit={onSubmit}>
        <div className="col">
          <div className="row">
            <p>First Name</p>
            <input name="first_name" type="text" />
          </div>
          <div className="row">
            <p>Last Name</p>
            <input name="last_name" type="text" />
          </div>
          <div className="row">
            <p>Mobile Number</p>
            <input name="mobile_number" type="tel" />
          </div>
          <div className="row">
            <p>Reservation Date</p>
            <input name="reservation_date" type="date" />
          </div>
          <div className="row">
            <p>Reservation Time</p>
            <input name="reservation_time" type="time" />
          </div>
          <div className="row">
            <p>Number of People</p>
            <input name="people" type="number" />
          </div>
          <div className="row">
            <button type="button" class="btn btn-warning" onClick={onCancel}>
              Cancel
            </button>
          </div>
          <div className="row">
            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
