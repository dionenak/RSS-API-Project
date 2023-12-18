import express, { Response } from 'express';
import data, {
  UserInput,
  createRSS,
  updateItems,
} from '../controller/routeController';

function sendServerError(res: Response) {
  return res.status(500).send({
    message: 'Something went wrong with the server.',
  });
}

const router = express.Router();

router.get('/api', (req, res) => {
  const RSS = createRSS(data.items);
  if (!RSS) return sendServerError(res);
  res.type('.rss').send(RSS);
});

router.post('/api', (req, res) => {
  const userInput: UserInput = {
    title: req.body.title,
    link: req.body.link,
    description: req.body.description,
  };
  if (!userInput.link || !userInput.title || !userInput.description)
    return (
      res
        // `Unprocessable Entity` error code.
        .status(422)
        .send({
          message:
            'Wrong input. Please insert a valid link, title and description.',
        })
    );
  let RSS: string;
  RSS = '';
  try {
    RSS = updateItems(userInput, data.items);
  } catch (e) {
    return sendServerError(res);
  }
  if (!RSS) return sendServerError(res);
  res.type('.rss').send(RSS);
});

export default router;
