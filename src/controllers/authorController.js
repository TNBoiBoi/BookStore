const {AuthorModel} = require("../models");
const {BookModel} = require("../models");
const loginService = require("../services/login")

const AuthorController = {
    findOne: async (req,res) => {
        const found = await AuthorModel.findOne({_id: req.params.name})
        res.json(found);
    },
    findMultiple: async (req,res) => {
        const found = await AuthorModel.find({_id: req.params.name})
        res.json(found);
    },
    list: async (req, res) =>{
        const allAuthors = await AuthorModel.find()
        res.json(allAuthors);
    },
    listNames: async (req, res) =>{
        const allAuthors = await AuthorModel.find().select('_id')
        res.json(allAuthors)
    },
    create: async(req, res) => {
        if (!(await loginService.isAdmin(req.session.username)))
            res.send({status:"Failed", error:"Admin Only"})
        else
        {
            const _id = req.body.name
            const check = await AuthorModel.exists({_id: _id})
            if (check)
            {
                res.send({status:"Failed",error:"Object already exists"})
            }
            else{
                const age = req.body.age
                const bio = req.body.bio
                const picture = req.body.picture
                const author = new AuthorModel({
                    _id,
                    age,
                    bio,
                    picture
                })

                author.save().then((data)=>{
                    res.send(data)
                })
                }
        }
    },
    getAllBooks: async(req, res) => {
        const books = await BookModel.find({author: req.params.author})
        res.json(books);
    },
    delete: async(req, res) => {
        if (!(await loginService.isAdmin(req.session.username)))
            res.send({status:"Failed", error:"Admin Only"})
        else
        {
            const nameDelete = req.body.name
            const output = await AuthorModel.deleteOne({_id: nameDelete})
            if (output.deletedCount == 1 ){
                res.json({status:"Success"})
            }
            else res.send({status:"Failed", error:"could not find object"})
        }
    },
    update: async(req, res) => {
        if (!(await loginService.isAdmin(req.session.username)))
            res.send({status:"Failed", error:"Admin Only"})
        else
        {
            const _id = req.body.name
            const check = await AuthorModel.exists({_id: _id})
            if (!check)
            {
                res.send({status:"Failed", error:"could not find object"})
            }
            else
            {
                const author = await AuthorModel.findOne({_id: _id})
                let newAge = req.body.newAge
                if (!(newAge))
                        newAge = author.age

                let newBio = req.body.newBio
                if (!(newBio))
                        newBio = author.bio

                let newPicture = req.body.newPicture
                if (!(newPicture))
                        newPicture = author.picture
    
                const output = await AuthorModel.findOneAndUpdate({_id: _id}, {
                    age: newAge,
                    bio: newBio,
                    picture: newPicture,
                })
    
                if (output !== null){
                    res.json({status:"Success"})
                }
                else res.send({status:"Failed", error:"could not find object"})
            }
        }
    },
}

module.exports = AuthorController
