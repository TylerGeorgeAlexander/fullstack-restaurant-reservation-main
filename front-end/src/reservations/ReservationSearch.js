import { useEffect } from "react";

export default function ReservationSearch() {
  useEffect(loadReservation, [reservation_id]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ mobile_number }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }
}
