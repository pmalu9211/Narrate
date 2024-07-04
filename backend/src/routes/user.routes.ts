import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign, verify } from "hono/jwt";
import { signinInput, signupInput } from "@prathamalu/medium-common";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";
import bcrypt from "bcryptjs";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_PRIVATE: string;
  };
  Variables: {
    userId: number;
  };
}>();

userRouter.post("/signup", async (c) => {
  const body = await c.req.json();
  body.email = body.email.toLowerCase();
  const { success } = signupInput.safeParse(body);

  if (!success) {
    c.status(400);
    return c.json({
      message: "the inputs are incorrect",
    });
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const checkUser = await prisma.user.findFirst({
    where: {
      email: body.email,
    },
  });

  if (checkUser) {
    c.status(400);
    return c.json({ message: "User already exists" });
  }

  const hashedPassword = bcrypt.hashSync(body.password, 10);
  try {
    await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        password: hashedPassword,
      },
    });

    c.status(200);
    return c.json({ message: "signup successful!" });
  } catch (e) {
    console.log(e);
    c.status(501);
    return c.json({ message: "Try again(smt Went wrong)" });
  }
});

userRouter.post("/signin", async (c) => {
  const body = await c.req.json();
  body.email = body.email.toLowerCase();
  const { success } = signinInput.safeParse(body);

  if (!success) {
    c.status(400);
    return c.json({
      message: "the inputs are incorrect",
    });
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const user = await prisma.user.findFirst({
    where: {
      email: body.email,
    },
  });

  if (!user) {
    c.status(400);
    return c.json({ message: "User not found" });
  }

  const validPassword = bcrypt.compareSync(body.password, user.password);
  if (!validPassword) {
    c.status(400);
    return c.json({ message: "The password is incorrect" });
  }

  try {
    const userDoc = await prisma.user.findFirst({
      select: {
        id: true,
        name: true,
        about: true,
      },
      where: {
        email: body.email,
      },
    });

    if (!userDoc) {
      c.status(400);
      return c.json({ message: "The credentials must be wrong" });
    }

    const token = await sign({ id: userDoc.id }, c.env.JWT_PRIVATE);
    setCookie(c, "token", token, {
      // path: "/",
      secure: true,
      // domain: 'example.com',
      // httpOnly: true,
      maxAge: 3456000,
      // expires: new Date(Date.UTC(2025, 1, 24, 10, 30, 59, 900)),
      sameSite: "None",
    });
    c.status(200);
    return c.json({ message: "signin successful !", userDoc });
  } catch (e) {
    console.log(e);
    c.status(501);
    return c.json({ message: "Try again(smt Went wrong)" });
  }
});

userRouter.use("*", async (c, next) => {
  const authHeader = getCookie(c, "token");
  if (!authHeader) {
    c.status(401);
    return c.json({ message: "Please log in" });
  }
  try {
    const user = await verify(authHeader, c.env.JWT_PRIVATE);

    if (user.id) {
      console.log("Authenticated user ID:", user.id);
      c.set("userId", Number(user.id));
      await next();
    } else {
      return c.json({ message: "You are not logged in" }, 403);
    }
  } catch (error) {
    console.error("Authentication error:", error);
    return c.json({ message: "Authentication failed" }, 403);
  }
});

userRouter.get("/auth", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const userDoc = await prisma.user.findFirst({
      select: {
        name: true,
        about: true,
      },
      where: {
        id: c.get("userId"),
      },
    });
    c.status(200);
    return c.json({ userDoc });
  } catch (e) {
    c.status(401);
    return c.json({ message: "User not logged in" });
  }
});

userRouter.get("/profile", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const userDoc = await prisma.user.findFirst({
      where: {
        id: c.get("userId"),
      },
    });

    const blogs = await prisma.blog.findMany({
      where: {
        authorId: c.get("userId"),
      },
    });

    c.status(200);
    return c.json({ userDoc, blogs });
  } catch (e) {
    console.log(e);
    return c.json({ message: "User not logged in" });
  }
});

userRouter.put("/update", async (c) => {
  const body = await c.req.json();

  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    await prisma.user.update({
      where: {
        id: c.get("userId"),
      },
      data: {
        name: body.name,
        about: body.about,
      },
    });

    c.status(200);
    return c.json({ message: "updated successfully" });
  } catch (e) {
    console.log(e);
    c.status(501);
    return c.json({ message: "Unable to update profile" });
  }
});

userRouter.post("/logout", async (c) => {
  try {
    deleteCookie(c, "token", {
      // path: "/",
      secure: true,
      // domain: 'example.com',
      // httpOnly: true,
      maxAge: 3456000,
      // expires: new Date(Date.UTC(2025, 1, 24, 10, 30, 59, 900)),
      sameSite: "None",
    });
    c.status(200);
    return c.json({ message: "logged out successfully" });
  } catch (e) {
    c.status(501);
    return c.json({ message: "Unable to logout" });
  }
});
