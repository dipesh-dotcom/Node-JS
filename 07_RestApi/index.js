const express = require("express");
const users = require("./MOCK_DATA.json");
const app = express();
const port = 8000;

//Routes

app.get("/users", (req, res) => {
  const html = `
    <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join("")}  
    </ul>
    `;
  return res.send(html);
});

// REST API
app.get("/api/users", (req, res) => {
  return res.json(users);
});

app
  .route("/api/user/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .patch((req, res) => {
    // TODO : create a patch request
    return res.json({ status: "pending" });
  })
  .delete((req, res) => {
    // TODO : create a delete request
    return res.json({ status: "pending" });
  });

app.post("/api/user", (req, res) => {
  // TODO : create a post request
  return res.json({ status: "pending" });
});

app.listen(port, console.log(`Server listen on port ${port}`));
