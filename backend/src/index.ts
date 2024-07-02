import { Hono } from "hono";
import { cors } from "hono/cors";
import { userRouter } from "./routes/user.routes";
import { blogRouter } from "./routes/blog.routes";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_PRIVATE: string;
  };
}>();

app.use(
  cors({
    origin: "http://localhost:5173",
    // allowHeaders: ["X-Custom-Header", "Upgrade-Insecure-Requests"],
    allowMethods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);
app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);

export default app;
