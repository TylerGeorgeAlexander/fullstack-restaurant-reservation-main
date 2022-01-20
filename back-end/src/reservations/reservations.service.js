const knex = require("../db/connection");

function create(newReservation) {
  return knex("reservations").insert(newReservation).returning("*").then(reservations => reservations[0])
}

async function list() {
  return knex("reservations").select("*").orderBy("reservation_time");
}

module.exports = {
  create,
  list,
};
