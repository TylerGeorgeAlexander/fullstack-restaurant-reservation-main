import React from "react";

export default function ReservationForm({
  cancelHandler,
  submitHandler,
  changeHandler,
  reservation,
  setReservation,
}) {

  return (
    <div>
      <form className="form-inline py-3" onSubmit={submitHandler}>
        <div className="col">
          <div className="row">
            <p>First Name</p>
            <input
              name="first_name"
              type="text"
              onChange={changeHandler}
              required
              value={reservation.first_name}
            />
          </div>
          <div className="row">
            <p>Last Name</p>
            <input
              name="last_name"
              type="text"
              onChange={changeHandler}
              required
              value={reservation.last_name}
            />
          </div>
          <div className="row">
            <p>Mobile Number</p>
            <input
              name="mobile_number"
              type="text"
              onChange={changeHandler}
              required
              value={reservation.mobile_number}
            />
          </div>
          <div className="row">
            <p>Reservation Date</p>
            <input
              name="reservation_date"
              type="date"
              onChange={changeHandler}
              required
              value={reservation.reservation_date}
            />
          </div>
          <div className="row">
            <p>Reservation Time</p>
            <input
              name="reservation_time"
              type="time"
              onChange={changeHandler}
              required
              value={reservation.reservation_time}
            />
          </div>
          <div className="row">
            <p>Number of People</p>
            <input
              name="people"
              type="number"
              onChange={changeHandler}
              required
              value={reservation.people}
            />
          </div>
          <div className="row">
            <button
              type="button"
              className="btn btn-warning"
              onClick={cancelHandler}
            >
              Cancel
            </button>
          </div>
          <div className="row">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
