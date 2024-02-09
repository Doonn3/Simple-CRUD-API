import { miniCloneExpress } from "../core/MiniCloneExpress.js";
import { bd } from "../BD.js";

miniCloneExpress.Get("/api/users/:id", (req, res) => {
  console.log("ВЫЗОВ GET");
  console.log("ВЫЗОВ GET >> ПОЛУЧАЕМ ЮЗЕРА ПО АЙДИ");

  try {
    if (req.params) {
      const user = bd.GetUser(req.params);
      if (user) {
        res.statusCode = 200;
        res.end(JSON.stringify(user));
      } else {
        res.statusCode = 404;
        res.end("User does not exist");
      }
    } else {
      res.statusCode = 400;
      res.end("User id is incorrect");
    }
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
});
