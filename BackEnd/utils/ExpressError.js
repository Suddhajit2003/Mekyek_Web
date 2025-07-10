class ExpressError extends Error {
  constructor(message, statusCode) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
  console() {
    console.log(this.message, this.statusCode);
  }
}

module.exports = ExpressError;