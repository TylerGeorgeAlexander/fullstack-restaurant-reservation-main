import React, { useState } from "react";
import TableForm from "./TableForm";
import { useHistory } from "react-router-dom";
import { createTable } from "../utils/api";

export default function TableCreate() {
  let initialState = {
    table_name: "",
    capacity: "",
  };

  const [table, setTable] = useState(initialState);
  const [error, setError] = useState(null);

  const history = useHistory();

  function cancelHandler(event) {
    event.preventDefault();
    history.go(-1);
  }

  function submitHandler(event) {
    event.preventDefault();
    createTable(table)
      .then(() => {
        history.push(`/dashboard`);
      })
      .catch(setError);
  }

  function changeHandler({ target: { name, value } }) {
    setTable((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function changeNumberHandler({ target: { name, value } }) {
    setTable((prevState) => ({
      ...prevState,
      [name]: Number(value),
    }));
  }

  return (
    <TableForm
      table={table}
      error={error}
      submitHandler={submitHandler}
      cancelHandler={cancelHandler}
      changeHandler={changeHandler}
      changeNumberHandler={changeNumberHandler}
    />
  );
}
