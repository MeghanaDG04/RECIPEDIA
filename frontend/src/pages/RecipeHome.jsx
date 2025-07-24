import React, { useEffect } from 'react';

const RecipeHome = () => {
  useEffect(() => {
    // Initialize Lucide icons if available
    if (window.lucide && window.lucide.createIcons) {
      window.lucide.createIcons();
    }

    // Mobile menu toggle for the header copied from recipe.html
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
      const toggleMenu = () => mobileMenu.classList.toggle('hidden');
      mobileMenuButton.addEventListener('click', toggleMenu);

      // Cleanup on unmount
      return () => {
        mobileMenuButton.removeEventListener('click', toggleMenu);
      };
    }
  }, []);

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `
    <main>
        <!-- Hero Section -->
        <section id="home" class="hero-bg pt-32">
            <div class="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center min-h-[calc(100vh-80px)]">
                <div class="max-w-3xl text-white py-20">
                    <h1 class="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
                        Discover, Share & Cook <br> <span class="gradient-text">Amazing Recipes</span>
                    </h1>
                    <p class="text-lg md:text-xl text-gray-200 mb-8">
                        Join our community of food lovers! Add your own creations, explore dishes from around the world, and manage your favorite recipes all in one place.
                    </p>
                    <div class="flex flex-wrap gap-4">
                        <a href="#categories" class="bg-red-500 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-red-600 transition shadow-lg transform hover:scale-105">Explore Recipes</a>
                        <a href="/register" class="bg-white text-red-500 px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-100 transition shadow-lg transform hover:scale-105">Join Now</a>
                    </div>
                </div>
            </div>
        </section>

        <!-- Categories Section -->
        <section id="categories" class="py-20 bg-gray-50">
            <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12">
                    <h2 class="text-3xl md:text-4xl font-bold text-gray-800">Browse by Category</h2>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <!-- Vegetarian -->
                    <a href="/veg" class="block category-card bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1">
                        <img src="/veg.jpg" alt="Vegetarian" class="w-full h-40 object-cover" />
                        <div class="p-6 text-center">
                            <h3 class="text-xl font-bold text-gray-800">Vegetarian</h3>
                        </div>
                    </a>
                    <!-- Non-Vegetarian -->
                    <a href="/nonveg" class="block category-card bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1">
                        <img src="/nonveg.jpg" alt="Non-Vegetarian" class="w-full h-40 object-cover" />
                        <div class="p-6 text-center">
                            <h3 class="text-xl font-bold text-gray-800">Non-Vegetarian</h3>
                        </div>
                    </a>
                    <!-- Desserts -->
                    <a href="/dessert" class="block category-card bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1">
                        <img src="/dessert.jpg" alt="Desserts" class="w-full h-40 object-cover" />
                        <div class="p-6 text-center">
                            <h3 class="text-xl font-bold text-gray-800">Desserts</h3>
                        </div>
                    </a>
                    <!-- Beverages -->
                    <a href="/beverages" class="block category-card bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1">
                        <img src="/beverages.jpg" alt="Beverages" class="w-full h-40 object-cover" />
                        <div class="p-6 text-center">
                            <h3 class="text-xl font-bold text-gray-800">Beverages</h3>
                        </div>
                    </a>
                </div>
            </div>
        </section>

        <!-- How It Works Section -->
        <section id="about" class="py-20">
            <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12">
                    <h2 class="text-3xl md:text-4xl font-bold text-gray-800">Get Cooking in 3 Easy Steps</h2>
                    <p class="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">Join our community and start your culinary journey today.</p>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <!-- Step 1 -->
                    <div class="p-6">
                        <div class="bg-red-100 text-red-500 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-md">
                            <i data-lucide="user-plus" class="w-10 h-10"></i>
                        </div>
                        <h3 class="text-xl font-bold mb-3">Create an Account</h3>
                        <p class="text-gray-600">Sign up for free to get your personalized profile and start your collection.</p>
                    </div>
                    <!-- Step 2 -->
                    <div class="p-6">
                        <div class="bg-yellow-100 text-yellow-500 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-md">
                            <i data-lucide="plus-square" class="w-10 h-10"></i>
                        </div>
                        <h3 class="text-xl font-bold mb-3">Add Your Recipes</h3>
                        <p class="text-gray-600">Share your favorite dishes with our community using our simple recipe editor.</p>
                    </div>
                    <!-- Step 3 -->
                    <div class="p-6">
                        <div class="bg-green-100 text-green-500 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-md">
                            <i data-lucide="search" class="w-10 h-10"></i>
                        </div>
                        <h3 class="text-xl font-bold mb-3">Explore & Interact</h3>
                        <p class="text-gray-600">Discover new meals, leave comments, and like the recipes that inspire you.</p>
                    </div>
                </div>
            </div>
        </section>
        
        <!-- Features Section -->
        <section id="features" class="py-20 bg-white">
            <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <img src="https://placehold.co/600x450/fbbf24/ffffff?text=Recipedia+App" alt="Recipedia App Interface" class="rounded-xl shadow-2xl" />
                    </div>
                    <div>
                        <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-6">All The Tools You Need</h2>
                        <ul class="space-y-6">
                            <li class="flex items-start space-x-4">
                                <div class="bg-red-500 text-white rounded-full w-8 h-8 flex-shrink-0 flex items-center justify-center mt-1">
                                    <i data-lucide="lock" class="w-5 h-5"></i>
                                </div>
                                <div>
                                    <h3 class="text-xl font-semibold">Secure User Authentication</h3>
                                    <p class="text-gray-600">Keep your recipes and profile safe with our secure login and sign-up system.</p>
                                </div>
                            </li>
                            <li class="flex items-start space-x-4">
                                <div class="bg-red-500 text-white rounded-full w-8 h-8 flex-shrink-0 flex items-center justify-center mt-1">
                                    <i data-lucide="edit" class="w-5 h-5"></i>
                                </div>
                                <div>
                                    <h3 class="text-xl font-semibold">Full Recipe Management</h3>
                                    <p class="text-gray-600">Easily add, edit, and delete your recipes whenever you want.</p>
                                </div>
                            </li>
                            <li class="flex items-start space-x-4">
                                <div class="bg-red-500 text-white rounded-full w-8 h-8 flex-shrink-0 flex items-center justify-center mt-1">
                                    <i data-lucide="thumbs-up" class="w-5 h-5"></i>
                                </div>
                                <div>
                                    <h3 class="text-xl font-semibold">Community Interaction</h3>
                                    <p class="text-gray-600">Like your favorite recipes and leave comments to connect with other foodies.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="bg-red-600">
            <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                <h2 class="text-3xl font-bold text-white mb-4">Ready to Share Your Culinary Genius?</h2>
                <p class="text-red-100 text-lg mb-8 max-w-2xl mx-auto">Create your free account today and become part of the Recipedia family. Your next favorite dish is just a click away.</p>
                <a href="/register" class="bg-white text-red-600 font-bold py-4 px-8 rounded-full text-lg hover:bg-gray-100 transition transform hover:scale-105 shadow-lg">Sign Up Now</a>
            </div>
        </section>

    </main>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                <!-- About -->
                <div class="md:col-span-1">
                    <h4 class="text-lg font-semibold mb-4">Recipedia</h4>
                    <p class="text-gray-400">Your daily source for delicious recipes from around the world.</p>
                </div>
                <!-- Quick Links -->
                <div>
                    <h4 class="text-lg font-semibold mb-4">Quick Links</h4>
                    <ul class="space-y-2">
                        <li><a href="#recipes" class="text-gray-400 hover:text-white">Explore</a></li>
                        <li><a href="#features" class="text-gray-400 hover:text-white">Features</a></li>
                        <li><a href="/add-recipe" class="text-gray-400 hover:text-white">Add Recipe</a></li>
                    </ul>
                </div>
                <!-- Legal -->
                <div>
                    <h4 class="text-lg font-semibold mb-4">Legal</h4>
                    <ul class="space-y-2">
                        <li><a href="#" class="text-gray-400 hover:text-white">Privacy Policy</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white">Terms of Service</a></li>
                    </ul>
                </div>
                <!-- Social -->
                <div>
                    <h4 class="text-lg font-semibold mb-4">Follow Us</h4>
                    <div class="flex space-x-4">
                        <a href="#" class="text-gray-400 hover:text-white"><i data-lucide="facebook" class="w-6 h-6"></i></a>
                        <a href="#" class="text-gray-400 hover:text-white"><i data-lucide="instagram" class="w-6 h-6"></i></a>
                        <a href="#" class="text-gray-400 hover:text-white"><i data-lucide="twitter" class="w-6 h-6"></i></a>
                        <a href="#" class="text-gray-400 hover:text-white"><i data-lucide="youtube" class="w-6 h-6"></i></a>
                    </div>
                </div>
            </div>
            <div class="mt-8 pt-8 border-t border-gray-700 text-center text-gray-500">
                <p>&copy; 2025 Recipedia. Built with ❤️ for food lovers.</p>
            </div>
        </div>
    </footer>
    `,
      }}
    />
  );
};

export default RecipeHome; 