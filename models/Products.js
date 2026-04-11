import mongoose from "mongoose";

const variationSchema = new mongoose.Schema({
    size: String,
    weightApprox: String,
    price: Number
}); 

const productSchema = new mongoose.Schema({
    title: String,
    category: {
        type: String,
        enum: ['TRADICIONAL', 'PREMIUM', 'KIT', 'BROWNIE'],
        required: true
    },
    description: String,
    image: String,
    flavorsAvailable: [{ type: String }],
    availableShells: [{ type: String }],
    variations: [variationSchema],
    active: { type: Boolean, default: true }
});

const Product = mongoose.model('Product', productSchema);

export default Product;