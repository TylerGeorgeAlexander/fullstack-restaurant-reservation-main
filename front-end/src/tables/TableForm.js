import React from "react";
import ErrorAlert from "../layout/ErrorAlert";

export default function ReservationForm({
  table,
  error,
  submitHandler,
  cancelHandler,
  changeHandler,
  changeNumberHandler,
}) {
  return (
    <div>
      <ErrorAlert error={error} />
      <form onSubmit={submitHandler}>
        <p>Table Name</p>
        <input
          name="table_name"
          type="text"
          onChange={changeHandler}
          required
          minLength="2"
          value={table.table_name}
        />
        <p>Capacity</p>
        <input
          name="capacity"
          type="number"
          onChange={changeNumberHandler}
          required
          min="1"
          value={table.capacity}
        />
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
      </form>
    </div>
  );
}
