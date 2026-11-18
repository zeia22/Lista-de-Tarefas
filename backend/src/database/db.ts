import sqlite3 from 'sqlite3';
import path from 'path';
import fs from 'fs';

const databaseDirectory = path.resolve(__dirname, '../../database');
fs.mkdirSync(databaseDirectory, { recursive: true });
const dbPath = path.join(databaseDirectory, 'todos.db');

// Enable foreign keys
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Connected to SQLite database at:', dbPath);
    db.run('PRAGMA foreign_keys = ON');
  }
});

// Initialize database schema
export const initializeDatabase = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run(
        `CREATE TABLE IF NOT EXISTS todos (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title VARCHAR(255) NOT NULL,
          description TEXT,
          status VARCHAR(20) DEFAULT 'pending' CHECK(status IN ('pending', 'in_progress', 'completed')),
          priority VARCHAR(10) DEFAULT 'medium' CHECK(priority IN ('low', 'medium', 'high')),
          due_date DATE,
          category VARCHAR(50),
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`,
        (err) => {
          if (err) {
            reject(err);
          } else {
            console.log('Database schema initialized');
            resolve();
          }
        }
      );
    });
  });
};

export default db;
