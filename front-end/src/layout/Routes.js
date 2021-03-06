import React from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import ReservationCreate from "../reservations/ReservationCreate";
import ReservationSearch from "../reservations/ReservationSearch";
import ReservationEdit from "../reservations/ReservationEdit";
import SeatSelect from "../reservations/SeatSelect";
import TableCreate from "../tables/TableCreate";
import useQuery from "../utils/useQuery";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */

function Routes() {
  const date = useQuery().get("date");
  // const date = today();

  return (
    <Switch>
      <Route exact path="/">
        <Redirect to={`/dashboard`} />
      </Route>
      <Route exact path="/reservations">
        <Redirect to={`/dashboard`} />
      </Route>
      <Route exact path="/reservations/new">
        <ReservationCreate />
      </Route>
      <Route path="/reservations/:reservation_id/seat">
        <SeatSelect />
      </Route>
      <Route path="/reservations/:reservation_id/edit">
        <ReservationEdit />
      </Route>
      <Route exact path="/dashboard">
        <Dashboard date={date || today()} />
      </Route>
      <Route path="/dashboard/:date">
        <Dashboard exact date={date || today()} />
      </Route>
      <Route exact path="/tables/new">
        <TableCreate />
      </Route>
      <Route exact path="/search">
        <ReservationSearch />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
