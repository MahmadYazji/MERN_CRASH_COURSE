import Product from "../models/product.model.js";
import mongoose from "mongoose";


export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({}); // use {} to fetch all data
        res.status(200).json({success: true, data: products})
    } catch (error) {
        console.log("Error in fetching products:", error.message);
        res.status(500).json({success:false, message: "Server Error"});
    }
};

export const createProduct = async (req, res) => { // create
    const product = req.body; // user will send this data

    if(!product.name || !product.price || !product.image) {
        return res.status(400).json({success:false, message: "Please provide all fields"}); // to check if all data is given
    }

    const newProduct = new Product(product); // if all data given use Product from product model and give it the data to create a new Product object

    try {
        await newProduct.save(); // to save the new product inside the data base
        res.status(201).json({success: true, data: newProduct});
    } catch (error) {
        console.error("Error in create product:", error.message);
        res.status(500).json({success:false, message: "Server Error"});
    }
};

export const updateProduct = async (req, res) => { // update
    const {id} = req.params;

    const product = req.body; // user will send these data to update

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success:false, message: "Invalid Product Id"});
    }

    try {
        const updateProduct = await Product.findByIdAndUpdate(id, product, {new:true});
        res.status(200).json({success:true, data:updateProduct});
    } catch (error) {
        res.status(500).json({success: false, message: "Server Error"});
    }
};

export const deleteProduct = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid Product Id" });
	}

	try {
		await Product.findByIdAndDelete(id);
		res.status(200).json({ success: true, message: "Product deleted" });
	} catch (error) {
		console.log("error in deleting product:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};