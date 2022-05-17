import cors from 'cors';
import express, { Application } from 'express';
import { EventBus } from '../modules/Shared/domain/EventBus';
import { CheckApiEdpoints } from './CheckApiEndpoint';

export class Server {
  private app: Application;
  private port: string;
  private eventBus: EventBus;
  readonly apiPath = '/api';

  constructor(eventBus: EventBus) {
    this.app = express();
    this.port = process.env.PORT || '3000';
    this.eventBus = eventBus;
    this.middlewares();
    this.initRoutes();
    this.initSubscribers();
  }
  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  initRoutes() {
    CheckApiEdpoints(this.app, this.apiPath);
    //registerAuthRouters(this.app, this.apiPath);
  }

  initSubscribers() {}

  async listen() {
    this.app.listen(this.port, () => {
      console.log(` App is running at http://localhost:${this.port}${this.apiPath} `);
      console.log(' Press CTRL-C to stop\n');
    });
  }
}
