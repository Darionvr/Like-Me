import { pool } from "../database/connection.js";

const findAll = async () => {
    const { rows } = await pool.query("SELECT * FROM posts");
    return rows;
};

const findById = async (id) => {
    const query = "Select * from posts where id = $1";
    const {rows} = await pool.query(query, [id])
    return rows[0]
}

const createPost = async (posts) => {
    const query = "INSERT INTO posts (titulo, img, descripcion) VALUES ($1, $2, $3) RETURNING *";
    const { rows } = await pool.query(query, [posts.titulo, posts.img, posts.descripcion]);
    return rows[0];
    };


export const likeMeModel = {
    findAll,
    findById,
    createPost
};

