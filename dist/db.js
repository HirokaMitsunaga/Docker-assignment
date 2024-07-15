import mysql from "mysql2/promise";
import dotenv from "dotenv";
if (process.env.NODE_ENV !== "docker") {
    // .envファイルから環境変数を読み込む
    dotenv.config();
}
const createConnection = async () => {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });
    return connection;
};
export const initializeDatabase = async () => {
    const connection = await createConnection();
    try {
        await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
        await connection.query(`USE ${process.env.DB_NAME}`);
        await connection.query(`
      CREATE TABLE IF NOT EXISTS sheets (
        id INT PRIMARY KEY,
        name VARCHAR(255),
        place VARCHAR(255)
      )
    `);
        console.log("データベースとテーブルが正常に作成されました。");
    }
    catch (error) {
        console.error("データベースまたはテーブルの作成中にエラーが発生しました:", error);
    }
    finally {
        await connection.end();
    }
};
export const insertSpreadsheetData = async (data) => {
    const connection = await createConnection();
    try {
        for (const row of data) {
            const { id, name, place } = row;
            const query = `INSERT IGNORE INTO sheets (id, name, place) VALUES (?, ?, ?)`;
            const values = [id, name, place];
            await connection.execute(query, values);
        }
        console.log("データが正常に挿入されました。");
    }
    catch (error) {
        console.error("データの挿入中にエラーが発生しました:", error);
    }
    finally {
        await connection.end();
    }
};
