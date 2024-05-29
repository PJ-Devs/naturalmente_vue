// filtersStore.ts
import { defineStore } from 'pinia';
import fetchGlobal from '../helpers/gloabalFetch'
import type  { Product } from '../types';


export const useFiltersStore = defineStore('filters', {
  state: () => ({
    searchTerm: '',
    selectedCategories: [] as string[],
    selectedProductTypes: [] as string[],
    selectedPriceRange: [] as number[],
    products: [] as Product[], 
    filteredProducts: [] as Product[], 
    selectedQuantity: null as number | null,    
  }),
  actions: {
    setSearchTerm(term: string) {
      this.searchTerm = term;
      this.applyFilters();

    },
    setSelectedCategories(categories: string[]) {
      this.selectedCategories = categories;
      this.applyFilters();
    },
    setSelectedProductTypes(types: string[]) {
      this.selectedProductTypes = types;
      this.applyFilters();
    },
    setSelectedPriceRange(range: number[]) {
      this.selectedPriceRange = range;
      console.log('range:', range)
      this.applyFilters();
    },
    setSelectedQuantity(quantity: number) {
      console.log('quantity:', quantity);
      this.selectedQuantity = quantity;
      console.log('selectedQuantity:', this.selectedQuantity);
    },
    async fetchProducts() {
      try {
        const products = await fetchGlobal<Product[]>('/products');
        this.products = Array.isArray(products.data) ? products.data : [];
        this.filteredProducts = this.products;
        this.applyFilters();
      } catch (error) {
        console.error('Error fetching products:', error);
        this.products = [];
        this.filteredProducts = [];
      }
    },
    applyFilters() {
      if (!Array.isArray(this.products)) {
        console.error('products is not an array:', this.products);
        return;
      }

      this.filteredProducts = this.products.filter(product => {
        const matchesSearchTerm = product.name.toLowerCase().includes(this.searchTerm.toLowerCase());
        const matchesCategory = this.selectedCategories.length === 0 || this.selectedCategories.includes(product.category?.name);
        const matchesType = this.selectedProductTypes.length === 0 || this.selectedProductTypes.includes(product.product_type?.name);
        const matchesPriceRange = this.selectedPriceRange.length === 0 || (product.price >= this.selectedPriceRange[0].min && product.price <= this.selectedPriceRange[0].max);
        const matchesQuantity = this.selectedQuantity === 0 || product.quantity >= this.selectedQuantity;
        return matchesSearchTerm && matchesCategory && matchesType && matchesPriceRange && matchesQuantity;
      });
     console.log('Filtered products3:', this.filteredProducts);
      
    }
  },
});