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

const deletePost = async (id) => {
    const query = "Delete from posts where id = $1";
    const {rows} = await pool.query(query, [id])
     return rows[0];
}

const updatePost = async (posts, id) => {
    const query = "Update posts set titulo = $1, descripcion = $2 where id = $3";
    const result = await pool.query(query, [posts.titulo, posts.descripcion, id])
}
export const likeMeModel = {
    findAll,
    findById,
    createPost,
    deletePost,
    updatePost
};

