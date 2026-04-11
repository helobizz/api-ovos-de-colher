import orderService from "../services/orderService.js";
import { ObjectId } from "mongodb";

const getAllOrders = async (req, res) => {
    try {
        const orders = await orderService.getAll();
        res.status(200).json({ orders: orders });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
}

const createOrder = async (req, res) => {
    try {
        const { usuarioId, itens, total, status, dataRetirada, pagamento, observacoesAdmin } = req.body;
        await orderService.Create(usuarioId, itens, total, status, dataRetirada, pagamento, observacoesAdmin);
        res.status(201).json({ message: 'O pedido foi cadastrado com sucesso!' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro interno do servidor. Não foi possível cadastrar o pedido.' });
    }
}

const deleteOrder = async (req, res) => {
    try {
        const id = req.params.id;
        if (ObjectId.isValid(id)) {
            await orderService.Delete(id);
            res.status(204).json({ message: "O pedido foi excluído com sucesso!" });
        } else {
            res.status(400).json({ error: 'Ocorreu um erro na validação do ID.' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
}

const updateOrder = async (req, res) => {
    try {
        const id = req.params.id;
        if (ObjectId.isValid(id)) {
            const { usuarioId, itens, total, status, dataRetirada, pagamento, observacoesAdmin } = req.body;
            const order = await orderService.Update(id, usuarioId, itens, total, status, dataRetirada, pagamento, observacoesAdmin);
            res.status(200).json({ message: 'Pedido atualizado com sucesso!', order: order });
        } else {
            res.status(400).json({ error: 'Ocorreu um erro na validação da ID.' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
}

const getOneOrder = async (req, res) => {
    try {
        const id = req.params.id;
        if (ObjectId.isValid(id)) {
            const order = await orderService.getOne(id);
            if (!order) {
                res.status(404).json({ error: 'O pedido buscado não foi encontrado.' });
            } else {
                res.status(200).json({ order });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
}

export default { getAllOrders, createOrder, deleteOrder, updateOrder, getOneOrder };