import { miniCloneExpress } from "../core/MiniCloneExpress.js";
import { bd, UserType, validateUserType} from "../BD.js";
import {v4 as uuidV4} from 'uuid'

miniCloneExpress.Post("/api/users", (req, res) => {
  console.log("ВЫЗОВ POST");
  console.log("ВЫЗОВ POST >> ЗАПИСЫВАЕМ В БАЗУ ДАННЫХ ЮЗЕРА");
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", () => {
    console.log("END");
    try {
      const user = JSON.parse(body) as UserType;

      user.id = uuidV4();

      if (validateUserType(user)) {
        bd.SetUser(user.id, user);
        res.statusCode === 201;
        res.end(JSON.stringify(user));
      } else {
        res.statusCode === 400;
        res.end("Missing required fields");
      }
    } catch (error) {
      console.error(error);
      res.statusCode = 500;
      res.end("Internal Server Error");
    }
  });
});
