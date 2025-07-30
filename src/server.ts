import app from './app';
import {PORT} from './config/env/app.env';
import ConnectMongo from "./db";

ConnectMongo().then(() => app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`),
)).catch(err => console.log(err));
