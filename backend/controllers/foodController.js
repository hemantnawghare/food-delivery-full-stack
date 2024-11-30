import foodModal from "../models/foodModal.js";
import fs from 'fs'

//add food item

const addFood = async (req, resp) => {
    let image_filename = `${req.file.filename}`

    const food = new foodModal({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image:image_filename
    })
    try {
        await food.save();
        resp.json({success:true,message:"Food Added"})
    } catch (error) {
        console.log(error)
        resp.json({success:false,message:`${error}`})
    }
}

//all food list
const listFood = async (req, resp) => {
    try{
        const foods = await foodModal.find({});
        resp.json({success:true,data:foods})
    } catch {
        console.log(error);
        resp.json({success: false,message:"Error"})
    }
}


//remove food item

const removeFood = async (req, resp) => {
    try {
        const food = await foodModal.findById(req.body.id)
        fs.unlink(`uploads/${food.image}`,()=>{})

        await foodModal.findByIdAndDelete(req.body.id)
        resp.json({success:true,message:"Food Removed"})
    } catch (error) {
        console.log(error)
        resp.json({success:false,message:"Error"})
    }
}


export {addFood,listFood,removeFood}