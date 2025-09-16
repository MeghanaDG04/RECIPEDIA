const Foodrecipe = () => {
  const recipes = [
    {
      title: "🍳 Breakfast – Pancakes",
      image: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0",
      desc: "Fluffy pancakes with maple syrup, perfect for mornings.",
    },
    {
      title: "🥗 Healthy Salad",
      image: "https://images.unsplash.com/photo-1506086679524-493c64fdfaa6",
      desc: "Fresh veggies with tangy dressing — light and refreshing.",
    },
    {
      title: "🍝 Spaghetti Carbonara",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
      desc: "Classic Italian pasta with eggs, cheese, and pancetta.",
    },
    {
      title: "🍕 Margherita Pizza",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUM1pySKC2L6di9Yx6dP4k4ftwXkdCSPKllA&s",
      desc: "Crispy crust, tomato sauce, mozzarella & fresh basil.",
    },
    {
      title: "🍛 Chicken Curry",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4KfliqLSvMmQa5rOpSHI2aPRDkOXM6frJ1g&s",
      desc: "Spicy and flavorful curry served with steamed rice.",
    },
    {
      title: "🍰 Cheesecake",
      image: "https://images.unsplash.com/photo-1499028344343-cd173ffc68a9",
      desc: "Rich, creamy, and indulgent dessert to end your meal.",
    },
    {
      title: "🍣 Sushi Platter",
      image: "https://images.unsplash.com/photo-1553621042-f6e147245754",
      desc: "Colorful sushi rolls with fresh fish and veggies.",
    },
    {
      title: "🍔 Beef Burger",
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349",
      desc: "Juicy burger with cheese, lettuce, and secret sauce.",
    },
    {
      title: "🥘 Paella",
      image: "https://www.frontiercoop.com/media/wysiwyg/tmp/frontier-recipe-spanish-paella-with-saffron-and-smoked-paprika-900x900.jpg",
      desc: "Spanish seafood rice dish full of flavors and colors.",
    },
    {
      title: "🍩 Donuts",
      image: "https://images.unsplash.com/photo-1509460913899-515f1df34fea",
      desc: "Soft, glazed donuts with colorful toppings.",
    },
    {
      title: "🥤 Smoothie Bowl",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsslh9xbiYJtK0SwOrDG2KShEaJ-OfaDIPCQ&s",
      desc: "Blended fruits topped with granola, nuts & berries.",
    },
    {
      title: "🍲 Ramen",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDUlVWVxcuFr6hPFRT3wBf2R8xci8N3uB0pw&s",
      desc: "Japanese noodle soup with broth, eggs, and toppings.",
    },
    {
      title: "🍗 Grilled Chicken",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWGVYaGA_psg7DLH9KeTS3mQIA_SRAKJpyvw&s",
      desc: "Tender and smoky chicken with spices and herbs.",
    },
    {
      title: "🍨 Ice Cream Sundae",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPaXfRaJpgj4tiWx5dYOBNevQS_oQcAI0XoQ&s",
      desc: "Cold and creamy with chocolate, nuts, and cherries.",
    },
    {
      title: "🥖 French Baguette",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSA31k9ukrK_d41uUcx6owCcWfMoc-H98Yycw&s",
      desc: "Freshly baked crispy baguette straight from the oven.",
    },
    {
      title: "🍷 Wine & Cheese Platter",
      image: "https://img.freepik.com/free-photo/cheese-board-with-hard-cheese-cheese-knife-red-wine-glass-grape-brown-concrete-surface_114579-5346.jpg?semt=ais_incoming&w=740&q=80",
      desc: "Perfect for evening relaxation and social gatherings.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white text-gray-800">
      {/* Header */}
      <header className="text-center py-20 bg-orange-500 text-white shadow-md">
        <h1 className="text-4xl md:text-5xl font-bold">🍽️ Food Recipe Collection</h1>
        <p className="text-lg mt-2 opacity-90">
          Explore 16 delicious recipes for every mood and meal!
        </p>
      </header>

      {/* Recipes Grid */}
      <main className="max-w-6xl mx-auto p-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-2xl overflow-hidden hover:scale-105 transition-transform"
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
              <p className="text-gray-600">{recipe.desc}</p>
              <button className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600">
                View Recipe
              </button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Foodrecipe;
