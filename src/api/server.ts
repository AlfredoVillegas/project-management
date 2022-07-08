import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import Router from 'express-promise-router';
import swaggerUi from 'swagger-ui-express';
import { registerAuthRoutes } from './Auth/auth.route';
import { registerCheckApiStatus } from './CheckApiStatus';
import { registerChecklistsRoutes } from './ProjectsManagement/Checklists/checklists.route';
import { registerProjectsRoutes } from './ProjectsManagement/Projects/projects.route';
import { registerTasksRoutes } from './ProjectsManagement/Task/task.route';
import { registerUsersRoutes } from './UserAccess/Users/users.route';

export class Server {
  private app: Application;
  private port: string;
  readonly apiPath = '/api';

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '3000';

    this.middlewares();
    this.initRoutes();
  }

  private middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.app.engine('html', require('ejs').renderFile);

    this.app.use('/api/docs', swaggerUi.serve, async (_req: Request, res: Response) => {
      return res.send(swaggerUi.generateHTML(await import(__dirname + '/../../swagger.json')));
    });
  }

  private initRoutes() {
    const router = Router();
    this.app.use(this.apiPath, router);

    registerCheckApiStatus(router);
    registerAuthRoutes(router);
    registerProjectsRoutes(router);
    registerTasksRoutes(router);
    registerUsersRoutes(router);
    registerChecklistsRoutes(router);

    router.use((err: Error, req: Request, res: Response, next: Function) => {
      //'error handler General'
      // this.logger.error(err);
      res.status(500).send('Internal server error');
    });
  }

  async listen() {
    this.app.listen(this.port, () => {
      console.log(` App is running at http://localhost:${this.port}${this.apiPath} `);
      console.log(' Press CTRL-C to stop\n');
    });
  }
}
