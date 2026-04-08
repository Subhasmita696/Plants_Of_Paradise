import { useState, useCallback } from 'react';
import { catalogAPI, inventoryAPI, ordersAPI, careRemindersAPI } from '../client';

export const useCatalog = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllPlants = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await catalogAPI.getAllPlants();
      setPlants(data);
      return data;
    } catch (err) {
      setError(err.message);
      console.error('Error fetching plants:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPlantById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const data = await catalogAPI.getPlantById(id);
      return data;
    } catch (err) {
      setError(err.message);
      console.error('Error fetching plant:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPlantsByCategory = useCallback(async (category) => {
    setLoading(true);
    setError(null);
    try {
      const data = await catalogAPI.getPlantsByCategory(category);
      setPlants(data);
      return data;
    } catch (err) {
      setError(err.message);
      console.error('Error fetching plants:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createPlant = useCallback(async (plantData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await catalogAPI.createPlant(plantData);
      // Refresh plants list
      await fetchAllPlants();
      return data;
    } catch (err) {
      setError(err.message);
      console.error('Error creating plant:', err);
    } finally {
      setLoading(false);
    }
  }, [fetchAllPlants]);

  return {
    plants,
    loading,
    error,
    fetchAllPlants,
    fetchPlantById,
    fetchPlantsByCategory,
    createPlant,
  };
};

export const useInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllInventory = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await inventoryAPI.getAllInventory();
      setInventory(data);
      return data;
    } catch (err) {
      setError(err.message);
      console.error('Error fetching inventory:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchInventoryByPlantId = useCallback(async (plantId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await inventoryAPI.getInventoryByPlantId(plantId);
      return data;
    } catch (err) {
      setError(err.message);
      console.error('Error fetching inventory:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchLowStockItems = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await inventoryAPI.getLowStockItems();
      return data;
    } catch (err) {
      setError(err.message);
      console.error('Error fetching low stock items:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateInventory = useCallback(
    async (plantId, quantity) => {
      setLoading(true);
      setError(null);
      try {
        const data = await inventoryAPI.updateInventory(plantId, quantity);
        // Refresh inventory
        await fetchAllInventory();
        return data;
      } catch (err) {
        setError(err.message);
        console.error('Error updating inventory:', err);
      } finally {
        setLoading(false);
      }
    },
    [fetchAllInventory]
  );

  return {
    inventory,
    loading,
    error,
    fetchAllInventory,
    fetchInventoryByPlantId,
    fetchLowStockItems,
    updateInventory,
  };
};

export const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await ordersAPI.getAllOrders();
      setOrders(data);
      return data;
    } catch (err) {
      setError(err.message);
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchOrderById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const data = await ordersAPI.getOrderById(id);
      return data;
    } catch (err) {
      setError(err.message);
      console.error('Error fetching order:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createOrder = useCallback(
    async (orderData) => {
      setLoading(true);
      setError(null);
      try {
        const data = await ordersAPI.createOrder(orderData);
        // Refresh orders list
        await fetchAllOrders();
        return data;
      } catch (err) {
        setError(err.message);
        console.error('Error creating order:', err);
      } finally {
        setLoading(false);
      }
    },
    [fetchAllOrders]
  );

  const updateOrderStatus = useCallback(
    async (id, status) => {
      setLoading(true);
      setError(null);
      try {
        const data = await ordersAPI.updateOrderStatus(id, status);
        // Refresh orders list
        await fetchAllOrders();
        return data;
      } catch (err) {
        setError(err.message);
        console.error('Error updating order:', err);
      } finally {
        setLoading(false);
      }
    },
    [fetchAllOrders]
  );

  return {
    orders,
    loading,
    error,
    fetchAllOrders,
    fetchOrderById,
    createOrder,
    updateOrderStatus,
  };
};

export const useCareReminders = () => {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllReminders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await careRemindersAPI.getAllReminders();
      setReminders(data);
      return data;
    } catch (err) {
      setError(err.message);
      console.error('Error fetching reminders:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPlantReminders = useCallback(async (plantId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await careRemindersAPI.getPlantReminders(plantId);
      return data;
    } catch (err) {
      setError(err.message);
      console.error('Error fetching reminders:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchUpcomingReminders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await careRemindersAPI.getUpcomingReminders();
      return data;
    } catch (err) {
      setError(err.message);
      console.error('Error fetching upcoming reminders:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createReminder = useCallback(
    async (reminderData) => {
      setLoading(true);
      setError(null);
      try {
        const data = await careRemindersAPI.createReminder(reminderData);
        // Refresh reminders
        await fetchAllReminders();
        return data;
      } catch (err) {
        setError(err.message);
        console.error('Error creating reminder:', err);
      } finally {
        setLoading(false);
      }
    },
    [fetchAllReminders]
  );

  const completeReminder = useCallback(
    async (id) => {
      setLoading(true);
      setError(null);
      try {
        const data = await careRemindersAPI.completeReminder(id);
        // Refresh reminders
        await fetchAllReminders();
        return data;
      } catch (err) {
        setError(err.message);
        console.error('Error completing reminder:', err);
      } finally {
        setLoading(false);
      }
    },
    [fetchAllReminders]
  );

  return {
    reminders,
    loading,
    error,
    fetchAllReminders,
    fetchPlantReminders,
    fetchUpcomingReminders,
    createReminder,
    completeReminder,
  };
};
