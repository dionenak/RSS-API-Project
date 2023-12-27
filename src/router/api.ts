import express, { NextFunction, Response, Request } from 'express';
import data, {
  UserInput,
  createRSS,
  updateItems,
} from '../controller/routeController';

const handlingServerErrors = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(error.stack);
  res.status(500).send({
    message: 'Something went wrong with the server.',
  });
};

const handlingContentTypeError = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.is('application/json')) next();
  console.error(`Client didn't include content-type, thus request failed.`);
  res
    // `Unprocessable Entity` error code.
    .status(415)
    .send({
      message: `Wrong input format. The server accepts only JSON.`,
    });
};
const handlingRequestDataErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.body.link && req.body.title && req.body.description) next();
  console.error(`Client didn't include necessary fields, thus request failed.`);
  res
    // `Unprocessable Entity` error code.
    .status(422)
    .send({
      message:
        'Wrong input. Please insert a valid link, title and description.',
    });
};

const router = express.Router();

router.get('/api', (req, res, next) => {
  try {
    const RSS = createRSS(data.items);
    res.type('.rss').send(RSS);
  } catch (e) {
    next(e);
  }
});

router.post(
  '/api',
  handlingContentTypeError,
  handlingRequestDataErrors,
  (req, res, next) => {
    const userInput: UserInput = {
      title: req.body.title,
      link: req.body.link,
      description: req.body.description,
    };
    try {
      const RSS = updateItems(userInput, data.items);
      res.type('.rss').send(RSS);
    } catch (e) {
      next(e);
    }
  }
);

router.use(handlingServerErrors);
export default router;
