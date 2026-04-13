// Backend input validation utilities

const validatePlantInput = (data) => {
  const errors = [];
  
  if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
    errors.push('Plant name is required');
  }
  
  if (!data.scientific_name || typeof data.scientific_name !== 'string' || data.scientific_name.trim().length === 0) {
    errors.push('Scientific name is required');
  }
  
  if (typeof data.price !== 'number' || data.price < 0) {
    errors.push('Price must be a positive number');
  }
  
  if (!data.category || typeof data.category !== 'string' || data.category.trim().length === 0) {
    errors.push('Category is required');
  }
  
  if (typeof data.water_frequency !== 'number' || data.water_frequency < 1) {
    errors.push('Water frequency must be a positive number');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

const validateInventoryInput = (data) => {
  const errors = [];
  
  if (typeof data.plant_id !== 'number' || data.plant_id < 1) {
    errors.push('Valid plant ID is required');
  }
  
  if (typeof data.quantity_in_stock !== 'number' || data.quantity_in_stock < 0) {
    errors.push('Quantity must be non-negative');
  }
  
  if (typeof data.reorder_level !== 'number' || data.reorder_level < 0) {
    errors.push('Reorder level must be non-negative');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

const validateOrderInput = (data) => {
  const errors = [];
  
  if (!data.customer_name || typeof data.customer_name !== 'string' || data.customer_name.trim().length === 0) {
    errors.push('Customer name is required');
  }
  
  if (!data.customer_email || !isValidEmail(data.customer_email)) {
    errors.push('Valid email is required');
  }
  
  if (!data.customer_phone || typeof data.customer_phone !== 'string' || data.customer_phone.trim().length === 0) {
    errors.push('Customer phone is required');
  }
  
  if (!Array.isArray(data.items) || data.items.length === 0) {
    errors.push('Order must contain at least one item');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

const validateReminderInput = (data) => {
  const errors = [];
  
  if (typeof data.plant_id !== 'number' || data.plant_id < 1) {
    errors.push('Valid plant ID is required');
  }
  
  if (!data.reminder_type || !['watering', 'fertilizing', 'pruning', 'repotting'].includes(data.reminder_type)) {
    errors.push('Valid reminder type (watering, fertilizing, pruning, repotting) is required');
  }
  
  if (typeof data.frequency !== 'number' || data.frequency < 1) {
    errors.push('Frequency must be a positive number');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export {
  validatePlantInput,
  validateInventoryInput,
  validateOrderInput,
  validateReminderInput
};
