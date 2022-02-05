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

      <main>
        <h1>Create Table</h1>
        <form onSubmit={submitHandler}>
          <fieldset>
            <div className="row">
              <div className="form-group col">
                <label htmlFor="table_name">Table Name</label>
                <input
                  onChange={changeHandler}
                  type="text"
                  id="table_name"
                  name="table_name"
                  className="form-control"
                  minLength="2"
                  required=""
                  placeholder="Table Name"
                  value={table.table_name}
                />
              </div>
              <div className="form-group col">
                <label htmlFor="capacity">Capacity</label>
                <input
                  onChange={changeNumberHandler}
                  type="number"
                  id="capacity"
                  name="capacity"
                  className="form-control"
                  aria-label="Table capacity"
                  required=""
                  min="1"
                  value={table.capacity}
                />
              </div>
            </div>
            <button
              onClick={cancelHandler}
              type="button"
              className="btn btn-secondary mr-2 cancel"
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
