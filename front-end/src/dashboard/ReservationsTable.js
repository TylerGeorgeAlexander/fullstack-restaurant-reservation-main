import { changeStatus } from "../utils/api";
import { useHistory } from "react-router-dom";

export default function ReservationsTable({ reservations }) {
  const history = useHistory();

  function statusHandler(event) {
    // console.log("statusHandler", event.target.value);
    event.preventDefault();

    if (
      window.confirm(
        "Do you want to cancel this reservation? This cannot be undone."
      )
    ) {
      changeStatus("cancelled", event.target.value).then(() =>
        history.push("/")
      );
    }
  }

  return (
    <table className="table table-striped table-dark">
      <thead>
        <tr>
          <th scope="col">Reservation ID #</th>
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
          <th scope="col">Telephone #</th>
          <th scope="col">Reservation Date</th>
          <th scope="col">Reservation Time</th>
          <th scope="col"># of People</th>
          <th scope="col">Status</th>
          <th scope="col">Button</th>
        </tr>
      </thead>
      <tbody>
        {reservations.map((reservation) => {
          return (
            <tr key={reservation.reservation_id}>
              <th className="col col-1" key={reservation.reservation_id} scope="row">
                {reservation.reservation_id}
              </th>
              <td className="col col-1">{reservation.last_name}</td>
              <td className="col col-1">{reservation.first_name}</td>
              <td className="col col-1">{reservation.mobile_number}</td>
              <td className="col col-1">{reservation.reservation_date}</td>
              <td className="col col-1">{reservation.reservation_time}</td>
              <td className="col col-1">{reservation.people}</td>
              <td className="col col-1" data-reservation-id-status={reservation.reservation_id}>
                {reservation.status}
              </td>
              <td className="col col-4">
                {reservation.status === "booked" && (
                  <div className="row m-1">
                    <button type="button" className="btn btn-primary col m-1">
                      <a
                        value={reservation.reservation_id}
                        href={`/reservations/${reservation.reservation_id}/seat`}
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        Seat
                      </a>
                    </button>
                    <button type="button" className="btn btn-warning col m-1">
                      <a
                        value={reservation.reservation_id}
                        href={`/reservations/${reservation.reservation_id}/edit`}
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        Edit
                      </a>
                    </button>
                    <button
                      data-reservation-id-cancel={reservation.reservation_id}
                      type="button"
                      className="btn btn-secondary col m-1"
                      value={reservation.reservation_id}
                      onClick={statusHandler}
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
