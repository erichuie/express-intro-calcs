/** Simple demo Express app. */

const stats = require("./stats");
const express = require("express");
const app = express();

// useful error class to throw
const { NotFoundError, BadRequestError } = require("./expressError");
const internal = require("stream");

const MISSING = "Expected key `nums` with comma-separated list of numbers.";


/** Finds mean of nums in qs: returns {operation: "mean", result } */
app.get("/mean", function (req, res){
  const strNums = req.query.nums;
  const nums = strNums.split(',').map(n => Number(n));
  console.log("mean")
  debugger;
  if(strNums.length === 0){
    throw new BadRequestError;
  }

  const mean = stats.findMean(nums);
  return res.json({
    "operation": "mean",
    "result": mean
  });
});

/** Finds median of nums in qs: returns {operation: "median", result } */
app.get("/median", function (req, res){
  const strNums = req.query.nums;
  const nums = strNums.split(',').map(n => Number(n));
  debugger;
  console.log("median")
  if(strNums.length === 0){
    throw new BadRequestError;
  }

  const median = stats.findMedian(nums);
  return res.json({
    "operation": "median",
    "result": median
  });
});


/** Finds mode of nums in qs: returns {operation: "mean", result } */
app.get("/mode", function (req, res){
  const strNums = req.query.nums;
  const nums = strNums.split(',').map(n => Number(n));
  debugger;
  console.log("mode")
  if(strNums.length === 0){
    throw new BadRequestError;
  }

  const mode = stats.findMode(nums);
  return res.json({
    "operation": "mode",
    "result": mode
  });
});

/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res) {
  throw new NotFoundError();
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});



module.exports = app;