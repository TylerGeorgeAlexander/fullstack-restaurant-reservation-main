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
    .orderBy("reservation_time")
    .where({ reservation_date });
}

module.exports = {
  create,
  list,
};
