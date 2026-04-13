import { defineStore } from 'pinia';
import { getCategories } from '../api/category';

export const useCategoryStore = defineStore('category', {
  state: () => ({
    // Persistent cache from localStorage
    categories: JSON.parse(localStorage.getItem('cached_categories')) || [],
    pagination: JSON.parse(localStorage.getItem('cached_pagination')) || {
      total: 0,
      per_page: 10,
      current_page: 1,
      last_page: 1
    },
    isLoading: false,
    lastFetched: localStorage.getItem('categories_last_fetched') 
      ? new Date(localStorage.getItem('categories_last_fetched')) 
      : null,
    searchQuery: ''
  }),
  getters: {
    isCacheValid: (state) => {
      if (!state.lastFetched || state.categories.length === 0) return false;
      const now = new Date();
      const diff = now - state.lastFetched;
      return diff < 30 * 60 * 1000; // Increased to 30 minutes for better speed
    }
  },
  actions: {
    async fetchCategories(page = 1, force = false) {
      // Use cache if valid and not forced
      const isSamePage = this.pagination.current_page === page;
      if (!force && this.isCacheValid && isSamePage && !this.searchQuery) {
        console.log('Using cached categories...');
        return;
      }

      this.isLoading = true;
      try {
        const params = {
          page,
          search: this.searchQuery || undefined
        };
        const response = await getCategories(params);
        if (response.status) {
          this.categories = response.data.data;
          this.pagination = response.data.pagination;
          this.lastFetched = new Date();
          
          // Persist to localStorage for "Instant Load" next time
          localStorage.setItem('cached_categories', JSON.stringify(this.categories));
          localStorage.setItem('cached_pagination', JSON.stringify(this.pagination));
          localStorage.setItem('categories_last_fetched', this.lastFetched.toISOString());
        }
      } catch (error) {
        console.error('CategoryStore Fetch Error:', error);
        throw error;
      } finally {
        this.isLoading = false;
      }
    },
    setSearchQuery(query) {
      this.searchQuery = query;
    },
    invalidateCache() {
      this.lastFetched = null;
      localStorage.removeItem('categories_last_fetched');
    }
  }
});
