import { IncomingMessage, ServerResponse } from "http";
import { UserController } from "../controllers/UserController.js";

import { bd, UserType, validateUserType } from "../BD.js";

import { v4 } from "uuid";

import url from "url";


const userController = new UserController();

type TT = {
  [Key in string]: {
    [key in string]: (
      req: IncomingMessage,
      res: ServerResponse<IncomingMessage>
    ) => void;
  };
};

export const routes: TT = {
  "/api/users": {
    GET: (req, res) => {
      console.log("api/user");
      res.statusCode = 200;
      const alluser = JSON.stringify(bd.GetAll());
      res.end(alluser);
    },

    POST: (req, res) => {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });

      req.on("end", () => {
        console.log("END");
        try {
          const user = JSON.parse(body) as UserType;

          user.id = v4();

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
    },
  },

  "/\/api\/users\/(\w+)/": {
    GET: (req, res) => {
      console.log(req.url);
      console.log("!!!!!!!!!!!!!!!");
      const parsedUrl = url.parse(req.url!);
      const path = parsedUrl.pathname;
  
      const regex = /\/api\/users\/(\w+)/;
      const match = path?.match(regex);
      console.log(match);
      console.log(path);
      res.end(req.url);
    },

    POST: (req, res) => {},
  },
};

// GET
// api/users
// api/users/{userId}

// POST
// api/users

// PUT
// api/users/{userId}

// DELETE
// api/users/{userId}
