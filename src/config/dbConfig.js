import mysql from "mysql2/promise"; // Importe a versão promise
import dotenv from "dotenv";

dotenv.config();

const dbPool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

console.log("Pool de conexões MySQL criado!");

async function testConnection() {
    try {
        const connection = await dbPool.getConnection();
        console.log("Conexão ao banco de dados MySQL bem-sucedida (via pool)!");
        connection.release();
    } catch (err) {
        console.error("Erro ao conectar ao banco de dados (via pool):", err);
    }
}

testConnection();

export default dbPool;
