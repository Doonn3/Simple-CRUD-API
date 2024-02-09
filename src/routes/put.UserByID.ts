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

          const u = checkUpdate(user!, userModification);

          const result = bd.UpdateUser(u.id, u);
          if (result) {
            res.statusCode = 200;
            res.end(JSON.stringify(u));
          } else {
            res.statusCode = 400;
            res.end("Do not update user");
          }
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

function checkUpdate(oldO: UserType, newO: UserType) {
  type InterationObject<T> = {
    [key in keyof T]: T[key];
  };

  const test: InterationObject<UserType> = newO;

  for (const key in test) {
    const param = test[key as keyof UserType];
    if (param) {
      (oldO as any)[key] = param;
    }
  }

  return oldO;
}
