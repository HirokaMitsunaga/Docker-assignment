import { getSpreadsheetData } from "./sheets.js";
import { initializeDatabase, insertSpreadsheetData } from "./db.js";
const main = async () => {
    await initializeDatabase(); // データベースとテーブルの初期化
    const data = await getSpreadsheetData();
    console.log(data);
    await insertSpreadsheetData(data);
};
main().catch((error) => {
    console.error("エラーが発生しました:", error);
});
