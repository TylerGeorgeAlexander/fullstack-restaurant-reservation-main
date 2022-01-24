const knex = require("../db/connection");

function create(newTable) {
  return knex("tables")
    .insert(newTable)
    .returning("*")
    .then((tables) => tables[0]);
}

async function read(tableId) {
  return knex("tables").where({ table_id: tableId }).first();
}

async function list() {
  return knex("tables").select("*").orderBy("table_name");
}

module.exports = {
  create,
  list,
  read,
};
