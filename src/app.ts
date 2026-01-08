import appConfig from './app.config';
import './config/dotenv.conf'
import express, { Request, Response } from 'express';

const app = express()

appConfig(app)

app.use(async (_req: Request, res: Response) => {
     res.status(404).send('This is not the API route you are looking for')
})

const PORT = process.env.PORT || 9999;
app.listen(PORT as string, () => {
     console.log("🌐 Server is running on:", process.env.NODE_ENV === "development" ? String(process.env.SITE_API_Local_URL) : String(process.env.SITE_API_URL))
})
