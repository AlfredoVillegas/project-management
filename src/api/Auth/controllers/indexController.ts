import { Request, Response } from 'express';

export function indexController(req: Request, res: Response) {
  const port = process.env.PORT || '3000';
  const apiPath = process.env.API_PATH || '/api';
  const localhost = process.env.LOCAL_HOST || 'http://localhost:';
  const host = `${localhost}${port}${apiPath}`;

  const viewsHtml = __dirname + '/../views/index.html';
  res.render(viewsHtml, { host });
}
