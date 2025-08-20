const fs = require("fs");

const os = require("os");

console.log(os.cpus().length);

// console.log("1");

// //Blocking operation
// const result = fs.readFileSync("hello.txt", "utf-8");
// console.log(result);

// // Non-Bloocking operation
// fs.readFile("hello.txt", "utf-8", (err, result) => {
//   console.log(result);
// });

// console.log("2");
