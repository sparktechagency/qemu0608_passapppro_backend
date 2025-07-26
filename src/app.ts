import express, {Application} from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import {setupSwagger} from "./config/swagger";
import {DefaultErrorHandler, NotFoundHandler} from "./lib/errorHandler";
import submissionRoute from "./routes/submission.route";
import airelinesRoute from "./routes/airelines.route";
import assessmentsRoute from "./routes/assessments.route";
import paymentRoute from "./routes/payment.route";
import authRoute from "./routes/auth.route";
import userRoute from "./routes/user.route";
import statisticsRoute from "./routes/statistics.route";

const app:Application = express();

app.use(
  cors({
    origin: [process.env.CLIENT_URL!],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }),
);


app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(cookieParser());

app.get("/", (req,res) => {
    res.send("Welcome to qemu");
})

app.use("/auth", authRoute)
app.use("/submission", submissionRoute)
app.use("/statistics", statisticsRoute)
app.use("/airlines", airelinesRoute)
app.use("/assessments", assessmentsRoute)
app.use("/payment", paymentRoute)
app.use("/users", userRoute)

setupSwagger(app)

app.use(DefaultErrorHandler)
app.use(NotFoundHandler)

export default app;
