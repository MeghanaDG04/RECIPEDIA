import { useLocation, useNavigate } from "react-router-dom";

const RecipeDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const recipe = location.state?.recipe;

  if (!recipe) {
    return <p className="text-center mt-10">Recipe not found.</p>;
  }

  const { details } = recipe;

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white text-gray-800">
  
      <header className="text-center my-10 py-10 bg-orange-500 text-white shadow-md">
        <h1 className="text-4xl font-bold font-25">{recipe.title}</h1>
        <p className="text-4xl mt-2">{recipe.category}</p>
      </header>

      
      <main className="max-w-4xl mx-auto p-6">
       
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-72 object-cover rounded-lg shadow-lg"
        />

       
        <p className="mt-6 text-lg text-gray-700 italic">{recipe.desc}</p>

        {details && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="bg-orange-100 p-4 rounded-lg shadow">
              <p className="text-sm text-gray-600">Prep Time</p>
              <p className="font-semibold">{details.prepTime}</p>
            </div>
            <div className="bg-orange-100 p-4 rounded-lg shadow">
              <p className="text-sm text-gray-600">Cook Time</p>
              <p className="font-semibold">{details.cookTime}</p>
            </div>
            <div className="bg-orange-100 p-4 rounded-lg shadow">
              <p className="text-sm text-gray-600">Servings</p>
              <p className="font-semibold">{details.servings}</p>
            </div>
          </div>
        )}

       
        {details?.ingredients && (
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-orange-600 mb-4">
              📝 Ingredients
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {details.ingredients.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Steps */}
        {details?.steps && (
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-orange-600 mb-4">
              👩‍🍳 Steps
            </h2>
            <ol className="list-decimal list-inside space-y-3 text-gray-700">
              {details.steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </section>
        )}

        {/* Tips */}
        {details?.tips && (
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-orange-600 mb-4">💡 Tips</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {details.tips.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mt-10 px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600"
        >
          🔙 Back
        </button>
      </main>
    </div>
  );
};

export default RecipeDetail;
