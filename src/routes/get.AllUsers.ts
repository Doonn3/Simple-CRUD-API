import { miniCloneExpress } from "../core/MiniCloneExpress.js";
import { bd } from "../BD.js";

miniCloneExpress.Get("/api/users", (req, res) => {
  console.log("ВЫЗОВ GET");
  console.log("ВЫЗОВ GET >> ПОЛУЧЕНИЯ ВСЕХ ЮЗЕРОВ");
  try {
    res.statusCode = 200;
    const alluser = JSON.stringify(bd.GetAll());
    res.end(alluser);
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
});
