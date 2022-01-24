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

module.exports = {
  create: [hasData, hasTableName, hasCapacity, asyncErrorBoundary(create)],
  list: asyncErrorBoundary(list),
};
