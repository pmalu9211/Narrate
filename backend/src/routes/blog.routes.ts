import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@prathamalu/medium-common";
import { getCookie } from "hono/cookie";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_PRIVATE: string;
  };
  Variables: {
    userId: number;
  };
}>();

blogRouter.get("/bulk", async (c) => {
  console.log(c.get("userId"));
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const doc = await prisma.blog.findMany();
    c.status(200);
    return c.json({
      message: "blogs fetched",
      doc,
    });
  } catch (e) {
    console.log(e);
    c.status(400);
    return c.json({
      message: "couldn't fetch",
    });
  }
});

blogRouter.use("*", async (c, next) => {
  const authHeader = getCookie(c, "token");
  if (!authHeader) {
    c.status(403);
    return c.json({ message: "not logged in" });
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

blogRouter.post("/upload", async (c) => {
  const body = await c.req.json();
  const { success } = createBlogInput.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({
      message: "the inputs are incorrect",
    });
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const authorId = c.get("userId");

  try {
    const doc = await prisma.blog.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: authorId,
        published: true,
        readingTime: body.readingTime,
      },
    });
    c.status(200);
    return c.json({
      message: "blog posted",
      doc,
    });
  } catch (e) {
    console.log(e);
    c.status(400);
    return c.json({
      message: "couldn't post",
    });
  }
});

blogRouter.put("/update", async (c) => {
  const body = await c.req.json();
  body.id = Number(body.id);
  const { success } = updateBlogInput.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({
      message: "the inputs are incorrect",
    });
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const doc = await prisma.blog.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        content: body.content,
        readingTime: body.readingTime,
      },
    });
    c.status(200);
    return c.json({
      message: "blog updated",
      doc,
    });
  } catch (e) {
    console.log(e);
    c.status(400);
    return c.json({
      message: "couldn't update",
    });
  }
});

blogRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const doc = await prisma.blog.findFirst({
      where: {
        id: Number(id),
      },
    });
    const userDoc = await prisma.user.findFirst({
      select: {
        name: true,
        email: true,
        id: true,
        about: true,
      },
      where: {
        id: doc?.authorId,
      },
    });
    c.status(200);
    return c.json({
      message: "blog fetched",
      doc,
      userDoc,
    });
  } catch (e) {
    console.log(e);
    c.status(400);
    return c.json({
      message: "couldn't fetch",
    });
  }
});

blogRouter.delete("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    console.log(id);
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    await prisma.blog.delete({
      where: {
        id: Number(id),
      },
    });
    c.status(200);
    return c.json({
      message: "deleted",
    });
  } catch (e) {
    console.log(e);
    c.status(400);
    return c.json({
      message: "couldn't delete",
    });
  }
});
