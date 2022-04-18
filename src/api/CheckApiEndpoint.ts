import { Application, Request, Response } from 'express';

export const CheckApiEdpoints = (app: Application, apiPath: string): void => {
  app.get(apiPath, (req: Request, res: Response) => {
    return res.status(200).send('OK');
  });
};
