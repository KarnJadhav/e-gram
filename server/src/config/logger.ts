import morgan from 'morgan';
import { Application } from 'express';

export const setupLogger = (app: Application) => {
  app.use(morgan('dev'));
};
