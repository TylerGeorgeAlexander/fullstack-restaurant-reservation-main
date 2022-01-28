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

function changeStatus(status, reservation_id) {
  return knex("reservations")
    .whereRaw(`reservation_id=${reservation_id}`)
    .update({status})
    .returning("status")
}

module.exports = {
  create,
  list,
  getReservationById,
  changeStatus,
};
