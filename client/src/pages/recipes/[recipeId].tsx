import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Comment, Recipe, Category } from "@/types/interfaces";
import Menu from "@/component/menu";
import Layout from "@/component/Layout";

const RecipePage = () => {
  const [getRecipe, setRecipe] = useState<null | Recipe>(null);
  const router = useRouter();
  const recipeIdFromUrl = router.query.recipeId;

  useEffect(() => {
    if (recipeIdFromUrl === undefined) {
      return;
    }

    const getRecipeFromApi = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/${recipeIdFromUrl}`
        );
        setRecipe(response.data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    getRecipeFromApi();
  }, [recipeIdFromUrl]);

  if (getRecipe === null) {
    return <p>Loading recipe, please wait...</p>;
  }

  const getRating = getRecipe.comments.map((amountOfRatings) =>
    amountOfRatings.rating.valueOf()
  );
  console.log(getRating);

  const totalRatings = getRating.length;
  console.log(totalRatings);

  const averageRating =
    getRating.reduce((sum: number, rating: number) => sum + rating, 0) /
    totalRatings;
  console.log(averageRating);

  const getStarRating = (averageRating: any) => {
    const roundedRating = Math.round(averageRating * 2) / 2;
    return "⭐️".repeat(roundedRating) + "✩".repeat(5 - roundedRating);
  };

  const servesIcons = ["", "👩‍🍳", "👩‍🍳👨‍🍳", "👩‍🍳👨‍🍳👩‍🍳", "👩‍🍳👨‍🍳👩‍🍳👨‍🍳"];

  const formattedDates = getRecipe.comments.find((comment) => {
    return new Date(comment.created_at).toLocaleString("en-GB");
  });

  console.log(formattedDates);

  return (
    <>
      <Layout navBarBackground={true}>
        <div
          style={{ backgroundImage: `url(${getRecipe.img_url})` }}
          className="recipe-header"
        >
          <div className="black-overlay" />
          <div className="header-text">
            <h1>{getRecipe.name}</h1>
            {getRecipe.category.map((indexCat: Category) => (
              <p key={indexCat.id}>{indexCat.name}</p>
            ))}
            <p>{getStarRating(averageRating)}</p>
          </div>
        </div>

        <div className="recipe-box">
          <div className="recipe-box-top">
            <span className="recipe-box-name">
              <p>{getRecipe.name}</p>
            </span>
            <div className="recipe-box-serving">
              <p>serves: {servesIcons[getRecipe.serves]}</p>
              <p>prep time: {getRecipe.prep_time} min.</p>
            </div>
          </div>

          <div className="recipe-box-body">
            <h2>Instructions:</h2>
            <h2>Ingredients:</h2>
            <p>{getRecipe.instructions}</p>
            <p>{getRecipe.ingredients}</p>
          </div>
        </div>

        <div className="add-comment">
          <h1>Add a comment</h1>
        </div>

        <div className="comment-field">
          <div className="comment-top">
            <label className="name-user">
              <h3>Name</h3>
              <input id="name-user" name="name-user" type="text" />
            </label>
            <div>
              <p>Rating: ✩✩✩✩✩</p>
            </div>
          </div>
          <div className="comment-bottom">
            <label className="review">
              <h3>Review</h3>
              <textarea id="review" name="review" />
            </label>
          </div>
          <div>
            <button className="button">Save</button>
          </div>
        </div>

        <span className="comment-field">
          <div>
            <label className="name-user">
              <h3>Name</h3>
              <input id="name-user" name="name-user" type="text" />
            </label>
          </div>
          <div>
            <label className="review">
              <h3>Review</h3>
              <textarea id="review" name="review" />
            </label>
          </div>
          <div>
            <span>
              <button className="button">Save</button>
            </span>
          </div>
        </span>

        <div className="comment-section">
          <h2>Comments</h2>
          <div className="comment-container">
            {getRecipe.comments.map((comment: Comment) => (
              <div className="comment-body" key={comment.id}>
                <p>{comment.name}</p>
                <p>
                  {new Date(comment.created_at).toLocaleString("en-GB", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                    timeZone: "UTC",
                  })}
                </p>
                <p>{comment.message}</p>
                <p>
                  {"⭐️".repeat(comment.rating) +
                    "✩".repeat(5 - comment.rating)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default RecipePage;
