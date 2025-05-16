import { likeMeModel } from "../models/likeme.model.js";


const read = async (req, res) => {
    try {
        const posts = await likeMeModel.findAll()
        return res.json(posts)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const readById = async (req, res) => {
    const {id} = req.params.id

    try {
        const post = await likeMeModel.findById(id)
        if (!post) {
            res.status(404).json({ message: "Post not found" });
        } res.json(post)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" });
    }
}

const create = async (req, res) => {
    const { titulo, img, descripcion } = req.body;

    if (!titulo || !img || !descripcion) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const newPost = {
        titulo,
        img,
        descripcion
    }
    try {
        const addPost = await likeMeModel.createPost(newPost);
        return res.json(addPost)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server error" })
    }

}

const remove = async (req, res) => {
    const {id} = req.params
    try {
        const post = await likeMeModel.deletePost(id)
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        return res.json({ message: "Post deleted" });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }

}

const update = async (req, res) => {
    const { titulo, descripcion } = req.body;
    const {id} = req.params

    try {
        const updatedPost = await likeMeModel.updatePost(titulo, descripcion, id)
        res.json(updatedPost)
    }catch(error){
         return res.status(500).json({ message: "Internal server error" });

    }
}

export const postsController = {
    read,
    readById,
    create,
    remove,
    update
}