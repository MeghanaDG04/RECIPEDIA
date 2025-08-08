const Recipe = require("../models/Recipe");
const express = require("express");
const mongoose = require("mongoose");

const recipes = async (req, res) => {
  const { title, description, ingredients, image } = req.body;

  try {
    // Basic validation
    if (!title || !description || !ingredients) {
      return res.status(400).json({
        success: false,
        message: "Title, description, and ingredients are required",
      });
    }

    // Create recipe
    const recipe = new Recipe({
      title,
      description,
      ingredients,
      image,
      user: req.user.user,
    });

    await recipe.save();

    res.status(201).json({
      success: true,
      message: "Recipe added successfully",
      data: recipe,
    });
  } catch (err) {
    console.error("Recipe creation error:", err);
    res.status(500).json({
      success: false,
      message: "Error adding recipe",
    });
  }
};

const getAllRecipes = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 10, 100);
    const skip = (page - 1) * limit;

    const [recipes, total] = await Promise.all([
      Recipe.find()
        .populate("user", "username")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Recipe.countDocuments(),
    ]);

    res.status(200).json({
      success: true,
      message: "Recipes fetched successfully",
      data: {
        recipes,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          pageSize: limit,
          totalItems: total,
        },
      },
    });
  } catch (err) {
    console.error("Recipes fetch error:", err);
    res.status(500).json({
      success: false,
      message: "Error fetching recipes",
    });
  }
};

const recipeComments = async (req, res) => {
  const { text } = req.body;

  try {
    if (!text || text.trim().length === 0) {
      return res.status(400).json({ message: "Comment text is required" });
    }

    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    recipe.comments.push({
      user: req.user.user,
      text: text.trim(),
      createdAt: new Date(),
    });

    await recipe.save();
    res.json({ message: "Comment added successfully", recipe });
  } catch (err) {
    console.error("Comment creation error:", err);
    res.status(500).json({ message: "Error adding comment" });
  }
};
const recipeModification = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    // Only allow recipe owner to update
    if (recipe.user.toString() !== req.user.user) {
      return res.status(403).json({ message: "Access denied" });
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.json({ message: "Recipe updated successfully", recipe: updatedRecipe });
  } catch (err) {
    console.error("Recipe update error:", err);
    res.status(500).json({ message: "Error updating recipe" });
  }
};
const removeRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    // Only allow recipe owner to delete
    if (recipe.user.toString() !== req.user.user) {
      return res.status(403).json({ message: "Access denied" });
    }

    await Recipe.findByIdAndDelete(req.params.id);
    res.json({ message: "Recipe deleted successfully" });
  } catch (err) {
    console.error("Recipe deletion error:", err);
    res.status(500).json({ message: "Error deleting recipe" });
  }
};
const recipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id)
      .populate("user", "username")
      .populate("comments.user", "username");
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    res.json(recipe);
  } catch (err) {
    console.error("Recipe fetch error:", err);
    res.status(500).json({ message: "Error fetching recipe" });
  }
};
const likeRecipe = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const recipeId = req.params.id;
    const user = req.user.user;

    // Prevent duplicate likes inside the session
    const alreadyLiked = await Like.findOne({
      user: user,
      recipe: recipeId,
    }).session(session);
    if (alreadyLiked) {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(400)
        .json({ message: "You already liked this recipe." });
    }

    // Create Like
    const newLike = new Like({ user: userId, recipe: recipeId });
    await newLike.save({ session });

    // Increment Recipe's like count
    await Recipe.findByIdAndUpdate(
      recipeId,
      { $inc: { likes: 1 } },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ message: "Recipe liked successfully." });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();

    console.error("Error liking recipe:", err);
    res.status(500).json({ message: "Error liking recipe" });
  }
};

const recipeFeatured = async (req, res) => {
  try {
    const featured = await Recipe.findOne({ featured: true }).populate(
      "user",
      "username"
    );
    if (!featured) {
      return res.status(404).json({ message: "No featured recipe today." });
    }
    res.json(featured);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch featured recipe." });
  }
};

module.exports = {
  recipes,
  recipeComments,
  recipeModification,
  removeRecipe,
  likeRecipe,
  recipeById,
  getAllRecipes,
  recipeFeatured,
};
