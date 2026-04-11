import Product from "../models/Products.js";

class productService {
    async getAll() {
        try {
            const products = await Product.find()
            return products
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async Create(title, category, description, image, flavorsAvailable, availableShells, variations, active) {
        try {
            const newProduct = new Product({
                title,
                category,
                description,
                image,
                flavorsAvailable,
                availableShells,
                variations,
                active
            })
            await newProduct.save()
        } catch(error) {
            console.log(error)
        }
    }

    async Delete(id) {
        try {
            await Product.findByIdAndDelete(id)
            console.log(`Produto com id: ${id} foi deletado.`)
        } catch (error) {
            console.log(error)
        }
    }

    async Update(id, title, category, description, image, flavorsAvailable, availableShells, variations, active) {
        try {
            const updatedProduct = await Product.findByIdAndUpdate(id, {
                title, 
                category, 
                description, 
                image, 
                flavorsAvailable, 
                availableShells, 
                variations, 
                active
            },
                { new: true }
        )
            console.log(`O produto com a id: ${id} foi alterado.`)
            return updatedProduct
        } catch (error) {
            console.log(error)
        }
    }

    async getOne(id) {
        try {
            const product = await Product.findOne({ _id: id })
            return product
        } catch (error) {
            console.log(error)
        }
    }
}

export default new productService(); 