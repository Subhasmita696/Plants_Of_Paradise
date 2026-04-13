export interface Plant {
  id: string;
  name: string;
  species: string;
  price: number;
  image: string;
  careLevel: 'Easy' | 'Medium' | 'Expert';
  light: string;
  water: string;
  description: string;
  stock: number;
}

export interface Order {
  id: string;
  date: string;
  items: { plantId: string; plantName: string; qty: number; price: number }[];
  total: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered';
  customer: string;
}

export interface CareReminder {
  id: string;
  plantName: string;
  task: string;
  dueDate: string;
  frequency: string;
  done: boolean;
}

export const plants: Plant[] = [
  { id: '1', name: 'Bird of Paradise', species: 'Strelitzia reginae', price: 45, image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&h=500&fit=crop', careLevel: 'Medium', light: 'Bright indirect', water: 'Weekly', description: 'A stunning tropical plant with vibrant orange and blue flowers resembling a bird in flight.', stock: 24 },
  { id: '2', name: 'Monstera Deliciosa', species: 'Monstera deliciosa', price: 38, image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400&h=500&fit=crop', careLevel: 'Easy', light: 'Bright indirect', water: 'Every 1-2 weeks', description: 'The iconic Swiss cheese plant with dramatic split leaves.', stock: 42 },
  { id: '3', name: 'Fiddle Leaf Fig', species: 'Ficus lyrata', price: 55, image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&h=500&fit=crop', careLevel: 'Expert', light: 'Bright indirect', water: 'Every 1-2 weeks', description: 'A statement plant with large, violin-shaped leaves.', stock: 15 },
  { id: '4', name: 'Snake Plant', species: 'Sansevieria trifasciata', price: 22, image: 'https://images.unsplash.com/photo-1593482892540-ba0e2f528728?w=400&h=500&fit=crop', careLevel: 'Easy', light: 'Low to bright', water: 'Every 2-3 weeks', description: 'Nearly indestructible and excellent at purifying air.', stock: 67 },
  { id: '5', name: 'Pothos Golden', species: 'Epipremnum aureum', price: 15, image: 'https://images.unsplash.com/photo-1572688484438-313a56e6dc34?w=400&h=500&fit=crop', careLevel: 'Easy', light: 'Low to bright', water: 'Weekly', description: 'A cascading vine with heart-shaped golden-green leaves.', stock: 89 },
  { id: '6', name: 'Calathea Orbifolia', species: 'Calathea orbifolia', price: 42, image: 'https://images.unsplash.com/photo-1637967886160-fd78dc3ce3f5?w=400&h=500&fit=crop', careLevel: 'Expert', light: 'Medium indirect', water: 'Keep moist', description: 'Stunning large round leaves with silver-green stripes.', stock: 8 },
  { id: '7', name: 'Rubber Plant', species: 'Ficus elastica', price: 30, image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&h=500&fit=crop', careLevel: 'Easy', light: 'Bright indirect', water: 'Every 1-2 weeks', description: 'Glossy, dark burgundy leaves that add drama to any room.', stock: 35 },
  { id: '8', name: 'Peace Lily', species: 'Spathiphyllum', price: 25, image: 'https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=400&h=500&fit=crop', careLevel: 'Easy', light: 'Low to medium', water: 'Weekly', description: 'Elegant white blooms and lush foliage, great for low light.', stock: 52 },
];

export const orders: Order[] = [
  { id: 'ORD-001', date: '2026-04-07', items: [{ plantId: '1', plantName: 'Bird of Paradise', qty: 1, price: 45 }, { plantId: '4', plantName: 'Snake Plant', qty: 2, price: 22 }], total: 89, status: 'Processing', customer: 'Sarah Chen' },
  { id: 'ORD-002', date: '2026-04-06', items: [{ plantId: '2', plantName: 'Monstera Deliciosa', qty: 1, price: 38 }], total: 38, status: 'Shipped', customer: 'Marcus Rivera' },
  { id: 'ORD-003', date: '2026-04-05', items: [{ plantId: '5', plantName: 'Pothos Golden', qty: 3, price: 15 }, { plantId: '8', plantName: 'Peace Lily', qty: 1, price: 25 }], total: 70, status: 'Delivered', customer: 'Aisha Patel' },
  { id: 'ORD-004', date: '2026-04-07', items: [{ plantId: '6', plantName: 'Calathea Orbifolia', qty: 1, price: 42 }], total: 42, status: 'Pending', customer: 'James Okonkwo' },
  { id: 'ORD-005', date: '2026-04-04', items: [{ plantId: '3', plantName: 'Fiddle Leaf Fig', qty: 1, price: 55 }, { plantId: '7', plantName: 'Rubber Plant', qty: 1, price: 30 }], total: 85, status: 'Delivered', customer: 'Lin Wei' },
];

export const careReminders: CareReminder[] = [
  { id: '1', plantName: 'Bird of Paradise', task: 'Water deeply', dueDate: '2026-04-08', frequency: 'Weekly', done: false },
  { id: '2', plantName: 'Monstera Deliciosa', task: 'Mist leaves', dueDate: '2026-04-08', frequency: 'Every 3 days', done: false },
  { id: '3', plantName: 'Fiddle Leaf Fig', task: 'Rotate plant', dueDate: '2026-04-09', frequency: 'Bi-weekly', done: false },
  { id: '4', plantName: 'Snake Plant', task: 'Check soil moisture', dueDate: '2026-04-10', frequency: 'Every 2 weeks', done: true },
  { id: '5', plantName: 'Calathea Orbifolia', task: 'Fertilize', dueDate: '2026-04-12', frequency: 'Monthly', done: false },
  { id: '6', plantName: 'Peace Lily', task: 'Water thoroughly', dueDate: '2026-04-08', frequency: 'Weekly', done: false },
  { id: '7', plantName: 'Pothos Golden', task: 'Prune trailing vines', dueDate: '2026-04-15', frequency: 'Monthly', done: false },
];
