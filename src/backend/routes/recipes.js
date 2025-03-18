
const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

// Tüm tarifleri getir
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ID'ye göre tarif getir
router.get('/:id', getRecipe, (req, res) => {
  res.json(res.recipe);
});

// Kategoriye göre tarifleri getir
router.get('/category/:category', async (req, res) => {
  try {
    const recipes = await Recipe.find({ category: req.params.category });
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Yeni tarif ekle
router.post('/', async (req, res) => {
  const recipe = new Recipe({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    prepTime: req.body.prepTime,
    cookTime: req.body.cookTime,
    difficulty: req.body.difficulty,
    imageUrl: req.body.imageUrl,
    rating: req.body.rating,
    featured: req.body.featured,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions
  });

  try {
    const newRecipe = await recipe.save();
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Tarifi güncelle
router.patch('/:id', getRecipe, async (req, res) => {
  if (req.body.title != null) {
    res.recipe.title = req.body.title;
  }
  if (req.body.description != null) {
    res.recipe.description = req.body.description;
  }
  if (req.body.category != null) {
    res.recipe.category = req.body.category;
  }
  if (req.body.prepTime != null) {
    res.recipe.prepTime = req.body.prepTime;
  }
  if (req.body.cookTime != null) {
    res.recipe.cookTime = req.body.cookTime;
  }
  if (req.body.difficulty != null) {
    res.recipe.difficulty = req.body.difficulty;
  }
  if (req.body.imageUrl != null) {
    res.recipe.imageUrl = req.body.imageUrl;
  }
  if (req.body.rating != null) {
    res.recipe.rating = req.body.rating;
  }
  if (req.body.featured != null) {
    res.recipe.featured = req.body.featured;
  }
  if (req.body.ingredients != null) {
    res.recipe.ingredients = req.body.ingredients;
  }
  if (req.body.instructions != null) {
    res.recipe.instructions = req.body.instructions;
  }

  try {
    const updatedRecipe = await res.recipe.save();
    res.json(updatedRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Tarifi sil
router.delete('/:id', getRecipe, async (req, res) => {
  try {
    await res.recipe.remove();
    res.json({ message: 'Tarif silindi' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Malzemelere göre tarif ara
router.post('/search-by-ingredients', async (req, res) => {
  try {
    const ingredients = req.body.ingredients;
    if (!ingredients || !Array.isArray(ingredients)) {
      return res.status(400).json({ message: 'Malzemeler dizisi gereklidir' });
    }

    // Malzemelerin en az birini içeren tarifleri bul
    const recipes = await Recipe.find({
      ingredients: { $in: ingredients }
    });

    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get recipe by ID
async function getRecipe(req, res, next) {
  let recipe;
  try {
    recipe = await Recipe.findById(req.params.id);
    if (recipe == null) {
      return res.status(404).json({ message: 'Tarif bulunamadı' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.recipe = recipe;
  next();
}

module.exports = router;
