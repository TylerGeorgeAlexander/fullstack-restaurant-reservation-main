import React, { useState, useEffect } from "react";
import { finishReservation } from "../utils/api";
import { useHistory } from "react-router-dom";
import { listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

export default function TablesTable() {
  const history = useHistory();
  // const [error, setError] = useState(null);
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);

  useEffect(loadDashboard, [tables]);

  function loadDashboard() {
    const abortController = new AbortController();
    listTables(abortController.signal).then(setTables).catch(setTablesError);
    return () => abortController.abort();
  }

  async function finishHandler(event) {
    event.preventDefault();
    // console.log(event.target.value)

    // Pop up window
    if (
      window.confirm(
        "Is this table ready to seat new guests? This cannot be undone."
      )
    ) {
      finishReservation(event.target.value).then(() => history.push("/"));
    }
    // To remove the error not being displayed react warning, may move to display later
    // console.log(error);
  }

  return (
    <div>
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
                <td data-table-id-status={table.table_id}>
                  {table.reservation_id ? "occupied" : "free"}
                </td>
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
      <ErrorAlert error={tablesError} />
    </div>
  );
}
