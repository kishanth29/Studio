//  borrow app from app
const app = require("./app");

const path = require("path");
const connectDatabase = require("./config/database");

connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(
    `my server listening to the port ${process.env.PORT} in ${process.env.NODE_ENV}`
  );
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  // Recommended: send the information to sentry.io or similar service
  // for tracking purposes and to understand the root cause.
  process.exit(1); // Exit the process to avoid unknown state
});

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("shutting down the server due to uncaught exceptions"),
    server.close(() => {
      process.exit(1);
    });
});
