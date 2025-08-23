const fs = require("fs");

const logReqRes = (fileName) => {
  return (req, res, next) => {
    fs.appendFile(
      fileName,
      `\n${Date.now()}: ${req.ip}: ${req.method} : ${req.url}\n`,
      (err, data) => {
        next();
      }
    );
  };
};

module.exports = {
  logReqRes,
};
