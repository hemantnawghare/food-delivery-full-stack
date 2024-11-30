import mongoose from 'mongoose'

//mongodb+srv://mrunmaynawghare:<db_password>@cluster0.nldsq.mongodb.net/?

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://mrunmaynawghare:Munnabhai13@cluster0.nldsq.mongodb.net/food-del').then(()=>console.log("DB Connected"));
        console.log("Database has been connected")
    } catch (error) {
        console.log("connection on database has been failed", error);
        process.exit(1);
    }
}