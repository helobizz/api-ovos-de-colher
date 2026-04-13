import orderService from "../services/orderService.js";

class orderController {
    async createOrder(req, res) {
        try {
            const { itens, total, dataRetirada, pagamento } = req.body;
            const usuarioId = req.loggedUser.id;

            if (!itens || !total || !dataRetirada) {
                return res.status(400).json({ error: "Campos obrigatórios ausentes: itens, total, dataRetirada." });
            }

            const newOrder = await orderService.Create(usuarioId, itens, total, dataRetirada, pagamento);
            return res.status(201).json(newOrder);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Erro ao criar pedido." });
        }
    }

    async getAllOrders(req, res) {
        try {
            const orders = await orderService.GetAll();
            return res.status(200).json(orders);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Erro ao buscar pedidos." });
        }
    }

    async getOneOrder(req, res) {
        try {
            const { id } = req.params;
            const order = await orderService.GetOne(id);

            if (!order) {
                return res.status(404).json({ error: "Pedido não encontrado." });
            }

            const isOwner = order.usuarioId._id.toString() === req.loggedUser.id;
            const isAdmin = req.loggedUser.role === "ADMIN";

            if (!isOwner && !isAdmin) {
                return res.status(403).json({ error: "Acesso negado." });
            }

            return res.status(200).json(order);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Erro ao buscar pedido." });
        }
    }

    async deleteOrder(req, res) {
        try {
            const { id } = req.params;
            const order = await orderService.GetOne(id);

            if (!order) {
                return res.status(404).json({ error: "Pedido não encontrado." });
            }

            await orderService.Delete(id);
            return res.status(200).json({ message: `Pedido com id: ${id} foi deletado.` });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Erro ao deletar pedido." });
        }
    }

    async updateOrder(req, res) {
        try {
            const { id } = req.params;
            const { itens, total, status, dataRetirada, pagamento, observacoesAdmin } = req.body;

            const order = await orderService.GetOne(id);
            if (!order) {
                return res.status(404).json({ error: "Pedido não encontrado." });
            }

            const fields = {};
            if (itens !== undefined) fields.itens = itens;
            if (total !== undefined) fields.total = total;
            if (status !== undefined) fields.status = status;
            if (dataRetirada !== undefined) fields.dataRetirada = dataRetirada;
            if (pagamento !== undefined) fields.pagamento = pagamento;
            if (observacoesAdmin !== undefined) fields.observacoesAdmin = observacoesAdmin;

            const updatedOrder = await orderService.Update(id, fields);
            return res.status(200).json(updatedOrder);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Erro ao atualizar pedido." });
        }
    }
}

export default new orderController();
