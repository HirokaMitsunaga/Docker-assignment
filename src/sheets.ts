import { google } from "googleapis";
import dotenv from "dotenv";

// .envファイルから環境変数を読み込む
dotenv.config();

const sheets = google.sheets("v4");

type Sheet = {
  id: number;
  name: string;
  place: string;
};

export const getSpreadsheetData = async (): Promise<Sheet[]> => {
  const range = "sheet1!A1:C5"; // 取得したい範囲を指定

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SPREADSHEET_ID,
    range,
    key: process.env.API_KEY,
  });

  const rows = response.data.values;

  if (!rows) {
    throw new Error("No data found in the spreadsheet.");
  }

  // ヘッダー行を除いてデータを変換
  const data: Sheet[] = rows.slice(1).map((row) => ({
    id: parseInt(row[0], 10),
    name: row[1],
    place: row[2],
  }));

  return data;
};
