import { loggerMiddleware } from "./middlewares/loggerMiddleware.js";

import { miniCloneExpress } from "./core/MiniCloneExpress.js";
import "./routes/get.AllUsers.js";
import "./routes/get.UserByID.js";
import "./routes/post.SetUser.js";
import "./routes/put.UserByID.js";
import "./routes/delete.UserByID.js";

const PORT = 4000;
const SERVER_STARTED_MESSAGE = `Server started on port ${PORT}`;

// app.Server.on("request", loggerMiddleware);
miniCloneExpress.Server.listen(PORT, () => console.log(SERVER_STARTED_MESSAGE));
