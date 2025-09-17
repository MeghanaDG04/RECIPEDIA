import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const FoodRecipe = () => {
  const recipes = [
    {
      id: uuidv4(),
      category: "Breakfast",
      title: "Pancakes",
      image: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0",
      desc: "Fluffy pancakes with maple syrup, perfect for mornings.",
      details: {
        prepTime: "10 mins",
        cookTime: "15 mins",
        servings: 4,
        ingredients: [
          "1 cup all-purpose flour",
          "2 tbsp sugar",
          "1 tsp baking powder",
          "1/2 tsp baking soda",
          "Pinch of salt",
          "1 cup milk",
          "1 egg",
          "2 tbsp melted butter",
          "Maple syrup (for serving)",
        ],
        steps: [
          "Mix flour, sugar, baking powder, baking soda, and salt in a bowl.",
          "Whisk milk, egg, and melted butter in another bowl.",
          "Combine wet and dry ingredients until just mixed (don’t overmix).",
          "Heat a non-stick pan, pour batter, cook until bubbles form, flip until golden.",
          "Serve warm with butter and maple syrup.",
        ],
        tips: [
          "Don’t overmix — lumps are okay!",
          "Use medium-low heat for even cooking.",
          "Add blueberries or chocolate chips for variety.",
        ],
      },
    },

    {
      id: uuidv4(),
      category: "Healthy",
      title: "🥗 Salad",
      image: "https://images.unsplash.com/photo-1506086679524-493c64fdfaa6",
      desc: "Fresh veggies with tangy dressing — light and refreshing.",
      details: {
        prepTime: "10 mins",
        cookTime: "15 mins",
        servings: 4,
        ingredients: [
          "1 cup all-purpose flour",
          "2 tbsp sugar",
          "1 tsp baking powder",
          "1/2 tsp baking soda",
          "Pinch of salt",
          "1 cup milk",
          "1 egg",
          "2 tbsp melted butter",
          "Maple syrup (for serving)",
        ],
        steps: [
          "Mix flour, sugar, baking powder, baking soda, and salt in a bowl.",
          "Whisk milk, egg, and melted butter in another bowl.",
          "Combine wet and dry ingredients until just mixed (don’t overmix).",
          "Heat a non-stick pan, pour batter, cook until bubbles form, flip until golden.",
          "Serve warm with butter and maple syrup.",
        ],
        tips: [
          "Don’t overmix — lumps are okay!",
          "Use medium-low heat for even cooking.",
          "Add blueberries or chocolate chips for variety.",
        ],
      },
    },
    {
      id: uuidv4(),
      category: "Italian",
      title: "🍝 Spaghetti Carbonara",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
      desc: "Classic Italian pasta with eggs, cheese, and pancetta.",
      details: {
        prepTime: "10 mins",
        cookTime: "15 mins",
        servings: 4,
        ingredients: [
          "1 cup all-purpose flour",
          "2 tbsp sugar",
          "1 tsp baking powder",
          "1/2 tsp baking soda",
          "Pinch of salt",
          "1 cup milk",
          "1 egg",
          "2 tbsp melted butter",
          "Maple syrup (for serving)",
        ],
        steps: [
          "Mix flour, sugar, baking powder, baking soda, and salt in a bowl.",
          "Whisk milk, egg, and melted butter in another bowl.",
          "Combine wet and dry ingredients until just mixed (don’t overmix).",
          "Heat a non-stick pan, pour batter, cook until bubbles form, flip until golden.",
          "Serve warm with butter and maple syrup.",
        ],
        tips: [
          "Don’t overmix — lumps are okay!",
          "Use medium-low heat for even cooking.",
          "Add blueberries or chocolate chips for variety.",
        ],
      },
    },
    {
      id: uuidv4(),
      category: "Fast Food",
      title: "🍕 Margherita Pizza",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUM1pySKC2L6di9Yx6dP4k4ftwXkdCSPKllA&s",
      desc: "Crispy crust, tomato sauce, mozzarella & fresh basil.",
      details: {
        prepTime: "10 mins",
        cookTime: "15 mins",
        servings: 4,
        ingredients: [
          "1 cup all-purpose flour",
          "2 tbsp sugar",
          "1 tsp baking powder",
          "1/2 tsp baking soda",
          "Pinch of salt",
          "1 cup milk",
          "1 egg",
          "2 tbsp melted butter",
          "Maple syrup (for serving)",
        ],
        steps: [
          "Mix flour, sugar, baking powder, baking soda, and salt in a bowl.",
          "Whisk milk, egg, and melted butter in another bowl.",
          "Combine wet and dry ingredients until just mixed (don’t overmix).",
          "Heat a non-stick pan, pour batter, cook until bubbles form, flip until golden.",
          "Serve warm with butter and maple syrup.",
        ],
        tips: [
          "Don’t overmix — lumps are okay!",
          "Use medium-low heat for even cooking.",
          "Add blueberries or chocolate chips for variety.",
        ],
      },
    },
    {
      id: uuidv4(),
      category: "Indian",
      title: "🍛 Chicken Curry",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4KfliqLSvMmQa5rOpSHI2aPRDkOXM6frJ1g&s",
      desc: "Spicy and flavorful curry served with steamed rice.",
      details: {
        prepTime: "10 mins",
        cookTime: "15 mins",
        servings: 4,
        ingredients: [
          "1 cup all-purpose flour",
          "2 tbsp sugar",
          "1 tsp baking powder",
          "1/2 tsp baking soda",
          "Pinch of salt",
          "1 cup milk",
          "1 egg",
          "2 tbsp melted butter",
          "Maple syrup (for serving)",
        ],
        steps: [
          "Mix flour, sugar, baking powder, baking soda, and salt in a bowl.",
          "Whisk milk, egg, and melted butter in another bowl.",
          "Combine wet and dry ingredients until just mixed (don’t overmix).",
          "Heat a non-stick pan, pour batter, cook until bubbles form, flip until golden.",
          "Serve warm with butter and maple syrup.",
        ],
        tips: [
          "Don’t overmix — lumps are okay!",
          "Use medium-low heat for even cooking.",
          "Add blueberries or chocolate chips for variety.",
        ],
      },
    },
    {
      id: uuidv4(),
      category: "Dessert",
      title: "🍰 Cheesecake",
      image: "https://images.unsplash.com/photo-1499028344343-cd173ffc68a9",
      desc: "Rich, creamy, and indulgent dessert to end your meal.",
      details: {
        prepTime: "10 mins",
        cookTime: "15 mins",
        servings: 4,
        ingredients: [
          "1 cup all-purpose flour",
          "2 tbsp sugar",
          "1 tsp baking powder",
          "1/2 tsp baking soda",
          "Pinch of salt",
          "1 cup milk",
          "1 egg",
          "2 tbsp melted butter",
          "Maple syrup (for serving)",
        ],
        steps: [
          "Mix flour, sugar, baking powder, baking soda, and salt in a bowl.",
          "Whisk milk, egg, and melted butter in another bowl.",
          "Combine wet and dry ingredients until just mixed (don’t overmix).",
          "Heat a non-stick pan, pour batter, cook until bubbles form, flip until golden.",
          "Serve warm with butter and maple syrup.",
        ],
        tips: [
          "Don’t overmix — lumps are okay!",
          "Use medium-low heat for even cooking.",
          "Add blueberries or chocolate chips for variety.",
        ],
      },
    },
    {
      id: uuidv4(),
      category: "Japanese",
      title: "🍣 Sushi Platter",
      image: "https://images.unsplash.com/photo-1553621042-f6e147245754",
      desc: "Colorful sushi rolls with fresh fish and veggies.",
      details: {
        prepTime: "10 mins",
        cookTime: "15 mins",
        servings: 4,
        ingredients: [
          "1 cup all-purpose flour",
          "2 tbsp sugar",
          "1 tsp baking powder",
          "1/2 tsp baking soda",
          "Pinch of salt",
          "1 cup milk",
          "1 egg",
          "2 tbsp melted butter",
          "Maple syrup (for serving)",
        ],
        steps: [
          "Mix flour, sugar, baking powder, baking soda, and salt in a bowl.",
          "Whisk milk, egg, and melted butter in another bowl.",
          "Combine wet and dry ingredients until just mixed (don’t overmix).",
          "Heat a non-stick pan, pour batter, cook until bubbles form, flip until golden.",
          "Serve warm with butter and maple syrup.",
        ],
        tips: [
          "Don’t overmix — lumps are okay!",
          "Use medium-low heat for even cooking.",
          "Add blueberries or chocolate chips for variety.",
        ],
      },
    },
    {
      id: uuidv4(),
      category: "Fast Food",
      title: "🍔 Beef Burger",
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349",
      desc: "Juicy burger with cheese, lettuce, and secret sauce.",
      details: {
        prepTime: "10 mins",
        cookTime: "15 mins",
        servings: 4,
        ingredients: [
          "1 cup all-purpose flour",
          "2 tbsp sugar",
          "1 tsp baking powder",
          "1/2 tsp baking soda",
          "Pinch of salt",
          "1 cup milk",
          "1 egg",
          "2 tbsp melted butter",
          "Maple syrup (for serving)",
        ],
        steps: [
          "Mix flour, sugar, baking powder, baking soda, and salt in a bowl.",
          "Whisk milk, egg, and melted butter in another bowl.",
          "Combine wet and dry ingredients until just mixed (don’t overmix).",
          "Heat a non-stick pan, pour batter, cook until bubbles form, flip until golden.",
          "Serve warm with butter and maple syrup.",
        ],
        tips: [
          "Don’t overmix — lumps are okay!",
          "Use medium-low heat for even cooking.",
          "Add blueberries or chocolate chips for variety.",
        ],
      },
    },
    {
      id: uuidv4(),
      category: "Spanish",
      title: "🥘 Paella",
      image:
        "https://www.frontiercoop.com/media/wysiwyg/tmp/frontier-recipe-spanish-paella-with-saffron-and-smoked-paprika-900x900.jpg",
      desc: "Spanish seafood rice dish full of flavors and colors.",
      details: {
        prepTime: "10 mins",
        cookTime: "15 mins",
        servings: 4,
        ingredients: [
          "1 cup all-purpose flour",
          "2 tbsp sugar",
          "1 tsp baking powder",
          "1/2 tsp baking soda",
          "Pinch of salt",
          "1 cup milk",
          "1 egg",
          "2 tbsp melted butter",
          "Maple syrup (for serving)",
        ],
        steps: [
          "Mix flour, sugar, baking powder, baking soda, and salt in a bowl.",
          "Whisk milk, egg, and melted butter in another bowl.",
          "Combine wet and dry ingredients until just mixed (don’t overmix).",
          "Heat a non-stick pan, pour batter, cook until bubbles form, flip until golden.",
          "Serve warm with butter and maple syrup.",
        ],
        tips: [
          "Don’t overmix — lumps are okay!",
          "Use medium-low heat for even cooking.",
          "Add blueberries or chocolate chips for variety.",
        ],
      },
    },
    {
      id: uuidv4(),
      category: "Dessert",
      title: "🍩 Donuts",
      image: "https://images.unsplash.com/photo-1509460913899-515f1df34fea",
      desc: "Soft, glazed donuts with colorful toppings.",
      details: {
        prepTime: "10 mins",
        cookTime: "15 mins",
        servings: 4,
        ingredients: [
          "1 cup all-purpose flour",
          "2 tbsp sugar",
          "1 tsp baking powder",
          "1/2 tsp baking soda",
          "Pinch of salt",
          "1 cup milk",
          "1 egg",
          "2 tbsp melted butter",
          "Maple syrup (for serving)",
        ],
        steps: [
          "Mix flour, sugar, baking powder, baking soda, and salt in a bowl.",
          "Whisk milk, egg, and melted butter in another bowl.",
          "Combine wet and dry ingredients until just mixed (don’t overmix).",
          "Heat a non-stick pan, pour batter, cook until bubbles form, flip until golden.",
          "Serve warm with butter and maple syrup.",
        ],
        tips: [
          "Don’t overmix — lumps are okay!",
          "Use medium-low heat for even cooking.",
          "Add blueberries or chocolate chips for variety.",
        ],
      },
    },
    {
      id: uuidv4(),
      category: "Healthy",
      title: "🥤 Smoothie Bowl",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsslh9xbiYJtK0SwOrDG2KShEaJ-OfaDIPCQ&s",
      desc: "Blended fruits topped with granola, nuts & berries.",
      details: {
        prepTime: "10 mins",
        cookTime: "15 mins",
        servings: 4,
        ingredients: [
          "1 cup all-purpose flour",
          "2 tbsp sugar",
          "1 tsp baking powder",
          "1/2 tsp baking soda",
          "Pinch of salt",
          "1 cup milk",
          "1 egg",
          "2 tbsp melted butter",
          "Maple syrup (for serving)",
        ],
        steps: [
          "Mix flour, sugar, baking powder, baking soda, and salt in a bowl.",
          "Whisk milk, egg, and melted butter in another bowl.",
          "Combine wet and dry ingredients until just mixed (don’t overmix).",
          "Heat a non-stick pan, pour batter, cook until bubbles form, flip until golden.",
          "Serve warm with butter and maple syrup.",
        ],
        tips: [
          "Don’t overmix — lumps are okay!",
          "Use medium-low heat for even cooking.",
          "Add blueberries or chocolate chips for variety.",
        ],
      },
    },
    {
      id: uuidv4(),
      category: "Japanese",
      title: "🍲 Ramen",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDUlVWVxcuFr6hPFRT3wBf2R8xci8N3uB0pw&s",
      desc: "Japanese noodle soup with broth, eggs, and toppings.",
      details: {
        prepTime: "10 mins",
        cookTime: "15 mins",
        servings: 4,
        ingredients: [
          "1 cup all-purpose flour",
          "2 tbsp sugar",
          "1 tsp baking powder",
          "1/2 tsp baking soda",
          "Pinch of salt",
          "1 cup milk",
          "1 egg",
          "2 tbsp melted butter",
          "Maple syrup (for serving)",
        ],
        steps: [
          "Mix flour, sugar, baking powder, baking soda, and salt in a bowl.",
          "Whisk milk, egg, and melted butter in another bowl.",
          "Combine wet and dry ingredients until just mixed (don’t overmix).",
          "Heat a non-stick pan, pour batter, cook until bubbles form, flip until golden.",
          "Serve warm with butter and maple syrup.",
        ],
        tips: [
          "Don’t overmix — lumps are okay!",
          "Use medium-low heat for even cooking.",
          "Add blueberries or chocolate chips for variety.",
        ],
      },
    },
    {
      id: uuidv4(),
      category: "Grilled",
      title: "🍗 Grilled Chicken",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWGVYaGA_psg7DLH9KeTS3mQIA_SRAKJpyvw&s",
      desc: "Tender and smoky chicken with spices and herbs.",
      details: {
        prepTime: "10 mins",
        cookTime: "15 mins",
        servings: 4,
        ingredients: [
          "1 cup all-purpose flour",
          "2 tbsp sugar",
          "1 tsp baking powder",
          "1/2 tsp baking soda",
          "Pinch of salt",
          "1 cup milk",
          "1 egg",
          "2 tbsp melted butter",
          "Maple syrup (for serving)",
        ],
        steps: [
          "Mix flour, sugar, baking powder, baking soda, and salt in a bowl.",
          "Whisk milk, egg, and melted butter in another bowl.",
          "Combine wet and dry ingredients until just mixed (don’t overmix).",
          "Heat a non-stick pan, pour batter, cook until bubbles form, flip until golden.",
          "Serve warm with butter and maple syrup.",
        ],
        tips: [
          "Don’t overmix — lumps are okay!",
          "Use medium-low heat for even cooking.",
          "Add blueberries or chocolate chips for variety.",
        ],
      },
    },
    {
      id: uuidv4(),
      category: "Dessert",
      title: "🍨 Ice Cream Sundae",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPaXfRaJpgj4tiWx5dYOBNevQS_oQcAI0XoQ&s",
      desc: "Cold and creamy with chocolate, nuts, and cherries.",
      details: {
        prepTime: "10 mins",
        cookTime: "15 mins",
        servings: 4,
        ingredients: [
          "1 cup all-purpose flour",
          "2 tbsp sugar",
          "1 tsp baking powder",
          "1/2 tsp baking soda",
          "Pinch of salt",
          "1 cup milk",
          "1 egg",
          "2 tbsp melted butter",
          "Maple syrup (for serving)",
        ],
        steps: [
          "Mix flour, sugar, baking powder, baking soda, and salt in a bowl.",
          "Whisk milk, egg, and melted butter in another bowl.",
          "Combine wet and dry ingredients until just mixed (don’t overmix).",
          "Heat a non-stick pan, pour batter, cook until bubbles form, flip until golden.",
          "Serve warm with butter and maple syrup.",
        ],
        tips: [
          "Don’t overmix — lumps are okay!",
          "Use medium-low heat for even cooking.",
          "Add blueberries or chocolate chips for variety.",
        ],
      },
    },
    {
      id: uuidv4(),
      category: "Bakery",
      title: "🥖 French Baguette",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSA31k9ukrK_d41uUcx6owCcWfMoc-H98Yycw&s",
      desc: "Freshly baked crispy baguette straight from the oven.",
      details: {
        prepTime: "10 mins",
        cookTime: "15 mins",
        servings: 4,
        ingredients: [
          "1 cup all-purpose flour",
          "2 tbsp sugar",
          "1 tsp baking powder",
          "1/2 tsp baking soda",
          "Pinch of salt",
          "1 cup milk",
          "1 egg",
          "2 tbsp melted butter",
          "Maple syrup (for serving)",
        ],
        steps: [
          "Mix flour, sugar, baking powder, baking soda, and salt in a bowl.",
          "Whisk milk, egg, and melted butter in another bowl.",
          "Combine wet and dry ingredients until just mixed (don’t overmix).",
          "Heat a non-stick pan, pour batter, cook until bubbles form, flip until golden.",
          "Serve warm with butter and maple syrup.",
        ],
        tips: [
          "Don’t overmix — lumps are okay!",
          "Use medium-low heat for even cooking.",
          "Add blueberries or chocolate chips for variety.",
        ],
      },
    },
    {
      id: uuidv4(),
      category: "Snacks",
      title: "🍷 Wine & Cheese Platter",
      image:
        "https://img.freepik.com/free-photo/cheese-board-with-hard-cheese-cheese-knife-red-wine-glass-grape-brown-concrete-surface_114579-5346.jpg?semt=ais_incoming&w=740&q=80",
      desc: "Perfect for evening relaxation and social gatherings.",
      details: {
        prepTime: "10 mins",
        cookTime: "15 mins",
        servings: 4,
        ingredients: [
          "1 cup all-purpose flour",
          "2 tbsp sugar",
          "1 tsp baking powder",
          "1/2 tsp baking soda",
          "Pinch of salt",
          "1 cup milk",
          "1 egg",
          "2 tbsp melted butter",
          "Maple syrup (for serving)",
        ],
        steps: [
          "Mix flour, sugar, baking powder, baking soda, and salt in a bowl.",
          "Whisk milk, egg, and melted butter in another bowl.",
          "Combine wet and dry ingredients until just mixed (don’t overmix).",
          "Heat a non-stick pan, pour batter, cook until bubbles form, flip until golden.",
          "Serve warm with butter and maple syrup.",
        ],
        tips: [
          "Don’t overmix — lumps are okay!",
          "Use medium-low heat for even cooking.",
          "Add blueberries or chocolate chips for variety.",
        ],
      },
    },
  ];

  const navigate = useNavigate();

  const handleViewRecipe = (recipe) => {
    navigate(`/recipe/${recipe.id}`, { state: { recipe } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white text-gray-800">
      {/* Header */}
      <header className="text-center py-20 bg-orange-500 text-white shadow-md">
        <h1 className="text-4xl md:text-5xl font-bold">
          🍽️ Food Recipe Collection
        </h1>
        <p className="text-lg mt-2 opacity-90">
          Explore 16 delicious recipes for every mood and meal!
        </p>
      </header>

      {/* Recipes Grid */}
      <main className="max-w-6xl mx-auto p-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white shadow-lg rounded-2xl overflow-hidden hover:scale-105 transition-transform"
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-1">{recipe.title}</h2>
              <p className="text-sm text-orange-500 font-medium mb-2">
                {recipe.category}
              </p>
              <p className="text-gray-600">{recipe.desc}</p>
              <button
                onClick={() => handleViewRecipe(recipe)}
                className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600"
              >
                View Recipe
              </button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default FoodRecipe;
