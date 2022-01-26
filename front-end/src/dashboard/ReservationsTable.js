export default function ReservationsTable({ reservations }) {
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
              <td>{!reservation.status ? "booked" : "seated"}</td>
              <td>
                {reservation.status || (
                  <button type="button" className="btn btn-primary">
                    <a
                      href={`/reservations/${reservation.reservation_id}/seat`}
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      Seat ID {reservation.reservation_id}
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
