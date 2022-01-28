export default function ReservationsTable({ reservations }) {
  function statusHandler(event) {
    // changeStatus(event.target.value)
    console.log(event.target.value);
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
              <th key={reservation.reservation_id} scope="row">
                {reservation.reservation_id}
              </th>
              <td>{reservation.first_name}</td>
              <td>{reservation.last_name}</td>
              <td>{reservation.mobile_number}</td>
              <td>{reservation.reservation_date}</td>
              <td>{reservation.reservation_time}</td>
              <td>{reservation.people}</td>
              <td data-reservation-id-status={reservation.reservation_id}>
                {reservation.status}
              </td>
              <td>
                {reservation.status === "booked" && (
                  <button type="button" className="btn btn-primary">
                    <a
                      value={reservation.reservation_id}
                      onClick={statusHandler}
                      href={`/reservations/${reservation.reservation_id}/seat`}
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      Seat
                    </a>
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
