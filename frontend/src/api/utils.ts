// Error handling utilities
export class APIError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.data = data;
  }
}

export const handleAPIError = (error) => {
  if (error instanceof APIError) {
    console.error(`API Error [${error.status}]:`, error.message);
    return {
      status: error.status,
      message: error.message,
      data: error.data,
    };
  }
  console.error('Unexpected error:', error);
  return {
    status: 500,
    message: error.message || 'An unexpected error occurred',
  };
};

// Request validation
export const validateRequestData = (data, schema) => {
  const errors = {};
  
  for (const [key, rules] of Object.entries(schema)) {
    const value = data[key];
    
    if (rules.required && (value === undefined || value === null || value === '')) {
      errors[key] = `${key} is required`;
      continue;
    }
    
    if (rules.type && value !== undefined && typeof value !== rules.type) {
      errors[key] = `${key} must be of type ${rules.type}`;
    }
    
    if (rules.min !== undefined && value < rules.min) {
      errors[key] = `${key} must be at least ${rules.min}`;
    }
    
    if (rules.max !== undefined && value > rules.max) {
      errors[key] = `${key} must be at most ${rules.max}`;
    }
    
    if (rules.pattern && !rules.pattern.test(value)) {
      errors[key] = `${key} format is invalid`;
    }
  }
  
  return Object.keys(errors).length > 0 ? errors : null;
};

// Response validation schemas
export const responseSchemas = {
  plant: {
    id: { type: 'number', required: true },
    name: { type: 'string', required: true },
    price: { type: 'number', required: true, min: 0 },
  },
  order: {
    id: { type: 'number', required: true },
    order_number: { type: 'string', required: true },
    customer_name: { type: 'string', required: true },
    total_amount: { type: 'number', required: true, min: 0 },
  },
  reminder: {
    id: { type: 'number', required: true },
    plant_id: { type: 'number', required: true },
    reminder_type: { type: 'string', required: true },
  },
};
