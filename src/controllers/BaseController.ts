import { IncomingMessage, ServerResponse } from "http";

type RequestType = IncomingMessage;
type ResponsetType = ServerResponse<IncomingMessage>;

export abstract class BaseController {
  public get = (_req: RequestType, _res: RequestType) => {};
  public post = (_req: RequestType, _res: ResponsetType) => {};
  public put = (_req: RequestType, _res: ResponsetType) => {};
  public delete = (_req: RequestType, _res: RequestType) => {};
}
