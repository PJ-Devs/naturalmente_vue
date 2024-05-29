import fetchGlobal from './gloabalFetch';

import type {Category, ProductType } from '../types';
const fetchCategories = async (): Promise<Category[]> => {
    try {
      const response = await fetchGlobal<{ data: Category[] }>('/categories');
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  };
  
  const fetchProductTypes = async (): Promise<ProductType[]> => {
    try {
      const response = await fetchGlobal<{ data: ProductType[] }>('/types');
      return response.data;
    } catch (error) {
      console.error('Error fetching product types:', error);
      return [];
    }
  };

  let categories: Category[] = [];
let types: ProductType[] = [];

const initializeFilters = async () => {
  categories = await fetchCategories();
  types = await fetchProductTypes();
};

initializeFilters();

export { categories, types };