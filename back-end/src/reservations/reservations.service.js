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

async function getReservationById(reservation_id){
  return knex("reservations")
  .select("*")
  .where({ reservation_id })
  .first(); 
}

module.exports = {
  create,
  list,
  getReservationById,
};
