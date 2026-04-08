import mysql from 'mysql2/promise';

let pool;

export const initializeDatabase = async () => {
  try {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    const connection = await pool.getConnection();
    console.log('✅ Database connected successfully');
    connection.release();
    return pool;
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    process.exit(1);
  }
};

export const getConnection = async () => {
  if (!pool) {
    await initializeDatabase();
  }
  return pool.getConnection();
};

export const executeQuery = async (query, values = []) => {
  const connection = await getConnection();
  try {
    const [result] = await connection.execute(query, values);
    return result;
  } finally {
    connection.release();
  }
};
