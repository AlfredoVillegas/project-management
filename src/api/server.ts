import cors from 'cors';
import express, { Application, Router } from 'express';
import { registerAuthRoutes } from './Auth/auth.route';
import { registerCheckApiStatus } from './CheckApiStatus';
import { registerProjectsRoutes } from './ProjectsManagement/Projects/projects.route';
import { registerTasksRoutes } from './ProjectsManagement/Task/task.route';

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
    //this.app.set('view engine', 'ejs');
  }

  private initRoutes() {
    const router = Router();
    this.app.use(this.apiPath, router);

    registerCheckApiStatus(router);
    registerAuthRoutes(router);
    registerProjectsRoutes(router);
    registerTasksRoutes(router);
  }

  async listen() {
    this.app.listen(this.port, () => {
      console.log(` App is running at http://localhost:${this.port}${this.apiPath} `);
      console.log(' Press CTRL-C to stop\n');
    });
  }
}
