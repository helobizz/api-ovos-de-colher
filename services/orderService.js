import Order from "../models/Orders.js";

class orderService {
    async Create(usuarioId, itens, total, dataRetirada, pagamento) {
        try {
            const newOrder = new Order({
                usuarioId,
                itens,
                total,
                dataRetirada,
                pagamento
            });
            await newOrder.save();
            return newOrder;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async GetAll() {
        try {
            const orders = await Order.find().populate("usuarioId", "name email whatsapp");
            return orders;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async GetOne(id) {
        try {
            const order = await Order.findById(id).populate("usuarioId", "name email whatsapp");
            return order;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async GetByUser(usuarioId) {
        try {
            const orders = await Order.find({ usuarioId });
            return orders;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async Delete(id) {
        try {
            await Order.findByIdAndDelete(id);
            console.log(`Pedido com id: ${id} foi deletado.`);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async Update(id, fields) {
        try {
            const updatedOrder = await Order.findByIdAndUpdate(
                id,
                fields,
                { new: true }
            );
            console.log(`O pedido com id: ${id} foi atualizado.`);
            return updatedOrder;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export default new orderService();
