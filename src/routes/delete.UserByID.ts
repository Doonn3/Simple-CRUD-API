import { miniCloneExpress } from "../core/MiniCloneExpress.js";
import { bd } from "../BD.js";

miniCloneExpress.Delete("/api/users/:id", (req, res) => {
  console.log("ВЫЗОВ DELETE");
  console.log("ВЫЗОВ DELETE >> УДАЛИТ ЮЗЕРА ПО АЙДИ");
  try {
    if (req.params) {
      let user = bd.GetUser(req.params);
      if (user) {
        const result = bd.RemoveUser(user.id);
        if (result) {
          res.statusCode = 204;
          res.end();
        } else {
          res.statusCode = 500;
          res.end("Unable to delete, unknown error");
        }
      } else {
        res.statusCode = 404;
        res.end("User does not exist");
      }
    } else {
      res.statusCode = 400;
      res.end("Incorrect");
    }
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
});
