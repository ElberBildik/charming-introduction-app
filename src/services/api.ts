
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export interface Recipe {
  _id: string;
  title: string;
  description: string;
  category: string;
  prepTime: number;
  cookTime: number;
  difficulty: string;
  imageUrl: string;
  rating: number;
  featured: boolean;
  ingredients: string[];
  instructions: string[];
  createdAt: string;
}

export const api = {
  // Tüm tarifleri getir
  getRecipes: async (): Promise<Recipe[]> => {
    try {
      const response = await axios.get(`${API_URL}/recipes`);
      return response.data;
    } catch (error) {
      console.error('Tarifler alınırken hata oluştu:', error);
      throw error;
    }
  },

  // ID'ye göre tarif getir
  getRecipeById: async (id: string): Promise<Recipe> => {
    try {
      const response = await axios.get(`${API_URL}/recipes/${id}`);
      return response.data;
    } catch (error) {
      console.error(`${id} ID'li tarif alınırken hata oluştu:`, error);
      throw error;
    }
  },

  // Kategoriye göre tarifleri getir
  getRecipesByCategory: async (category: string): Promise<Recipe[]> => {
    try {
      const response = await axios.get(`${API_URL}/recipes/category/${category}`);
      return response.data;
    } catch (error) {
      console.error(`${category} kategorisine göre tarifler alınırken hata oluştu:`, error);
      throw error;
    }
  },

  // Malzemelere göre tarif ara
  searchRecipesByIngredients: async (ingredients: string[]): Promise<Recipe[]> => {
    try {
      const response = await axios.post(`${API_URL}/recipes/search-by-ingredients`, { ingredients });
      return response.data;
    } catch (error) {
      console.error('Malzemelere göre tarifler aranırken hata oluştu:', error);
      throw error;
    }
  },

  // Yeni tarif ekle
  addRecipe: async (recipeData: Omit<Recipe, '_id' | 'createdAt'>): Promise<Recipe> => {
    try {
      const response = await axios.post(`${API_URL}/recipes`, recipeData);
      return response.data;
    } catch (error) {
      console.error('Tarif eklenirken hata oluştu:', error);
      throw error;
    }
  },

  // Tarifi güncelle
  updateRecipe: async (id: string, recipeData: Partial<Recipe>): Promise<Recipe> => {
    try {
      const response = await axios.patch(`${API_URL}/recipes/${id}`, recipeData);
      return response.data;
    } catch (error) {
      console.error(`${id} ID'li tarif güncellenirken hata oluştu:`, error);
      throw error;
    }
  },

  // Tarifi sil
  deleteRecipe: async (id: string): Promise<void> => {
    try {
      await axios.delete(`${API_URL}/recipes/${id}`);
    } catch (error) {
      console.error(`${id} ID'li tarif silinirken hata oluştu:`, error);
      throw error;
    }
  }
};
