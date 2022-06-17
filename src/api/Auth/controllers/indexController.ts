import { Request, Response } from 'express';

export function indexController(req: Request, res: Response) {
  const port = process.env.PORT || '3000';
  const apiPath = process.env.API_PATH || '/api';
  const localhost = `http://localhost:${port}`;

  const host = process.env.HOST || localhost;

  const redirect = host + apiPath;
  const githubClientId = process.env.GITHUB_CLIENT_ID || '';

  const viewsHtml = __dirname + '/../views/index.html';
  res.render(viewsHtml, { redirect, githubClientId });
}
