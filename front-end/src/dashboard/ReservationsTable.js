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
            <tr>
              <th scope="row">{reservation.reservation_id}</th>
              <td>{reservation.first_name}</td>
              <td>{reservation.last_name}</td>
              <td>{reservation.mobile_number}</td>
              <td>{reservation.reservation_date}</td>
              <td>{reservation.reservation_time}</td>
              <td>{reservation.people}</td>
              <td>{!reservation.status?"booked":"seated"}</td>
              <td>{reservation.status || <button>Seat</button>}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
