import { Request, Response, Router } from 'express';

export const registerCheckApiStatus = (router: Router): void => {
  router.get('', (req: Request, res: Response) => {
    return res.status(200).send('OK');
  });
};
