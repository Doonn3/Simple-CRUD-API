import { IncomingMessage, ServerResponse } from "http";
import { BaseController } from "./BaseController.js";

export class UserController extends BaseController {
  public get = (req: IncomingMessage, res: IncomingMessage) => void {};

  public post = (req: IncomingMessage, res: ServerResponse<IncomingMessage>) =>
    void {};

  public put = (req: IncomingMessage, res: ServerResponse<IncomingMessage>) =>
    void {};

  public delete = (req: IncomingMessage, res: IncomingMessage) => void {};
}
