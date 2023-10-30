import express from "express";
import { AuthMiddleware, AuthRequest } from "./auth/middleware";
import { toToken } from "./auth/jwt";
import { json } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const prisma = new PrismaClient();
const app = express();
app.use(json());
app.use(cors());
const port = 3001;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  next();
});

app.listen(port, () => {
  console.log(`⚡ Listening on port: ${port}`);
});

app.get("/me", AuthMiddleware, (req: AuthRequest, res) => {
  const userId = req.userId;
  if (userId === undefined) {
    res.status(500).send({ message: "Something went terribly wrong!" });
    return;
  }
  res.send({ message: `Hello chief, ${userId}`, userId: userId });
});

// POST /login
app.post("/login", async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) {
    res.status(400).send({ message: "Body needs 'name' and 'password'" });
    return;
  }
  const userToLogin = await prisma.user.findFirst({
    where: { name: name },
  });
  if (!userToLogin || userToLogin.password !== password) {
    res.status(400).send({ message: "Login Failed" });
    return;
  }
  const token = toToken({ userId: userToLogin.id });
  res.send({ message: "Login success", token: token });
});

app.get("/categories", async (req, res) => {
  const categories = await prisma.category.findMany();
  res.send(categories);
});

app.get("/recipes", async (req, res) => {
  const recipes = await prisma.recipe.findMany({
    include: {
      comments: true,
      category: true,
    },
  });
  res.send(recipes);
});

app.get("/recipes/:recipeId", async (req, res) => {
  const recipeId = parseInt(req.params.recipeId);

  if (isNaN(recipeId)) {
    res.status(400).send({
      message: "Wrong request! Number ID needed!",
    });
  } else {
    const recipeFromDB = await prisma.recipe.findUnique({
      where: {
        id: recipeId,
      },
      include: {
        user: true,
        comments: true,
        category: true,
      },
    });

    if (recipeFromDB === null) {
      res.status(404).send({
        message: `Can't find animal with ID ${recipeId}`,
      });
    } else {
      res.send(recipeFromDB);
    }
  }
});

app.get("/categories/:catId", async (req, res) => {
  const catId = parseInt(req.params.catId);

  if (isNaN(catId)) {
    res.status(400).send({
      message: "wrong request! Number ID needed!",
    });
  } else {
    const catFromDB = await prisma.category.findUnique({
      where: {
        id: catId,
      },
    });

    if (catFromDB === null) {
      res.status(400).send({
        message: `Can't find animal with ID ${catId}`,
      });
    } else {
      res.send(catFromDB);
    }
  }
});

app.get("/recipe/category/:category", async (req, res) => {
  const recipeCat = req.params.category;

  if (!recipeCat) {
    res
      .status(400)
      .send({ message: "This doesn't appear to be a category..." });
  } else {
    const catFromUrl = await prisma.category.findMany({
      where: {
        name: recipeCat,
      },
      select: {
        id: true,
        name: true,
        img_url: true,
        recipes: true,
      },
    });
    if (catFromUrl.length === 0) {
      res.status(404).send({ message: "No recipes found in this category" });
    } else {
      res.send(catFromUrl);
    }
  }
});
