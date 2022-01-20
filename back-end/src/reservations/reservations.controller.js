const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

/**
 * List handler for reservation resources
 */
async function list(req, res) {
  const data = await service.list();
  res.json({
    data,
  });
}

async function create(req, res) {
  const newReservation = await service.create(req.body.data);

  res.status(201).json({
    data: newReservation,
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

function hasFirstName(req, res, next) {
  if (req.body.data.first_name) {
    return next();
  }
  next({ status: 400, message: "first_name is missing or empty" });
}

function hasLastName(req, res, next) {
  if (req.body.data.last_name) {
    return next();
  }
  next({ status: 400, message: "last_name is missing or empty" });
}

function hasMobilePhone(req, res, next) {
  if (req.body.data.mobile_number) {
    return next();
  }
  next({ status: 400, message: "mobile_number is missing or empty" });
}

function hasReservationDate(req, res, next) {
  const dateFormat = /\d\d\d\d-\d\d-\d\d/;
  const reservationDate = req.body.data.reservation_date;

  if (reservationDate && dateFormat.test(reservationDate)) {
    return next();
  }
  next({ status: 400, message: "reservation_date is missing, empty, or in the wrong format" });
}

function hasReservationTime(req, res, next) {
  const timeFormat = /\d\d:\d\d/;
  const reservationTime = req.body.data.reservation_time;
  if (reservationTime && timeFormat.test(reservationTime)) {
    return next();
  }
  next({ status: 400, message: "reservation_time is missing, empty, or in the wrong format" });
}

function hasPeople(req, res, next) {
  const people = req.body.data.people;
  if (people && typeof people === "number") {
    return next();
  }
  next({ status: 400, message: "people is missing, empty, or not a number typeof" });
}

module.exports = {
  create: [
    hasData,
    hasFirstName,
    hasLastName,
    hasMobilePhone,
    hasReservationDate,
    hasReservationTime,
    hasPeople,
    asyncErrorBoundary(create),
  ],
  list: asyncErrorBoundary(list),
};
