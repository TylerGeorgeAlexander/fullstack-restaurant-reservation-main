const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

/**
 * List handler for reservation resources
 */
async function list(req, res) {
  // const { date } = req.query;
  const data = await service.list();
  res.json({
    data,
  });
}

async function create(req, res) {
  const newTable = await service.create(req.body.data);

  res.status(201).json({
    data: newTable,
  });
}

async function update(req, res) {
  const { table_id } = req.params;
  const { reservation_id } = req.body.data;

  const updatedTable = {
    reservation_id: reservation_id,
    table_id: table_id,
  };
  const data = await service.update(updatedTable);
  res.json({ data });
}

/**
 * Start of Middleware
 */

function hasData(req, res, next) {
  if (req.body.data) {
    return next();
  }
  next({ status: 400, message: "body must have data property" });
}

function hasTableName(req, res, next) {
  if (req.body.data.table_name && req.body.data.table_name.length > 1) {
    return next();
  }
  next({
    status: 400,
    message: "table_name is missing, empty, or one character",
  });
}

function hasCapacity(req, res, next) {
  if (req.body.data.capacity && typeof req.body.data.capacity === "number") {
    return next();
  }
  next({
    status: 400,
    message: "capacity is missing, zero, or not a number",
  });
}

function hasReservationId(req, res, next) {
  const {
    data: { reservation_id },
  } = req.body;
  if (reservation_id !== undefined) {
    return next();
  }
  next({ status: 400, message: "reservation_id cannot be found." });
}

async function reservationIdExists(req, res, next) {
  const reservationId = await req.body.data.reservation_id;
  const foundReservation = await service.readReservation(reservationId);
  if (foundReservation) {
    res.locals.reservation = foundReservation;
    return next();
  }
  return next({ status: 404, message: `${reservationId} does not exist.` });
}

async function sufficientCapacity(req, res, next) {
    const reservation = res.locals.reservation;
    const capacity = res.locals.table.capacity

    if (capacity < reservation.people) {
      return next({
        status: 400,
        message: "There are more people than available capacity.",
      });
    }
    next();
}

async function tableExists(req, res, next) {
    const { table_id } = req.params;
    const table = await service.read(table_id);
    if (!table) {
      next({
        status: 404,
        message: `Table ${table_id} does not exist`,
      });
    }
    res.locals.table = table;
    next();
  }

  function occupiedTable(req, res, next) {
    const { reservation_id } = res.locals.table;
    if (reservation_id) {
      return next({
        status: 400,
        message: "Table is occupied.",
      });
    }
    return next();
  }

module.exports = {
  create: [hasData, hasTableName, hasCapacity, asyncErrorBoundary(create)],
  list: asyncErrorBoundary(list),
  update: [
    hasData,
    tableExists,
    hasReservationId,
    reservationIdExists,
    sufficientCapacity,
    occupiedTable,
    asyncErrorBoundary(update),
  ],
};
