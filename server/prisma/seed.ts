import categories from "./data/categories.json";
import comments from "./data/comments.json";
import users from "./data/users.json";
import recipes from "./data/recipes.json";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seed = async () => {
  /** Seed the Category */
  for (let i = 0; i < categories.length; i++) {
    const currentCategory = categories[i];
    await prisma.category.create({
      data: currentCategory,
    });
  }

  for (let i = 0; i < users.length; i++) {
    const currentUser = users[i];
    await prisma.user.create({
      data: currentUser,
    });
  }

  for (let i = 0; i < recipes.length; i++) {
    const currentRecipe = recipes[i];
    await prisma.recipe.create({
      data: currentRecipe,
    });
  }

  for (let i = 0; i < comments.length; i++) {
    const currentComment = comments[i];
    await prisma.comment.create({
      data: currentComment,
    });
  }
};

seed();
