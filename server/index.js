import express from 'express';
import cors from "cors";
import { likeMeModel } from './models/likeme.model.js';


const app = express()
app.use(express.json());
app.use(cors());

app.listen(3000, console.log("escuchando 3000"))

app.get("/", async (req, res) => {
    try{
        const posts = await likeMeModel.findAll()
        return res.json(posts)
    }catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
        }
})

app.get("/:id", async (req, res) => {
    const id = req.params.id

    try{
        const post = await likeMeModel.findById(id)
        if(!post){
            res.status(404).json({ message: "Like not found" });
        } res.json(post)
    } catch(error){
        console.log(error)
        return res.status(500).json({ message: "Internal server error" });
    }
})

app.post("/", async (req, res) => {
    const {titulo, img, descripcion} = req.body;

    if (!titulo || !img || !descripcion){
        return res.status(400).json({ message: "All paths are required"});
        }
        const newPost = {
            titulo,
            img,
            descripcion
        }
        try{
            const addPost = await likeMeModel.createPost(newPost);
            return res.json(addPost)
        }catch(error){
            console.log(error);
            return res.status(500).json({message: "internal server error"})
        }

})