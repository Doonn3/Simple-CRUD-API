import { IncomingMessage, ServerResponse } from "http";

export const loggerMiddleware = (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) => {
  console.log('LoggerMiddleware');
  console.log(`${req.method} ${req.url}`);
  console.log('<<LoggerMiddleware>>');
};
