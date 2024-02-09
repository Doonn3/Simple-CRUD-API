import { IncomingMessage, ServerResponse, createServer } from "http";
import url from "url";

class RequestMessage extends IncomingMessage {
  public params: string | null = null;
}

type CallbackType = (
  req: RequestMessage,
  res: ServerResponse<IncomingMessage>
) => void;

type MethodType = "GET" | "POST" | "PUT" | "DELETE";

type Route = {
  url: string;
  method: MethodType;
  //   cb: CallbackType;
};

class MiniCloneExpress {
  //   private routes: Route[] = [];

  private routes = new Map<string, CallbackType>();

  public Server = createServer((req, res) => {
    const request = req as RequestMessage;
    if (!request.url) return;

    const parseURL = url.parse(request.url, true);
    const query = parseURL.query;
    const path = parseURL.path;
    const method = req.method?.toUpperCase();

    if (path === null) return;
    if (method === undefined) return;

    const regex = /\/api\/users\/([\w-]+)/;
    const match = path?.match(regex);

    console.log("REGEX >> ", regex);
    console.log("match >> ", match);

    if (match) {
      const pathbyid = path.replace(match[1], ":id");
      const mapKey = `${method} ${pathbyid}`;
      const route = this.getRoute(mapKey);
      request.params = match[1];
      if (route) {
        route(request, res);
      } else {
        res.statusCode = 404;
        res.end("Not Found EndPoint");
      }
    } else {
      const mapKey = `${method} ${path}`;
      const route = this.getRoute(mapKey);
      if (route) {
        route(request, res);
      } else {
        res.statusCode = 404;
        res.end("Not Found EndPoint");
      }
    }
  });

  Get(url: string, callback: CallbackType) {
    const mapKey = `GET ${url}`;
    if (!this.routes.has(mapKey)) {
      this.routes.set(mapKey, callback);
    }
  }

  Post(url: string, callback: CallbackType) {
    const mapKey = `POST ${url}`;

    if (!this.routes.has(mapKey)) {
      this.routes.set(mapKey, callback);
    }
  }

  Put(url: string, callback: CallbackType) {
    const mapKey = `PUT ${url}`;

    if (!this.routes.has(mapKey)) {
      this.routes.set(mapKey, callback);
    }
  }

  Delete(url: string, callback: CallbackType) {
    const mapKey = `DELETE ${url}`;

    if (!this.routes.has(mapKey)) {
      this.routes.set(mapKey, callback);
    }
  }

  private getRoute(mapKey: string) {
    if (this.routes.has(mapKey)) {
      return this.routes.get(mapKey) ?? null;
    }
    return null;
  }
}

export const miniCloneExpress = new MiniCloneExpress();
