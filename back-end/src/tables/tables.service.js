const knex = require("../db/connection");

function create(newTable) {
  return knex("tables")
    .insert(newTable)
    .returning("*")
    .then((tables) => tables[0]);
}

function read(tableId) {
    return knex("tables").select("*").where({ table_id: tableId }).first();
  }

function readReservation(reservationId) {
  return knex("reservations").where({ reservation_id: reservationId }).first();
}

async function list() {
  return knex("tables").select("*").orderBy("table_name");
}

async function update({ table_id, reservation_id }) {
  return knex("tables")
    .where({ table_id: table_id })
    .update({ reservation_id: reservation_id })
    .returning("*").then(()=>{
      return knex("reservations")
      .where({ reservation_id })
      .update({ status: "seated" })
    })
}

async function finish(table_id){
  return knex("tables")
  .where({ table_id: table_id })
  .update({ reservation_id: null })
  .returning("*");
}

module.exports = {
  create,
  read,
  list,
  readReservation,
  update,
  finish,
};
