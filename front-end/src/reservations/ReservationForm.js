import React from "react";
import ErrorAlert from "../layout/ErrorAlert";

export default function ReservationForm({
  cancelHandler,
  submitHandler,
  changeHandler,
  reservation,
  setReservation,
  error,
  changeNumberHandler,
}) {
  return (
    <div>
      <ErrorAlert error={error} />

      <main>
        <h1>Create Reservation</h1>
        <form onSubmit={submitHandler}>
          <fieldset>
            <div className="row">
              <div className="form-group col">
                <label htmlFor="first_name">First Name</label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  className="form-control"
                  placeholder="First Name"
                  onChange={changeHandler}
                  required
                  value={reservation.first_name}
                />
              </div>
              <div className="form-group col">
                <label htmlFor="last_name">Last Name</label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  className="form-control"
                  placeholder="Last Name"
                  onChange={changeHandler}
                  required
                  value={reservation.last_name}
                />
              </div>
              <div className="form-group col">
                <label htmlFor="mobile_number">Mobile Number</label>
                <input
                  type="text"
                  id="mobile_number"
                  name="mobile_number"
                  className="form-control"
                  placeholder="Mobile Number"
                  onChange={changeHandler}
                  required
                  value={reservation.mobile_number}
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group col">
                <label htmlFor="reservation_date">Date</label>
                <input
                  type="date"
                  id="reservation_date"
                  name="reservation_date"
                  className="form-control"
                  placeholder="yyyy-mm-dd"
                  pattern="\d{4}-\d{2}-\d{2}"
                  onChange={changeHandler}
                  required
                  value={reservation.reservation_date}
                />
              </div>
              <div className="form-group col">
                <label htmlFor="date">Time</label>
                <input
                  type="time"
                  id="reservation_time"
                  name="reservation_time"
                  className="form-control"
                  placeholder="09:20"
                  pattern="[0-9]{2}:[0-9]{2}"
                  onChange={changeHandler}
                  required
                  value={reservation.reservation_time}
                />
              </div>
              <div className="form-group col">
                <label htmlFor="people">People</label>
                <input
                  type="number"
                  id="people"
                  name="people"
                  className="form-control"
                  aria-label="Number of people"
                  min="1"
                  onChange={changeNumberHandler}
                  required
                  value={reservation.people}
                />
              </div>
            </div>
            <button
              type="button"
              className="btn btn-secondary mr-2 cancel"
              onClick={cancelHandler}
            >
              <span className="oi oi-x"></span> Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <span className="oi oi-check"></span> Submit
            </button>
          </fieldset>
        </form>
      </main>
    </div>
  );
}
