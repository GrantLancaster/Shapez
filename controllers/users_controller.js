import { pool } from "../db/db_setup.js";
import { v4 as uuidv4 } from "uuid";

export async function getAllUsers() {
  const [rows] = await pool.query("SELECT * FROM user");
  return rows
}

export async function getUser(id) {
  const [rows] = await pool.query(`
    SELECT *
    FROM user
    WHERE id = ?
    `, [id]);
    return rows
}

export async function createNewUser(user) {
  const [newUser] = await pool.query(`
    INSERT INTO user (name, color, shape, id)
    VALUES (?, ?, ?, ?)
    `, [user.name, user.color, user.shape, user.id]);
    return newUser
}


export async function deleteUser(id) {
  await pool.query(`
    DELETE FROM user
    WHERE id = ?
    `, [id]);
}
