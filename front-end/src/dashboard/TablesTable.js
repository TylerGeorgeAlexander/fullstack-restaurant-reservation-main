import React, { useEffect, useState } from "react";
import { finishReservation } from "../utils/api";
import { useParams, useHistory } from "react-router-dom";

export default function TablesTable({ tables }) {
  const history = useHistory();
  const [error, setError] = useState(null);

  function finishHandler(event) {
    event.preventDefault();
    // console.log(event.target.value)
    finishReservation(event.target.value)
      .then(() => {
        history.go(0)
      })
      .catch(setError);
  }

  return (
    <table className="table table-striped table-dark">
      <thead>
        <tr>
          <th scope="col">Table ID #</th>
          <th scope="col">Table Name</th>
          <th scope="col">Capacity</th>
          <th scope="col">Free?</th>
          <th scope="col">Button</th>
        </tr>
      </thead>
      <tbody>
        {tables.map((table) => {
          return (
            <tr key={table.table_id}>
              <th key={table.table_id} scope="row">
                {table.table_id}
              </th>
              <td>{table.table_name}</td>
              <td>{table.capacity}</td>
              <td>{table.reservation_id ? "Occupied" : "Free"}</td>
              <td>
                {!table.reservation_id || (
                  <button
                    onClick={finishHandler}
                    className="btn btn-danger"
                    data-table-id-finish={table.table_id}
                    value={table.table_id}
                  >
                    Finish
                  </button>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
