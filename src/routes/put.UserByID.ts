import { miniCloneExpress } from "../core/MiniCloneExpress.js";
import { bd, UserType } from "../BD.js";

miniCloneExpress.Put("/api/users/:id", (req, res) => {
  console.log("ВЫЗОВ PUT");
  console.log("ВЫЗОВ PUT >> ИЗМЕНЯЕМ ЮЗЕРА");
  try {
    if (req.params) {
      let user = bd.GetUser(req.params);
      if (user) {
        let body = "";
        req.on("data", (chunk) => {
          body += chunk;
        });

        req.on("end", () => {
          const userModification = JSON.parse(body) as UserType;
          user = userModification;

          res.statusCode = 200;
          res.end(JSON.stringify(user));
        });
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
