export interface Recipe {
  id: number;
  name: string;
  img_url: string;
  instructions: string;
  ingredients: string;
  prep_time: number;
  serves: number;
  userId: number;
  category: Category[];
  comments: Comment[];
}

export interface Category {
  id: number;
  name: string;
  img_url: string;
}

export interface Comment {
  id: number;
  name: string;
  message: string;
  created_at: number;
  rating: number;
  recipeId: number;
}
