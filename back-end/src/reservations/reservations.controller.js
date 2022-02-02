const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

/**
 * List handler for reservation resources
 */
async function list(req, res) {
  const { date } = req.query;
  const { mobile_number } = req.query;
  let data;
  if (date) {
    data = await service.list(date);
  } else if (mobile_number) {
    data = await service.search(mobile_number);
  }
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

function read(req, res) {
  const { reservation } = res.locals;
  res.json({ data: reservation });
}

async function changeStatus(req, res, next) {
  const { reservation_id } = req.params;
  const { status } = req.body.data;

  const newStatus = await service.changeStatus(status, reservation_id);
  res.status(200).json({ data: { status: newStatus[0] } });
}

/**
 * Start of Middleware
 */

function hasReservationIdParams(req, res, next) {
  const { reservation_id } = req.params;
  if (!reservation_id) {
    return next({
      status: 404,
      message: `The following 'reservation_id' could not be found: ${reservation_id}`,
    });
  }
  res.locals.reservation_id = reservation_id;
  next();
}

async function reservationExists(req, res, next) {
  const { reservation_id } = res.locals;
  const reservation = await service.getReservationById(reservation_id);

  if (!reservation) {
    return next({
      status: 404,
      message: `The following reservation could not be found: ${reservation_id}.`,
    });
  }
  res.locals.reservation = reservation;
  next();
}

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
  next({
    status: 400,
    message: "reservation_date is missing, empty, or in the wrong format",
  });
}

function hasReservationTime(req, res, next) {
  const timeFormat = /\d\d:\d\d/;
  const reservationTime = req.body.data.reservation_time;
  if (reservationTime && timeFormat.test(reservationTime)) {
    return next();
  }
  next({
    status: 400,
    message: "reservation_time is missing, empty, or in the wrong format",
  });
}

function hasPeople(req, res, next) {
  const people = req.body.data.people;
  if (people && typeof people === "number" && people > 0) {
    return next();
  }
  next({
    status: 400,
    message: "people is missing, empty, negative, or not a number typeof",
  });
}

// US-02 returns 400 if reservation_date falls on a tuesday
// this function may need to be before the past date test

function closedTuesday(req, res, next) {
  // grab the request body date
  const date = req.body.data.reservation_date;
  // convert into date format
  let newDate = new Date(date);

  // console.log(newDate.getDay(), typeof newDate.getDay())

  // .getDay converts date format into a numerical day, where Tuesday is 2
  if (newDate.getDay() !== 1) {
    return next();
  }
  next({
    status: 400,
    message: "closed on Tuesdays",
  });
}

// US-02 returns 400 if reservation occurs in the past

function hasPastDate(req, res, next) {
  const date = req.body.data.reservation_date;
  let today = new Date().toISOString().slice(0, 10);

  // console.log("req", typeof date, date);
  // console.log("today", typeof today, today);

  if (date >= today) {
    return next();
  }
  next({
    status: 400,
    message: "reservation occurs in the past, it needs to be in the future",
  });
}

function hoursOpen(req, res, next) {
  let currentTime = +req.body.data.reservation_time.replace(/:/g, "");
  // console.log(currentTime, typeof currentTime);

  // Compare the current time (converted to a number) to see if it is within business hours (10:30am to 9:30pm)
  if (currentTime > 1030 && currentTime < 2130) {
    return next();
  }
  next({
    status: 400,
    message: "Reservation times must be between 10:30am to 9:30pm",
  });
}

function statusSeated(req, res, next) {
  if (req.body.data.status === "seated") {
    next({ status: 400, message: "status is 'seated'." });
  }
  return next();
}

function statusFinished(req, res, next) {
  if (req.body.data.status === "finished") {
    next({ status: 400, message: "status is 'finished'." });
  }
  return next();
}

function statusUnknown(req, res, next) {
  if (
    req.body.data.status === "finished" ||
    req.body.data.status === "seated" ||
    req.body.data.status === "booked"
  ) {
    return next();
  }
  next({ status: 400, message: "status is 'unknown'." });
}

function statusFinishedUpdate(req, res, next) {
  if (res.locals.reservation.status === "finished") {
    next({ status: 400, message: "a finished reservation cannot be updated" });
  }
  return next();
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
    closedTuesday,
    hasPastDate,
    hoursOpen,
    statusSeated,
    statusFinished,
    asyncErrorBoundary(create),
  ],
  list: asyncErrorBoundary(list),
  read: [hasReservationIdParams, reservationExists, asyncErrorBoundary(read)],
  changeStatus: [
    hasReservationIdParams,
    reservationExists,
    statusFinishedUpdate,
    statusUnknown,
    asyncErrorBoundary(changeStatus),
  ],
};
