import { get } from "mongoose";
import productService from "../services/productService.js";

import { ObjectId } from "mongodb";

const getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAll()
        res.status(200).json({ products: products })
    } catch (error) {
        console.log(error)
        res.status(500).json({error : 'Erro interno do servidor.'})
    }
}

// Função para tratar a reuisição de cadastrar um jogo
const createProduct = async(req, res) => {
    try {
        const {title, category, description, image, flavorsAvailable, availableShells, variations, active} = req.body
        await productService.Create(title, category, description, image, flavorsAvailable, availableShells, variations, active)
        res.status(201).json({message: 'O  produto foi cadastrado com sucesso!'})
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Erro interno do servidor. Não foi possível cadastrar o produto.' })
    }
}

// função para deletar um produto
const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id
        if (ObjectId.isValid(id)) {
            await productService.Delete(id)
            res.status(204).json({ message: "O produto foi excluído com sucesso!" })
        } else {
            res.status(400).json({ error: 'Ocorreu um erro na validação do ID.' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Erro interno do servidor.' })
    }
}

const updateProduct = async (req, res) => {
    try {
        const id = req.params.id
        if (ObjectId.isValid(id)) {
            const { title, category, description, image, flavorsAvailable, availableShells, variations, active } = req.body
            const product = await productService.Update(id, title, category, description, image, flavorsAvailable, availableShells, variations, active)
            res.status(200).json({ message: 'Produto atualizado com sucesso!', product : product })
        } else {
            res.status(400).json({ error: 'Ocorreu um erro na validação da ID.' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Erro interno do servidor.' })
    }
}

const getOneProduct = async (req, res) => {
    try {
        const id = req.params.id
        if (ObjectId.isValid(id)) {
            const product = await productService.getOne(id)
            if(!product) {
                res.status(404).json({ error: 'O produto buscado não foi encontrado.' })
            } else {
                res.status(200).json({ product })
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Erro interno do servidor.' })
    }
}

export default { getAllProducts, createProduct, deleteProduct, updateProduct, getOneProduct }