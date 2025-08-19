const fs = require("fs");

// Asynchromous operation
// fs.writeFile("./hello.txt", "Hello World", (err) => {});

// fs.readFile("./hello.txt", "UTF-8", (err, result) => {
//   if (err) {
//     console.log("Error:", err);
//   } else {
//     console.log(result);
//   }
// });

// Synchronous operation
// fs.writeFileSync("./hello.txt", "Hello there");

// const result = fs.readFileSync("./hello.txt", "UTF-8");
// console.log(result);

fs.appendFileSync("./hello.txt", `${new Date(Date.now())} Hello There \n`);
