import { useEffect, useState } from "react";
import axios from "axios";
import Categories from "./categories";

interface Recipes {
  id: number;
  name: string;
  img_url: string;
  prep_time: number;
  serves: number;
}

const Recipes = () => {
  // Original Code
  const [getRecipes, setRecipes] = useState<Recipes[] | null>(null);
  useEffect(() => {
    //Define async function for axios
    const getRecipesFromApi = async () => {
      const response = await axios.get("http://localhost:3001/recipes");
      //   console.log(response.data);
      setRecipes(response.data);
    };
    getRecipesFromApi();
  }, []);

  return (
    <div>
      {getRecipes === null ? (
        <p>Loading...</p>
      ) : (
        getRecipes.map((recipe) => {
          return (
            <div key={recipe.id}>
              <p>
                {recipe.id}:{recipe.name}
              </p>
              <p>{recipe.img_url}</p>
              <p>{recipe.prep_time}</p>
              <p>{recipe.serves}</p>
              {/* <button onClick={() => toggleRecipe(recipe.categore)}>
              Breakfast
              </button> */}
            </div>
          );
        })
      )}
    </div>
  );
};

export default Recipes;
