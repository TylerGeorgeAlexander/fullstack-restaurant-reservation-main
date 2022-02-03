const knex = require("../db/connection");

function create(newReservation) {
  return knex("reservations")
    .insert(newReservation)
    .returning("*")
    .then((reservations) => reservations[0]);
}

async function list(reservation_date) {
  return knex("reservations")
    .select("*")
    .where({ reservation_date })
    .whereNot({ status: "finished" })
    .whereNot({ status: "cancelled" })
    .orderBy("reservation_time");
}

async function getReservationById(reservation_id) {
  return knex("reservations").select("*").where({ reservation_id }).first();
}

async function read(reservation_id) {
  return knex("reservations").where({ reservation_id }).first();
}

async function update(reservation) {
  return knex("reservations")
    .where({ reservation_id: reservation.reservation_id })
    .update(reservation, "*")
    .then(() => read(reservation.reservation_id));
}

function changeStatus(status, reservation_id) {
  return knex("reservations")
    .whereRaw(`reservation_id=${reservation_id}`)
    .update({ status })
    .returning("status");
}

function search(mobile_number) {
  return knex("reservations")
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_date");
}

module.exports = {
  create,
  list,
  getReservationById,
  changeStatus,
  search,
  read,
  update,
};
