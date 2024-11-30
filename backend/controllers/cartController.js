import userModal from '../models/userModal.js';

// Add items to user cart
const addToCart = async (req, res) => {
    try {
        // Find the user by their userId
        let userData = await userModal.findById(req.body.userId)

        // Check if the user exists
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        // Initialize cartData if it's not present
        let cartData = userData.cartData || {};

        // Add or update the item in the cart
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }

        // Update the user document with the modified cartData
        await userModal.findByIdAndUpdate(req.body.userId, { cartData });

        // Send a success response
        res.json({ success: true, message: "Added to cart" });
    } catch (error) {
        // Log the error and send an error response
        console.error(error);
        res.json({ success: false, message: "Error Occuried" });
    }
};

//remove item from user cart
const removeFromCart = async (req, res) => {
    try {
        let userData = await userModal.findById(req.body.userId)
        let cartData = await userData.cartData
        if(cartData[req.body.itemId]>0) {
            cartData[req.body.itemId] -= 1;
        }
        await userModal.findByIdAndUpdate(req.body.userId, {cartData})
        res.json({success:true,message: "Removed From cart"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"error"})
    }
}

//fetch user cart data
const getCart = async (req, res) => {
    try {
        let userData = await userModal.findById(req.body.userId)
        let cartData = await userData.cartData
        res.json({success:true, cartData})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"error"})
    }
}

export {addToCart, removeFromCart, getCart}