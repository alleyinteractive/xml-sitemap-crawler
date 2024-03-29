import mysql from 'mysql2/promise';
import { ConnectionOptions } from 'mysql2';

export type DbInsert = [
  string, // href
  string, // protocol
  string, // host
  string, // path
  string, // pathname
  string, // query_string
  string, // hash
  string, // file
  string, // level_1
  string, // level_2
  string, // level_3
  string, // level_4
  string, // level_5
];

let db: mysql.Connection;

export async function initDb(dbConfig:ConnectionOptions) {
  db = await mysql.createConnection(dbConfig);
  return db;
}

export async function insert(inserts: DbInsert[]) {
  if (inserts.length) {
    return db.query('INSERT INTO `urls` (`href`,`protocol`,`host`,`path`,`pathname`,`query_string`,`hash`,`file`,`level_1`,`level_2`,`level_3`,`level_4`,`level_5`) VALUES ?', [inserts]);
  }
  return null;
}

export async function closeDb() {
  db.end();
}
