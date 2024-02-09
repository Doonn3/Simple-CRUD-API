import { loggerMiddleware } from "./middlewares/loggerMiddleware.js";

import { miniCloneExpress } from "./core/MiniCloneExpress.js";
import "./routes/get.AllUsers.js";
import "./routes/get.UserByID.js";
import "./routes/post.SetUser.js";
import "./routes/put.UserByID.js";

const PORT = 4000;
const SERVER_STARTED_MESSAGE = `Server started on port ${PORT}`;

// app.Server.on("request", loggerMiddleware);
miniCloneExpress.Server.listen(PORT, () => console.log(SERVER_STARTED_MESSAGE));

// const server = createServer((req, res) => {
//   //   res.writeHead(200, { "Content-Type": "text/plain" });
//   //   res.end("Hello World\n");
//   if (!req.url) return;
//   const parseURL = url.parse(req.url, true);
//   const query = parseURL.query;
//   const path = parseURL.path;
//   const method = req.method?.toUpperCase();

//   if (path === null) return;
//   if (method === undefined) return;

//   const regex = /\/api\/users\/(\w+)/;
//   const match = path?.match(regex);

//   console.log(match);

//   app.get("/api/users", req, res, () => {
//     console.log('ВЫЗОВ GET');
//   });

// const route = routes[path];

// if (route) {
//   const rMethod = route[method];
//   rMethod(req, res);
// }
// });

// server.on("request", loggerMiddleware);

// server.listen(PORT, () => console.log(SERVER_STARTED_MESSAGE));

// export { server };
