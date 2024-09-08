import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
};

console.log(config);

const pool = mysql.createPool(config);

export async function query(sql: string, params: any[]) {
  try {
    const conn = await pool.getConnection();
    const result = await conn.execute(sql, params);
    conn.release();
    return result;
  } catch (error) {
    return null;
  }
}




