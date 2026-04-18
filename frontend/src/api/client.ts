// API Configuration
const API_CONFIG = {
  catalog: import.meta.env.VITE_CATALOG_API ?? '/api/catalog',
  inventory: import.meta.env.VITE_INVENTORY_API ?? '/api/inventory',
  orders: import.meta.env.VITE_ORDERS_API ?? '/api/orders',
  careReminders: import.meta.env.VITE_CARE_REMINDERS_API ?? '/api/care-reminders',
};

// Cache for requests
const requestCache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Request interceptors
const requestInterceptors = [];
const responseInterceptors = [];

export const addRequestInterceptor = (interceptor) => {
  requestInterceptors.push(interceptor);
};

export const addResponseInterceptor = (interceptor) => {
  responseInterceptors.push(interceptor);
};

// Apply interceptors to request config
const applyRequestInterceptors = (config) => {
  return requestInterceptors.reduce((cfg, interceptor) => {
    return interceptor(cfg);
  }, config);
};

// Apply interceptors to response
const applyResponseInterceptors = (response) => {
  return responseInterceptors.reduce((res, interceptor) => {
    return interceptor(res);
  }, response);
};

// Cache key generator
const generateCacheKey = (url, options) => {
  return `${url}_${JSON.stringify(options || {})}`;
};

// Clear old cache entries
const clearExpiredCache = () => {
  const now = Date.now();
  for (const [key, value] of requestCache.entries()) {
    if (now - value.timestamp > CACHE_DURATION) {
      requestCache.delete(key);
    }
  }
};

// API Request function with interceptors, caching, and retry logic
export const apiRequest = async (
  url,
  options = {},
  useCache = true
) => {
  clearExpiredCache();

  let config = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  };

  config = applyRequestInterceptors(config);

  // Check cache for GET requests
  if (config.method === 'GET' && useCache) {
    const cacheKey = generateCacheKey(url, config);
    const cached = requestCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }
  }

  // Retry logic
  const maxRetries = options.retries || 3;
  let lastError;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const error = new Error(`API Error: ${response.status}`);
        error.status = response.status;
        error.data = await response.json().catch(() => null);
        throw error;
      }

      const data = await response.json();
      const result = applyResponseInterceptors(data);

      // Cache successful GET requests
      if (config.method === 'GET' && useCache) {
        const cacheKey = generateCacheKey(url, config);
        requestCache.set(cacheKey, {
          data: result,
          timestamp: Date.now(),
        });
      }

      return result;
    } catch (error) {
      lastError = error;
      if (attempt < maxRetries - 1) {
        // Exponential backoff
        const delay = Math.min(1000 * Math.pow(2, attempt), 10000);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError;
};

// Service-specific functions
export const catalogAPI = {
  getAllPlants: (useCache = true) =>
    apiRequest(`${API_CONFIG.catalog}`, {}, useCache),

  getPlantById: (id, useCache = true) =>
    apiRequest(`${API_CONFIG.catalog}/${id}`, {}, useCache),

  getPlantsByCategory: (category, useCache = true) =>
    apiRequest(
      `${API_CONFIG.catalog}/category/${category}`,
      {},
      useCache
    ),

  createPlant: (plantData) =>
    apiRequest(`${API_CONFIG.catalog}`, {
      method: 'POST',
      body: JSON.stringify(plantData),
    }),

  health: () =>
    apiRequest(`${API_CONFIG.catalog}/health`, {}, false),
};

export const inventoryAPI = {
  getAllInventory: (useCache = true) =>
    apiRequest(`${API_CONFIG.inventory}`, {}, useCache),

  getInventoryByPlantId: (plantId, useCache = true) =>
    apiRequest(
      `${API_CONFIG.inventory}/${plantId}`,
      {},
      useCache
    ),

  getLowStockItems: (useCache = true) =>
    apiRequest(`${API_CONFIG.inventory}/low-stock`, {}, useCache),

  updateInventory: (plantId, quantity) =>
    apiRequest(`${API_CONFIG.inventory}/${plantId}`, {
      method: 'PATCH',
      body: JSON.stringify({ quantity_in_stock: quantity }),
    }),

  health: () =>
    apiRequest(`${API_CONFIG.inventory}/health`, {}, false),
};

export const ordersAPI = {
  getAllOrders: (useCache = true) =>
    apiRequest(`${API_CONFIG.orders}`, {}, useCache),

  getOrderById: (id, useCache = true) =>
    apiRequest(`${API_CONFIG.orders}/${id}`, {}, useCache),

  createOrder: (orderData) =>
    apiRequest(`${API_CONFIG.orders}`, {
      method: 'POST',
      body: JSON.stringify(orderData),
    }),

  updateOrderStatus: (id, status) =>
    apiRequest(`${API_CONFIG.orders}/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),

  health: () =>
    apiRequest(`${API_CONFIG.orders}/health`, {}, false),
};

export const careRemindersAPI = {
  getAllReminders: (useCache = true) =>
    apiRequest(`${API_CONFIG.careReminders}`, {}, useCache),

  getPlantReminders: (plantId, useCache = true) =>
    apiRequest(
      `${API_CONFIG.careReminders}/plant/${plantId}`,
      {},
      useCache
    ),

  getUpcomingReminders: (useCache = true) =>
    apiRequest(
      `${API_CONFIG.careReminders}/upcoming`,
      {},
      useCache
    ),

  createReminder: (reminderData) =>
    apiRequest(`${API_CONFIG.careReminders}`, {
      method: 'POST',
      body: JSON.stringify(reminderData),
    }),

  completeReminder: (id) =>
    apiRequest(`${API_CONFIG.careReminders}/${id}/complete`, {
      method: 'PATCH',
    }),

  health: () =>
    apiRequest(`${API_CONFIG.careReminders}/health`, {}, false),
};

// Clear cache function (useful for manual invalidation)
export const clearCache = () => {
  requestCache.clear();
};

// Clear specific cache entry
export const clearCacheEntry = (url, options) => {
  const cacheKey = generateCacheKey(url, options);
  requestCache.delete(cacheKey);
};

export default {
  catalogAPI,
  inventoryAPI,
  ordersAPI,
  careRemindersAPI,
  apiRequest,
  addRequestInterceptor,
  addResponseInterceptor,
  clearCache,
  clearCacheEntry,
};
