import React, { useState } from "react";
import { listReservations } from "../utils/api";
import ReservationsTable from "../dashboard/ReservationsTable";
import ErrorAlert from "../layout/ErrorAlert";

export default function ReservationSearch() {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(null);
  const [mobile_number, setMobileNumber] = useState("");

  function changeHandler({ target }) {
    setMobileNumber(target.value);
  }

  function submitHandler(event) {
    const abortController = new AbortController();
    event.preventDefault();
    listReservations({ mobile_number }, abortController.signal)
      .then(setReservations)
      .catch(setError);
    return () => abortController.abort();
  }

  return (
    <div>
      <h1>Search reservations</h1>
      <form onSubmit={submitHandler}>
        <fieldset>
          <div className="row">
            <div className="form-group col-md-4 col-sm-12">
              <label>Mobile Number:</label>
              <div className="input-group">
                <input
                  type="text"
                  id="mobile_number"
                  name="mobile_number"
                  onChange={changeHandler}
                  value={mobile_number}
                  required
                  className="form-control"
                  placeholder="Enter a customer's phone number"
                />
                <div className="input-group-append">
                  <button type="submit" className="btn btn-primary">
                    <span className="oi oi-magnifying-glass"></span> Find
                  </button>
                </div>
              </div>
            </div>
          </div>
        </fieldset>
      </form>
      <ReservationsTable reservations={reservations} />
      {reservations.length !== 0 ? "" : "No reservations found"}
      <ErrorAlert error={error} />
    </div>
  );
}
